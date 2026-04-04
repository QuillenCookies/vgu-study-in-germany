from django.db import models
from .core import City

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
    city = models.ForeignKey('City', on_delete=models.CASCADE, db_column='city_id', null=True)
    station_name = models.CharField(max_length=255)
    transport_type = models.CharField(max_length=50, null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    # Explicit Many-to-Many
    route_types = models.ManyToManyField(RouteType, through='StationRouteType')

    class Meta:
        db_table = 'stations'

class Stop(models.Model):
    """Handles individual platforms/stops from stop_to_stations.csv"""
    stop_id = models.CharField(max_length=50, primary_key=True)
    station = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='station_id')
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    class Meta:
        db_table = 'stops'

class StationRouteType(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='station_id')
    route_type = models.ForeignKey(RouteType, on_delete=models.CASCADE, db_column='route_type_id')

    class Meta:
        db_table = 'station_route_types'
        unique_together = ('station', 'route_type')