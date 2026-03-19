from django.db.models import F
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import City, University, Dish, Housing, Station, Place, Event
import os
from datetime import datetime
from django.conf import settings
from django.core.cache import cache
from .db_api import DBApi

# Create your views here.
def search_cities(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return JsonResponse({
            "status": "success",
            "data": {"cities": [], "universities": []}
        })
    
    cities = City.objects.filter(city_name__icontains=query)[:10]
    universities = University.objects.filter(uni_name__icontains=query)[:10]
    
    cities_data = [{"id": city.city_id, "name": city.city_name, "type": "city"} for city in cities]
    unis_data = [{"id": uni.uni_id, "name": uni.uni_name, "city_id": uni.city_id, "type": "university"} for uni in universities]
    
    return JsonResponse({
        "status": "success",
        "data": {
            "cities": cities_data,
            "universities": unis_data
        }
    })

def get_universities(request):
    # This automatically grabs the city name from the linked table!
    unis = University.objects.all().values(
        'uni_id', 'uni_name', 'type', 'ranking_global', 
        'ranking_by_sub', 'website_url', 
        city_name=F('city__city_name') # Grabs the 'city_name' field from the 'city' foreign key
    )
    return JsonResponse(list(unis), safe=False)

def get_housing_districts(request):
    districts = Housing.objects.all().values()
    return JsonResponse(list(districts), safe=False)

def get_entertainment_venues(request):
    venues = Place.objects.filter(category='Venue').values()
    return JsonResponse(list(venues), safe=False)

def get_entertainment_events(request):
    events = Event.objects.all().values()
    return JsonResponse(list(events), safe=False)

def get_food_dishes(request):
    dishes = Dish.objects.all().values()
    return JsonResponse(list(dishes), safe=False)

def get_food_places(request):
    places = Place.objects.filter(category='Restaurant').values()
    return JsonResponse(list(places), safe=False)

# Global instances for reuse to avoid reloading
db_client = None
FRANKFURT_EVA = None

def get_train_routes(request):
    global db_client, FRANKFURT_EVA
    station_name = request.GET.get('station', 'Frankfurt')
    
    # Check cache first
    cache_key = f"train_routes_{station_name}"
    cached_data = cache.get(cache_key)
    if cached_data:
        return JsonResponse({"status": "success", "data": cached_data})
        
    try:
        # 1. Manually parse .env for API keys
        env_path = settings.BASE_DIR.parent / '.env'
        if env_path.exists():
            with open(env_path, encoding='utf-8') as f:
                for line in f:
                    if '=' in line and not line.strip().startswith('#'):
                        key, val = line.strip().split('=', 1)
                        os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))
        
        client_id = os.environ.get('DB_CLIENT_ID')
        client_secret = os.environ.get('DB_CLIENT_SECRET')
        
        if not client_id or not client_secret:
            return JsonResponse({"status": "error", "message": "DB API credentials missing."}, status=500)
            
        # 2. Instantiate custom DB client
        if not db_client:
            db_client = DBApi(client_id, client_secret)
            
        # 3. Locate Station EVA Number
        eva_nr = None
        if station_name == 'Frankfurt' and FRANKFURT_EVA:
            eva_nr = FRANKFURT_EVA
        else:
            eva_nr = db_client.find_station_eva(station_name)
            if station_name == 'Frankfurt':
                FRANKFURT_EVA = eva_nr
                
        # 4. Fetch Timetable and Delays
        trains = db_client.get_timetable(eva_nr)
            
        # 5. Format results
        results = []
        for t in trains:
            line = t['train_line'] or f"{t['train_type']}{t['train_number']}"
            
            stations_str = t['stations']
            if not stations_str:
                continue
                
            destinations = stations_str.split('|')
            final_dest = destinations[-1]
            
            original_time_str = t['departure']
            if not original_time_str:
                continue
                
            try:
                dt = datetime.strptime(original_time_str, "%y%m%d%H%M")
                time_formatted = dt.strftime("%H:%M")
            except Exception:
                time_formatted = original_time_str
                dt = None
                
            delay = None
            if dt and t.get('delay_departure'):
                try:
                    dt_new = datetime.strptime(t['delay_departure'], "%y%m%d%H%M")
                    delay_mins = int((dt_new - dt).total_seconds() / 60)
                    if delay_mins > 0:
                        delay = f"+{delay_mins} min"
                except Exception:
                    pass
            
            results.append({
                "from": station_name,
                "to": final_dest,
                "line": line,
                "time": time_formatted,
                "delay": delay
            })
            
        # Sort by actual departure time (time) and limit to ~15 trains
        results = sorted(results, key=lambda x: x['time'])[:15]
        
        # Cache for 2 minutes
        cache.set(cache_key, results, 120)
        
        return JsonResponse({"status": "success", "data": results})
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"status": "error", "message": str(e)}, status=500)