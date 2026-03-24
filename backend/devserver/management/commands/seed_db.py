import csv
import json
import os
from datetime import datetime
from django.core.management.base import BaseCommand
from django.conf import settings

# import all models
from devserver.models import (
    Nation, State, City, # Cores
    University, Language, AcaHighlight, Subject, # University
    Housing, Station, RouteType, Stop, # Housing; Commute and train
    Dish, Ingredient, Place, Event, # Entertainment

    # M2M tables
    UniLanguage, UniSubjectRank, UniHighlight, StationRouteType, DishIngredient
)

class Command(BaseCommand):
    help = 'Seed db from csv files'

    def get_csv_path(self, filename):
        # path to database/data
        base_dir = settings.BASE_DIR.parent
        return os.path.join(base_dir, 'database', 'data', filename)

    def parse_json(self, val):
        if not val: 
            return None
        try:
            # fix single quotes to double quotes for json
            return json.loads(val.replace("'", '"'))
        except:
            return None

    def handle(self, *args, **kwargs):
        self.stdout.write("Cleaning db... please wait")

        # Clear data for nation, state and city
        City.objects.all().delete()
        State.objects.all().delete()
        Nation.objects.all().delete()
        
        # clear data in reverse order to avoid foreign key constraints
        UniSubjectRank.objects.all().delete()
        AcaHighlight.objects.all().delete()
        Subject.objects.all().delete()
        Language.objects.all().delete()
        University.objects.all().delete()
        
        Dish.objects.all().delete()
        Ingredient.objects.all().delete()
        Place.objects.all().delete()
        Event.objects.all().delete()
        
        Housing.objects.all().delete()
        
        Stop.objects.all().delete()
        StationRouteType.objects.all().delete()
        Station.objects.all().delete()
        RouteType.objects.all().delete()

        # ====================
        # 1. NATIONS, STATES, CITIES
        # ====================
        
        # Nation items for creating table in bulk
        # (not looping over rows and sending diff API requests)
        self.stdout.write("seeding nations...")
        nation_items = []
        with open(self.get_csv_path('nations.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                nation_items.append(
                    Nation(
                        nation_id = int(row.get("nation_id")),
                        nation_name = row.get("nation_name")
                    )
                )
        Nation.objects.bulk_create(nation_items)

        # State items for creating in bulks
        # (must have the cache as the table has foreign key)
        self.stdout.write("seeding states...")
        nations_cache = {int(n.nation_id): n for n in Nation.objects.all()}
        state_items = []
        with open(self.get_csv_path('states.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                n = nations_cache.get(int(row.get('nation_id')))
                state_items.append(
                    State(
                        state_id=int(row.get('state_id')),
                        nation=n,
                        state_name=row.get('state_name'))
                )
        State.objects.bulk_create(state_items)

        
        # City items for creating in bulk
        # (same as state, need cache)
        self.stdout.write("seeding cities...")
        states_cache = {int(s.state_id): s for s in State.objects.all()}
        city_items = []
        with open(self.get_csv_path('cities.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                s = states_cache.get(int(row.get("state_id")))
                city_items.append(
                    City(
                        city_id=int(row.get("city_id")),
                        state=s,
                        city_name=row.get('city_name'),
                        avg_rent=row.get('avg_rent') if row.get('avg_rent') else None,
                        avg_col=row.get('avg_col') if row.get('avg_col') else None
                    )
                )
        City.objects.bulk_create(city_items)

        # ====================
        # 2. UNIVERSITIES
        # ====================
        self.stdout.write("seeding uni basics...")
        aca_highlight_items = []
        with open(self.get_csv_path('aca_highlights.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                aca_highlight_items.append(
                    AcaHighlight(
                        aca_highlight_id=int(row['aca_highlight_id']),
                        aca_highlight_name=row['aca_highlight_name']
                    )
                )
        AcaHighlight.objects.bulk_create(aca_highlight_items)

        subject_items = []
        with open(self.get_csv_path('subjects.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                subject_items.append(
                    Subject(
                        subject_id=int(row['subject_id']),
                        subject_name=row['subject_name']
                    )
                )
        Subject.objects.bulk_create(subject_items)
                
        language_items = []
        with open(self.get_csv_path('languages.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                language_items.append(
                    Language(
                        lang_id=int(row['lang_id']),
                        lang_name=row['lang_name']
                    )
                )
        Language.objects.bulk_create(language_items)

        self.stdout.write("seeding universities...")
        cities_cache = {int(c.city_id): c for c in City.objects.all()}
        university_items = []
        with open(self.get_csv_path('uni.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                c = cities_cache.get(int(row.get("city_id")))
                university_items.append(
                    University(
                        uni_id=int(row['uni_id']),
                        city=c,
                        uni_name=row['uni_name'],
                        type=row['type'],
                        institution_type=row['institution_type'],
                        ranking_global=row['ranking_global'] if row['ranking_global'] != 'null' else None,
                        lat=row['lat'] if row['lat'] else None,
                        long=row['long'] if row['long'] else None,
                        uni_url=row['uni_url']
                    )
                )
        University.objects.bulk_create(university_items)

        # M2M uni relations
        # 1. University Highlights
        self.stdout.write("linking uni M2M (Highlights)...")
        uni_hl_items = []
        with open(self.get_csv_path('uni_highlights.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni_hl_items.append(
                    UniHighlight(
                        # In the model.py, these are `uni` and `aca_highlight`
                        # Django DB would auto append `_id` behind
                        uni_id=int(row['uni_id']),
                        aca_highlight_id=int(row['aca_highlight_id'])
                    )
                )
        UniHighlight.objects.bulk_create(uni_hl_items)
        
        # 2. University Languages
        self.stdout.write("linking uni M2M (Languages)...")
        uni_lang_items = []
        with open(self.get_csv_path('uni_languages.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni_lang_items.append(
                    UniLanguage(
                        uni_id=int(row['uni_id']),
                        language_id=int(row['lang_id'])
                    )
                )
        UniLanguage.objects.bulk_create(uni_lang_items)

        # 3. University Subject Ranks (This one has the extra 'rank' field!)
        self.stdout.write("linking uni M2M (Subject Ranks)...")
        uni_subj_items = []
        with open(self.get_csv_path('uni_subject_ranks.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni_subj_items.append(
                    UniSubjectRank(
                        uni_id=int(row['uni_id']),
                        subject_id=int(row['subject_id']),
                        rank=int(row['ranking_qs'])
                    )
                )
        UniSubjectRank.objects.bulk_create(uni_subj_items)

        # ====================
        # 3. HOUSING
        # ====================
        self.stdout.write("seeding housing...")
        housing_items = []
        try:
            with open(self.get_csv_path('housing.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = cities_cache.get(int(row.get("city_id")))
                    housing_items.append(
                        Housing(
                            hou_id=int(row['hou_id']),
                            city=c,
                            housing_type=row['housing_type'],
                            lat=row['lat'] if row['lat'] else None,
                            long=row['long'] if row['long'] else None,
                            kaltmiete=row['kaltmiete'],
                            warmmiete=row['warmmiete'],
                            housing_url=row['housing_url']
                        )
                    )
            Housing.objects.bulk_create(housing_items)
        except Exception as e:
            print("skipped housing due to error:", e)

        # ====================
        # 4. TRANSPORT
        # ====================
        self.stdout.write("seeding transport routes & stations...")
        self.stdout.write("seeding transport...")
        # Route Types
        route_type_items = []
        with open(self.get_csv_path('route_types.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                route_type_items.append(RouteType(
                    route_type_id=int(row['route_type_id']),
                    route_type_name=row['route_type_name'],
                    description=row['description']
                ))
        RouteType.objects.bulk_create(route_type_items)

        # Parent Stations
        station_items = []
        with open(self.get_csv_path('parent_stations.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                c = cities_cache.get(int(row['city_id']))
                station_items.append(Station(
                    station_id=int(row['station_id']),
                    station_name=row['stop_name'],
                    city=c,
                    lat=row['lat'] if row['lat'] else None,
                    long=row['long'] if row['long'] else None
                ))
        Station.objects.bulk_create(station_items)

        # Stops
        stations_cache = {int(s.station_id): s for s in Station.objects.all()}
        stop_items = []
        with open(self.get_csv_path('stop_to_stations.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                s = stations_cache.get(int(row.get("station_id")))
                # print(f"Station: {s}")
                stop_items.append(Stop(
                    stop_id=int(row['stop_id']),
                    station=s,
                    lat=row['lat'] if row['lat'] else None,
                    long=row['long'] if row['long'] else None
                ))
        Stop.objects.bulk_create(stop_items)

        # Transport M2M
        station_route_type_items = []
        with open(self.get_csv_path('station_route_types.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                station_route_type_items.append(StationRouteType(
                    station_id=int(row['station_id']),
                    route_type_id=int(row['route_type_id'])
                ))
        StationRouteType.objects.bulk_create(station_route_type_items)

        # ====================
        # 5. FOOD & LEISURE
        # ====================
        self.stdout.write("seeding food and events...")
        ingredient_items = []
        try:
            with open(self.get_csv_path('ingredients.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    ingredient_items.append(
                        Ingredient(
                            ingredient_id=int(row['ingredient_id']),
                            ingredient_name=row['ingredient_name'],
                            how_to_eat=row['how_to_eat'],
                            has_pork=row['has_pork'].upper() == 'TRUE',
                            has_beef=row['has_beef'].upper() == 'TRUE',
                            has_chicken=row['has_chicken'].upper() == 'TRUE',
                            for_vegan=row['for_vegan'].upper() == 'TRUE',
                            for_vegetarian=row['for_vegetarian'].upper() == 'TRUE',
                            has_diary=row['has_diary'].upper() == 'TRUE',
                            has_glutten=row['has_glutten'].upper() == 'TRUE',
                            has_nut=row['has_nut'].upper() == 'TRUE',
                            has_shellfish=row['has_shellfish'].upper() == 'TRUE',
                            has_seafood=row['has_seafood'].upper() == 'TRUE',
                            has_sugar=row['has_sugar'].upper() == 'TRUE',
                            has_salt=row['has_salt'].upper() == 'TRUE',
                            has_high_protein=row['has_high_protein'].upper() == 'TRUE'
                        )
                    )
            Ingredient.objects.bulk_create(ingredient_items)

            dish_items = []
            with open(self.get_csv_path('dishes.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = cities_cache.get(int(row.get("city_id")))
                    dish_items.append(
                        Dish(
                            dish_id=int(row['dish_id']),
                            city=c,
                            dish_name=row['dish_name'],
                            description=row['description'],
                            about=row['about'],
                            price=row['price'] if row['price'] else None
                        )
                    )
            Dish.objects.bulk_create(dish_items)

            place_items = []
            with open(self.get_csv_path('places.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = cities_cache.get(int(row.get("city_id")))
                    place_items.append(
                        Place(
                            place_id=int(row['place_id']),
                            city=c,
                            place_name=row['place_name'],
                            description=row['description'],
                            category=row['category'],
                            icon=row['icon'],
                            lat=row['lat'] if row['lat'] else None,
                            long=row['long'] if row['long'] else None,
                            place_url=row['place_url']
                        )
                    )
            Place.objects.bulk_create(place_items)

            event_items = []
            with open(self.get_csv_path('events.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = cities_cache.get(int(row["city_id"]))
                    t = None
                    if row['time']:
                        t = datetime.strptime(row['time'], '%Y-%m-%d %H:%M:%S')

                    event_items.append(
                        Event(
                            event_id=int(row['event_id']),
                            city=c,
                            event_name=row['event_name'],
                            description=row['description'],
                            tag=row['tag'],
                            time=t,
                            duration=row['duration'],
                            cycle_years=row['cycle_years'] if row['cycle_years'] else None,
                            time_of_year=row['time_of_year'],
                            lat=row['lat'] if row['lat'] else None,
                            long=row['long'] if row['long'] else None,
                            event_url=row['event_url']
                        )
                    )
            Event.objects.bulk_create(event_items)

            # M2M for Dishes and Ingredients
            dish_ingredient_items = []
            with open(self.get_csv_path('dish_ingredients.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    dish_ingredient_items.append(
                        DishIngredient(
                            dish_id=int(row['dish_id']),
                            ingredient_id=int(row['ingredient_id'])
                        )
                    )
            DishIngredient.objects.bulk_create(dish_ingredient_items)
        except Exception as e:
            print("skipped food/leisure due to error:", e)

        self.stdout.write(self.style.SUCCESS('Done seeding everything!'))