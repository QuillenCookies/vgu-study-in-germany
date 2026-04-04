from django.db import models
from .core import City

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