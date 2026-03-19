from django.core.management.base import BaseCommand
from devserver.models import City, University, Dish, Housing, Station, Place, Event

class Command(BaseCommand):
    help = 'Seeds the database with core Hessen hubs and minimal mock data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        City.objects.all().delete()
        University.objects.all().delete()
        Station.objects.all().delete()
        Dish.objects.all().delete()
        Housing.objects.all().delete()
        Place.objects.all().delete()
        Event.objects.all().delete()

        self.stdout.write('Seeding Cities (Hessen Hubs)...')
        da = City.objects.create(city_id=1, city_name='Darmstadt', state='Hesse', post_code='64283')
        ffm = City.objects.create(city_id=2, city_name='Frankfurt', state='Hesse', post_code='60311')
        die = City.objects.create(city_id=3, city_name='Dieburg', state='Hesse', post_code='64807')
        mz = City.objects.create(city_id=4, city_name='Mainz', state='Rheinland-Pfalz', post_code='55116')
        wi = City.objects.create(city_id=5, city_name='Wiesbaden', state='Hesse', post_code='65183')

        self.stdout.write('Seeding Minimal Universities...')
        University.objects.create(city=da, uni_name='TU Darmstadt', type='public')
        University.objects.create(city=ffm, uni_name='Goethe University Frankfurt', type='public')

        self.stdout.write('Seeding Stations (Hessen Hubs - Strictly Clean Names)...')
        # Station ID for Frankfurt was provided as 8011160 by instructions, though traditionally Berlin Hbf
        stations = [
            {'id': '8000068', 'city': da, 'name': 'Darmstadt', 'desc': 'Central hub for TU Darmstadt students'},
            {'id': '8000105', 'city': ffm, 'name': 'Frankfurt', 'desc': 'Major transit hub for the region'},
            {'id': '8001396', 'city': die, 'name': 'Dieburg', 'desc': 'Campus Dieburg location'},
            {'id': '8000240', 'city': mz, 'name': 'Mainz', 'desc': 'Rheinland-Pfalz state capital'},
            {'id': '8000250', 'city': wi, 'name': 'Wiesbaden', 'desc': 'Hesse state capital'},
        ]

        for s in stations:
            Station.objects.create(
                station_id=s['id'],
                city=s['city'],
                station_name=s['name'],
                description=s['desc'],
                transport_type='Train'
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded Hessen Hubs.'))
