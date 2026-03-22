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

def search_cities(request):
    query = request.GET.get('q', '').strip()
    # Require at least 3 characters on the backend too as a safeguard
    if len(query) < 3:
        return JsonResponse({
            "status": "success",
            "data": {"cities": [], "universities": []}
        })
    
    cities = City.objects.filter(city_name__icontains=query)[:10]
    # select_related to easily grab the city name without extra queries
    universities = University.objects.select_related('city').filter(uni_name__icontains=query)[:10]
    
    # Added state to the response
    cities_data = [{"id": city.city_id, "name": city.city_name, "state": city.state, "type": "city"} for city in cities]
    
    # Added city_name to universities so we can show "TU Darmstadt, Darmstadt"
    unis_data = [{
        "id": uni.uni_id, 
        "name": uni.uni_name, 
        "city_name": uni.city.city_name if uni.city else None,
        "type": uni.type
    } for uni in universities]
    
    return JsonResponse({
        "status": "success",
        "data": {
            "cities": cities_data,
            "universities": unis_data
        }
    })

from django.http import JsonResponse
from .models import University

def get_universities(request):
    unis = University.objects.select_related('city').prefetch_related('highlights')
    
    data = []
    for uni in unis:
        highlight_list = [h.aca_highlight_name for h in uni.highlights.all()]

        best_subject_rank = None
        first_sub_rank = uni.unisubjectrank_set.first()
        if first_sub_rank:
            best_subject_rank = first_sub_rank.rank

        data.append({
            'uni_id': uni.uni_id,
            'uni_name': uni.uni_name,
            'type': uni.type,
            'ranking_global': uni.ranking_global,
            'ranking_by_sub': best_subject_rank, 
            'website_url': uni.uni_url,
            'city_name': uni.city.city_name if uni.city else None,
            'highlights': highlight_list
        })
        
    return JsonResponse(data, safe=False)

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

def get_train_static_info(request):
    # This serves the static information (routes, tickets, commute mock data)
    station = request.GET.get('station', 'Frankfurt')

    # In a real app, this would be fetched from DB based on city.
    # For now, it returns the provided mock data.
    
    frankfurt_routes = [
        {
            "id": 's-bahn',
            "title": 'S-Bahn',
            "description": 'The backbone of Frankfurt commuting. S1–S9 lines connect the city centre, university campuses, suburbs, and the airport. Runs every 15–30 minutes with a 30-min city loop.',
            "image": 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1080&q=80',
            "lines": ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S8', 'S9'],
            "duration": 'Every 15–30 min',
        },
        {
            "id": 'u-bahn',
            "title": 'U-Bahn',
            "description": 'Frankfurt\'s underground subway covers the inner city. U4, U5, U6, U7 serve popular student areas, Sachsenhausen, Bockenheim, and Bornheim. Perfect for daily commutes.',
            "image": 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=1080&q=80',
            "lines": ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'],
            "duration": 'Every 5–10 min (peak)',
        },
        {
            "id": 'airport',
            "title": 'Airport Express',
            "description": 'Direct rail from Frankfurt Central to Frankfurt Airport (FRA) in just 11 minutes. S8 and S9 run every 15 minutes, 24/7, making arrival and travel easy for international students.',
            "image": 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1080&q=80',
            "lines": ['S8', 'S9'],
            "duration": '11 min to Airport',
        },
        {
            "id": 'rmv',
            "title": 'RMV Regional Trains',
            "description": 'The Rhine-Main-Verkehrsverbund (RMV) regional network connects Frankfurt to Darmstadt, Wiesbaden, Mainz, and Marburg. One ticket works across all modes in the region.',
            "image": 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1080&q=80',
            "lines": ['RE', 'RB', 'SE lines'],
            "duration": 'Regional connections',
        },
        {
            "id": 'ice',
            "title": 'ICE Long-Distance (DB)',
            "description": 'Frankfurt Hauptbahnhof is one of Germany\'s busiest rail hubs. ICE trains reach Berlin in 4h, Munich in 3.5h, Hamburg in 4h. The Deutsche Bahn Semester Ticket gives huge discounts.',
            "image": 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1080&q=80',
            "lines": ['ICE', 'IC', 'EC'],
            "duration": 'Berlin 4h / Munich 3.5h',
        },
    ]

    tickets = [
        {"name": 'Single Ticket (Zone 50)', "price": '€3.40', "validity": '2 hours', "note": 'Good for one trip within Frankfurt'},
        {"name": 'Day Ticket', "price": '€8.90', "validity": '24 hours', "note": 'Best for tourist days / arrivals'},
        {"name": 'Weekly Ticket', "price": '€30.50', "validity": '7 days', "note": 'Unlimited rides in Frankfurt'},
        {"name": 'Semester Ticket', "price": '~€200/sem', "validity": 'Full semester', "note": 'Included with Goethe / h_da enrollment'},
        {"name": 'Deutschlandticket', "price": '€58/month', "validity": '1 month', "note": 'Nationwide travel on all regional trains'},
    ]

    commute_data = [
        {"from": 'Frankfurt Hbf', "to": 'Goethe Uni (Bockenheim)', "line": 'U6/U7', "time": '12 min'},
        {"from": 'Frankfurt Hbf', "to": 'Frankfurt Airport', "line": 'S8/S9', "time": '11 min'},
        {"from": 'Frankfurt Hbf', "to": 'Sachsenhausen', "line": 'S3/S4/S5', "time": '8 min'},
        {"from": 'Frankfurt Hbf', "to": 'Darmstadt (h_da)', "line": 'S3', "time": '38 min'},
        {"from": 'Frankfurt Hbf', "to": 'Wiesbaden', "line": 'S1/S8/S9', "time": '45 min'},
        {"from": 'Frankfurt Hbf', "to": 'Mainz', "line": 'S8/S9', "time": '40 min'},
    ]

    return JsonResponse({
        "status": "success",
        "data": {
            "routes": frankfurt_routes,
            "tickets": tickets,
            "commuteEstimations": commute_data
        }
    })

import requests as py_requests
def search_locations(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return JsonResponse({"status": "error", "message": "No query provided"})

    # 1. Local Lookup
    stations = Station.objects.filter(station_name__icontains=query)
    if stations.exists():
        results = [{"id": s.station_id, "name": s.station_name, "source": "local"} for s in stations[:5]]
        return JsonResponse({"status": "success", "data": results})

    # 2. External Fallback (No auto-save)
    try:
        ext_res = py_requests.get(
            f"https://v6.db.transport.rest/locations?query={py_requests.utils.quote(query)}&results=1",
            timeout=5
        )
        if ext_res.status_code == 200:
            data = ext_res.json()
            if data and len(data) > 0:
                ext_station = data[0]
                ibnr = ext_station.get('id')
                name = ext_station.get('name')
                
                return JsonResponse({
                    "status": "success", 
                    "data": [{"id": ibnr, "name": name, "source": "external"}]
                })
    except Exception as e:
        print(f"External search error: {e}")

    return JsonResponse({"status": "success", "data": []})

from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def save_location(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            ibnr = body.get('id')
            name = body.get('name')
            
            if not ibnr or not name:
                return JsonResponse({"status": "error", "message": "Missing id or name"}, status=400)
                
            new_station, created = Station.objects.get_or_create(
                station_id=ibnr,
                defaults={'station_name': name, 'transport_type': 'Train'}
            )
            return JsonResponse({"status": "success", "data": {"id": ibnr, "name": name}})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "error", "message": "Invalid method"}, status=405)