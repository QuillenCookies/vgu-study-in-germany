import csv
import json
import os
from datetime import datetime
from django.core.management.base import BaseCommand
from django.conf import settings

# import all models
from devserver.models import (
    Nation, State, City, University, Dish, Housing, Station, Place, Event,
    Ingredient, Language, AcaHighlight, Subject, UniSubjectRank, RouteType
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
        Nation.objects.all().delete()
        State.objects.all().delete()
        City.objects.all().delete()
        
        # clear data in reverse order to avoid foreign key constraints
        UniSubjectRank.objects.all().delete()
        University.objects.all().delete()
        AcaHighlight.objects.all().delete()
        Subject.objects.all().delete()
        Language.objects.all().delete()
        
        Dish.objects.all().delete()
        Ingredient.objects.all().delete()
        Place.objects.all().delete()
        Event.objects.all().delete()
        
        Housing.objects.all().delete()
        Station.objects.all().delete()
        RouteType.objects.all().delete()

        # ====================
        # 1. CITIES
        # ====================
        self.stdout.write("seeding nations...")
        with open(self.get_csv_path('nations.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                Nation.objects.create(
                    nation_id=row.get('nation_id'),
                    nation_name=row.get('nation_name')
                )

        self.stdout.write("seeding states...")
        with open(self.get_csv_path('states.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                n = Nation.objects.filter(nation_id=row.get('nation_id')).first()
                State.objects.create(
                    state_id=row.get('state_id'),
                    nation=n,
                    state_name=row.get('state_name')
                )

        self.stdout.write("seeding cities...")
        with open(self.get_csv_path('cities.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                s = State.objects.filter(state_id=row.get('state_id')).first()
                City.objects.create(
                    city_id=row.get('city_id'),
                    state=s,
                    city_name=row.get('city_name'),
                    avg_rent=row.get('avg_rent') if row.get('avg_rent') else None,
                    avg_col=row.get('avg_col') if row.get('avg_col') else None
                )

        # ====================
        # 2. UNIVERSITIES
        # ====================
        self.stdout.write("seeding uni basics...")
        with open(self.get_csv_path('aca_highlights.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                AcaHighlight.objects.create(aca_highlight_id=row['aca_highlight_id'], aca_highlight_name=row['aca_highlight_name'])

        with open(self.get_csv_path('subjects.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                Subject.objects.create(subject_id=row['subject_id'], subject_name=row['subject_name'])
                
        with open(self.get_csv_path('languages.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                Language.objects.create(lang_id=row['lang_id'], lang_name=row['lang_name'])

        self.stdout.write("seeding universities...")
        with open(self.get_csv_path('uni.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                c = City.objects.filter(city_id=row['city_id']).first()
                University.objects.create(
                    uni_id=row['uni_id'],
                    city=c,
                    uni_name=row['uni_name'],
                    type=row['type'],
                    institution_type=row['institution_type'],
                    ranking_global=row['ranking_global'] if row['ranking_global'] != 'null' else None,
                    lat=row['lat'] if row['lat'] else None,
                    long=row['long'] if row['long'] else None,
                    uni_url=row['uni_url']
                )

        # M2M uni relations
        self.stdout.write("linking uni M2M...")
        with open(self.get_csv_path('uni_highlights.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni = University.objects.get(uni_id=row['uni_id'])
                hl = AcaHighlight.objects.get(aca_highlight_id=row['aca_highlight_id'])
                uni.highlights.add(hl)
                
        with open(self.get_csv_path('uni_languages.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni = University.objects.get(uni_id=row['uni_id'])
                lang = Language.objects.get(lang_id=row['lang_id'])
                uni.languages.add(lang)

        with open(self.get_csv_path('uni_subject_ranks.csv'), 'r', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                uni = University.objects.get(uni_id=row['uni_id'])
                sub = Subject.objects.get(subject_id=row['subject_id'])
                UniSubjectRank.objects.create(uni=uni, subject=sub, rank=row['ranking_qs'])


        # ====================
        # 3. HOUSING
        # ====================
        self.stdout.write("seeding housing...")
        try:
            with open(self.get_csv_path('housing.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = City.objects.filter(city_id=row['city_id']).first()
                    Housing.objects.create(
                        hou_id=row['hou_id'],
                        city=c,
                        housing_type=row['housing_type'],
                        lat=row['lat'] if row['lat'] else None,
                        long=row['long'] if row['long'] else None,
                        kaltmiete=row['kaltmiete'],
                        warmmiete=row['warmmiete'],
                        housing_url=row['housing_url']
                    )
        except Exception as e:
            print("skipped housing due to error:", e)

        # ====================
        # 4. TRANSPORT
        # ====================
        self.stdout.write("seeding transport routes & stations...")
        try:
            with open(self.get_csv_path('route_types.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    RouteType.objects.create(
                        route_type_id=row['route_type_id'],
                        route_type_name=row['route_type_name'],
                        description=row['description']
                    )
                    
            with open(self.get_csv_path('stations.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = City.objects.filter(city_id=row['city_id']).first()
                    Station.objects.create(
                        station_id=row['station_id'],
                        city=c,
                        station_name=row['station_name'],
                        transport_type=row['transport_type'],
                        lat=row['lat'] if row['lat'] else None,
                        long=row['long'] if row['long'] else None
                    )

            with open(self.get_csv_path('station_route_types.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    st = Station.objects.get(station_id=row['station_id'])
                    rt = RouteType.objects.get(route_type_id=row['route_type_id'])
                    st.route_types.add(rt)
        except Exception as e:
            print("skipped transport due to error:", e)


        # ====================
        # 5. FOOD & LEISURE
        # ====================
        self.stdout.write("seeding food and events...")
        try:
            with open(self.get_csv_path('ingredients.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    Ingredient.objects.create(
                        ingredient_id=row['ingredient_id'],
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

            with open(self.get_csv_path('dishes.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = City.objects.filter(city_id=row['city_id']).first() if row.get('city_id') else None
                    Dish.objects.create(
                        dish_id=row['dish_id'],
                        city=c,
                        dish_name=row['dish_name'],
                        description=row['description'],
                        about=row['about'],
                        price=row['price'] if row['price'] else None
                    )
            
            with open(self.get_csv_path('dish_ingredients.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    d = Dish.objects.get(dish_id=row['dish_id'])
                    ing = Ingredient.objects.get(ingredient_id=row['ingredient_id'])
                    d.ingredients.add(ing)

            with open(self.get_csv_path('places.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = City.objects.filter(city_id=row['city_id']).first()
                    Place.objects.create(
                        place_id=row['place_id'],
                        city=c,
                        place_name=row['place_name'],
                        description=row['description'],
                        category=row['category'],
                        icon=row['icon'],
                        lat=row['lat'] if row['lat'] else None,
                        long=row['long'] if row['long'] else None,
                        place_url=row['place_url']
                    )

            with open(self.get_csv_path('events.csv'), 'r', encoding='utf-8') as f:
                for row in csv.DictReader(f):
                    c = City.objects.filter(city_id=row['city_id']).first()
                    t = None
                    if row['time']:
                        t = datetime.strptime(row['time'], '%Y-%m-%d %H:%M:%S')

                    Event.objects.create(
                        event_id=row['event_id'],
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
        except Exception as e:
            print("skipped food/leisure due to error:", e)

        self.stdout.write(self.style.SUCCESS('Done seeding everything!'))