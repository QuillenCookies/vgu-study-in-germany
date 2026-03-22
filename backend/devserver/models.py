from django.db import models

# ==========================================
# 1. CORE (ROOT)
# ==========================================
class City(models.Model):
    city_id = models.IntegerField(primary_key=True)
    city_name = models.CharField(max_length=100)
    state = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=10, null=True, blank=True)
    avg_rent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    avg_col = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'city'

# ==========================================
# 2. UNIVERSITY DOMAIN (M2M)
# ==========================================
class Language(models.Model):
    lang_id = models.AutoField(primary_key=True)
    lang_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'languages'

class AcaHighlight(models.Model):
    aca_highlight_id = models.AutoField(primary_key=True)
    aca_highlight_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'aca_highlights'

class Subject(models.Model):
    subject_id = models.AutoField(primary_key=True)
    subject_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'subjects'

class University(models.Model):
    uni_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    uni_name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, null=True, blank=True) # University / Applied Sciences...
    institution_type = models.CharField(max_length=50, null=True, blank=True) # Public / Private
    ranking_global = models.IntegerField(null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    uni_url = models.TextField(null=True, blank=True)

    # Các quan hệ Nhiều - Nhiều
    languages = models.ManyToManyField(Language, db_table='university_languages')
    highlights = models.ManyToManyField(AcaHighlight, db_table='uni_highlights')
    
    # Quan hệ Nhiều-Nhiều có chứa extra field (rank) -> Phải dùng bảng trung gian custom
    subjects = models.ManyToManyField(Subject, through='UniSubjectRank')

    class Meta:
        db_table = 'universities'

# Bảng trung gian custom cho Subjects và University vì có cột 'rank'
class UniSubjectRank(models.Model):
    uni = models.ForeignKey(University, on_delete=models.CASCADE, db_column='uni_id')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, db_column='subject_id')
    rank = models.IntegerField()

    class Meta:
        db_table = 'uni_subject_ranks'
        unique_together = ('uni', 'subject')

# ==========================================
# 3. HOUSING DOMAIN
# ==========================================
class Housing(models.Model):
    hou_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    housing_type = models.CharField(max_length=50, null=True, blank=True) # WG, Einzelzimmer, Studio
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    kaltmiete = models.CharField(max_length=50, null=True, blank=True)
    warmmiete = models.CharField(max_length=50, null=True, blank=True)
    housing_url = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'housing'

# ==========================================
# 4. TRANSPORT DOMAIN (GTFS Based M2M)
# ==========================================
class RouteType(models.Model):
    route_type_id = models.IntegerField(primary_key=True)
    route_type_name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'route_types'

class Station(models.Model):
    station_id = models.CharField(max_length=50, primary_key=True) # GTFS ID
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    station_name = models.CharField(max_length=255)
    transport_type = models.CharField(max_length=50, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    # Quan hệ Nhiều - Nhiều
    route_types = models.ManyToManyField(RouteType, db_table='station_route_types')

    class Meta:
        db_table = 'stations'

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
    
    ingredients = models.ManyToManyField(Ingredient, db_table='dish_ingredients')

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