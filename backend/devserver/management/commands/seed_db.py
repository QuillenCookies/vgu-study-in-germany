# backend\devserver\management\commands\seed_db.py
import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from devserver.models import City, Dish, Ingredient, DishIngredient, Place, Event
from datetime import datetime

class Command(BaseCommand):
    help = 'Seeds the database from CSV files located in database/data/'

    def get_csv_path(self, filename):
        # Đường dẫn trỏ ra thư mục database/data ở root project
        base_dir = settings.BASE_DIR.parent
        return os.path.join(base_dir, 'database', 'data', filename)

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing Food & Leisure data...')
        DishIngredient.objects.all().delete()
        Ingredient.objects.all().delete()
        Dish.objects.all().delete()
        Event.objects.all().delete()
        Place.objects.all().delete()

        # 1. Bỏ qua seed City vì ta đang giả định bạn đã có (hoặc sẽ xử lý cùng Nation/State sau)
        # Tạm thời query lấy city cho chắc chắn
        
        # 2. Seed Ingredients
        self.stdout.write('Seeding Ingredients...')
        with open(self.get_csv_path('ingredients.csv'), mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
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
                    has_high_protein=row['has_high_protein'].upper() == 'TRUE',
                )

        # 3. Seed Dishes
        self.stdout.write('Seeding Dishes...')
        with open(self.get_csv_path('dishes.csv'), mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                city_obj = None
                if row['city_id']:  # Nếu có city_id (món local)
                    city_obj = City.objects.filter(city_id=row['city_id']).first()
                
                Dish.objects.create(
                    dish_id=row['dish_id'],
                    city=city_obj,
                    dish_name=row['dish_name'],
                    description=row['description'],
                    about=row['about'],
                    price=row['price']
                )

        # 4. Seed Dish_Ingredients
        self.stdout.write('Seeding Dish Ingredients mapping...')
        with open(self.get_csv_path('dish_ingredients.csv'), mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                dish = Dish.objects.get(dish_id=row['dish_id'])
                ingredient = Ingredient.objects.get(ingredient_id=row['ingredient_id'])
                DishIngredient.objects.create(dish=dish, ingredient=ingredient)

        # 5. Seed Events
        self.stdout.write('Seeding Events...')
        with open(self.get_csv_path('events.csv'), mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                city_obj = City.objects.filter(city_id=row['city_id']).first()
                Event.objects.create(
                    event_id=row['event_id'],
                    city=city_obj,
                    event_name=row['event_name'],
                    description=row['description'],
                    tag=row['tag'],
                    time=datetime.strptime(row['time'], '%Y-%m-%d %H:%M:%S'),
                    duration=row['duration'],
                    cycle_years=int(row['cycle_years']),
                    time_of_year=row['time_of_year'],
                    lat=row['lat'],
                    long=row['long'],
                    event_url=row['event_url']
                )

        # 6. Seed Places
        self.stdout.write('Seeding Places...')
        with open(self.get_csv_path('places.csv'), mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                city_obj = City.objects.filter(city_id=row['city_id']).first()
                Place.objects.create(
                    place_id=row['place_id'],
                    city=city_obj,
                    place_name=row['place_name'],
                    description=row['description'],
                    category=row['category'],
                    icon=row['icon'],
                    lat=row['lat'],
                    long=row['long'],
                    place_url=row['place_url']
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded Food & Leisure data from CSVs!'))