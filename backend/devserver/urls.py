from django.urls import path
from . import views

urlpatterns = [
    path('cities/search', views.search_cities),
    path('cities/list', views.get_all_cities),
    path('universities', views.get_universities),
    path('housing/districts', views.get_housing_districts),
    path('entertainment/places', views.get_entertainment_venues),
    path('entertainment/events', views.get_entertainment_events),
    path('food/dishes', views.get_food_dishes),
    path('food/places', views.get_food_places),
    path('trains/routes', views.get_train_routes),
    path('trains/info', views.get_train_static_info),
    path('trains/journey', views.proxy_journey),
    path('locations/search', views.search_locations),
    path('locations/save', views.save_location),
]