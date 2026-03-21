from django.db import models

class City(models.Model):
    city_id = models.IntegerField(primary_key=True)
    city_name = models.CharField(max_length=100)
    state = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=10, null=True, blank=True)
    avg_rent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    avg_col = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'city'

class University(models.Model):
    uni_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    uni_name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=[('public', 'public'), ('private', 'private')], null=True, blank=True)
    ranking_global = models.IntegerField(null=True, blank=True)
    ranking_by_sub = models.JSONField(null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    website_url = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = 'university'

class Dish(models.Model):
    dish_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True, blank=True) # 0 for national
    dish_name = models.CharField(max_length=255)
    ingredients = models.JSONField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    price_avg = models.CharField(max_length=50, null=True, blank=True)
    how_to_eat = models.TextField(null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    has_pork = models.BooleanField(default=False)
    has_beef = models.BooleanField(default=False)
    has_meat = models.BooleanField(default=False)
    has_dairy = models.BooleanField(default=False)
    has_seafood = models.BooleanField(default=False)
    has_vegan = models.BooleanField(default=False)
    has_vegetarian = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'dishes'

class Housing(models.Model):
    hou_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    housing_type = models.CharField(max_length=50, null=True, blank=True)
    district_name = models.CharField(max_length=100, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    kaltmiete = models.CharField(max_length=50, null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    proximity = models.JSONField(null=True, blank=True)
    highlight = models.TextField(null=True, blank=True)
    costs = models.JSONField(null=True, blank=True)
    data_source = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'housing'

class Station(models.Model):
    station_id = models.CharField(max_length=50, primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    station_name = models.CharField(max_length=255)
    transport_type = models.CharField(max_length=50, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    lines = models.JSONField(null=True, blank=True)
    duration = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = 'stations'

class Place(models.Model):
    place_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, null=True, blank=True)
    tags = models.JSONField(null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    hours = models.CharField(max_length=100, null=True, blank=True)
    price = models.CharField(max_length=50, null=True, blank=True)
    website = models.CharField(max_length=255, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)

    class Meta:
        db_table = 'places'

class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    tags = models.JSONField(null=True, blank=True)
    event_time = models.DateTimeField(null=True, blank=True)
    is_annual = models.BooleanField(default=False)
    time_of_year = models.CharField(max_length=100, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    class Meta:
        db_table = 'events'

class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()