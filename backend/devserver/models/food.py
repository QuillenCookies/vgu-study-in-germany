from django.db import models
from .core import City

# ==========================================
# 5. FOOD & LEISURE DOMAIN (M2M)
# ==========================================
class Ingredient(models.Model):
    ingredient_id = models.IntegerField(primary_key=True)
    ingredient_name = models.CharField(max_length=100)
    how_to_eat = models.TextField(null=True, blank=True)
    has_pork = models.BooleanField(default=False)
    has_beef = models.BooleanField(default=False)
    has_chicken = models.BooleanField(default=False)
    for_vegan = models.BooleanField(default=False)
    for_vegetarian = models.BooleanField(default=False)
    has_diary = models.BooleanField(default=False)
    has_glutten = models.BooleanField(default=False)
    has_nut = models.BooleanField(default=False)
    has_shellfish = models.BooleanField(default=False)
    has_seafood = models.BooleanField(default=False)
    has_sugar = models.BooleanField(default=False)
    has_salt = models.BooleanField(default=False)
    has_high_protein = models.BooleanField(default=False)

    class Meta:
        db_table = 'ingredients'

class Dish(models.Model):
    dish_id = models.IntegerField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True, blank=True)
    dish_name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    ingredients = models.ManyToManyField(Ingredient, db_table='DishIngredient')

    class Meta:
        db_table = 'dishes'

class Place(models.Model):
    place_id = models.IntegerField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    place_name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    icon = models.CharField(max_length=10, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    place_url = models.TextField(null=True, blank=True)
    
    dishes = models.ManyToManyField(Dish, db_table='place_dishes', blank=True)

    class Meta:
        db_table = 'places'

class Event(models.Model):
    event_id = models.IntegerField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    event_name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    tag = models.CharField(max_length=50, null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    duration = models.CharField(max_length=50, null=True, blank=True)
    cycle_years = models.IntegerField(null=True, blank=True)
    time_of_year = models.CharField(max_length=100, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    event_url = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'events'

# M2M for Dishes and Ingredients
class DishIngredient(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE, db_column='dish_id', null=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, db_column='ingredient_id', null=True)

    class Meta:
        db_table = 'dish_ingredients'
        unique_together = ('dish', 'ingredient')