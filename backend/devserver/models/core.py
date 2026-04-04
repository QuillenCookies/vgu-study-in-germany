from django.db import models

# ==========================================
# 1. CORE (ROOT)
# ==========================================
class Nation(models.Model):
    nation_id = models.IntegerField(primary_key=True)
    nation_name = models.CharField(max_length=100)

    class Meta:
        db_table = 'nations'

class State(models.Model):
    state_id = models.IntegerField(primary_key=True)
    nation = models.ForeignKey(Nation, on_delete=models.CASCADE, db_column='nation_id', null=True)
    state_name = models.CharField(max_length=100)

    class Meta:
        db_table = 'states'

class City(models.Model):
    city_id = models.IntegerField(primary_key=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, db_column='state_id', null=True)
    city_name = models.CharField(max_length=100)
    avg_rent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    avg_col = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'cities'