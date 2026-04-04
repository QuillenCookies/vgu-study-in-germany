import os
import requests
import math
from django.db.models import F
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from datetime import datetime
from django.conf import settings
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..db_api import DBApi
from ..models import City, University, Dish, Housing, Station, Place, Event

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

def get_all_cities(request):
    """Returns all cities as a flat list for populating dropdowns."""
    cities = City.objects.all().values('city_id', 'city_name').order_by('city_name')
    data = [{"id": c['city_id'], "name": c['city_name']} for c in cities]
    return JsonResponse({"status": "success", "data": data})

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