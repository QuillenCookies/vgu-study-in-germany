# Feature:

- User choose a random place, and a university.
- They get: shortest route from the place to the university, including the walking / bus transition.


# Method: (you think up more please)
- Download the GTFS data to get the route and trips (https://gtfs.de/en/feeds/de_full/); Real time in Hessen (Check this out: https://www.nvbw.de/open-data/fahrplandaten) - no need I guess.
- Plan it whatever way you think is good... It would be decent if you allow multiple ways of getting the random place: insert a lat / long; insert a place name.


# Predefined Database Table:

- Path: `backend\devserver\models\train.py`
- parent_station: station_id,city_id,stop_name,lat,long
- route_types: route_type_id,route_type_name,description
- station_route_types: station_id,route_type_id
- stop_to_stations: stop_id,station_id,lat,long

# The frequently GTFS updated table (which are in text files):

- routes.txt: route_long_name,route_short_name,agency_id,route_type,route_id,route_color,route_text_color
- stop_times.txt: trip_id,arrival_time,departure_time,stop_id,stop_sequence,pickup_type,drop_off_type
- trips.txt: route_id,service_id,trip_id

# Your task:

Carefully plan out this task for an AI to work on it. Plan the steps carefully and comprehensively, follow the API documents **VERY CLOSELY**