from django.db.models import F
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import City, University, Dish, Housing, Station, Place, Event

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

def get_train_routes(request):
    routes = Station.objects.all().values()
    return JsonResponse(list(routes), safe=False)