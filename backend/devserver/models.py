from django.db.models import Model, CharField, IntegerField

# Create your models here.
class MenuItem(Model):
    name = CharField(max_length = 255)
    price = IntegerField()