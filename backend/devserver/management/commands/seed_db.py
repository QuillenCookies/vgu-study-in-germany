import json
from django.core.management.base import BaseCommand
from devserver.models import City, University, Dish, Housing, Station, Place, Event

class Command(BaseCommand):
    help = 'Seeds the database with mock data from the frontend'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        City.objects.all().delete()
        University.objects.all().delete()
        Dish.objects.all().delete()
        Housing.objects.all().delete()
        Station.objects.all().delete()
        Place.objects.all().delete()
        Event.objects.all().delete()

        self.stdout.write('Seeding Cities...')
        ffm = City.objects.create(city_id=1, city_name='Frankfurt am Main', state='Hesse', post_code='60311', avg_rent=850.00, avg_col=1100.00)
        da = City.objects.create(city_id=2, city_name='Darmstadt', state='Hesse', post_code='64283', avg_rent=700.00, avg_col=900.00)
        wi = City.objects.create(city_id=3, city_name='Wiesbaden / Frankfurt region', state='Hesse', post_code='65183', avg_rent=750.00, avg_col=950.00)

        self.stdout.write('Seeding Universities...')
        University.objects.create(city=ffm, uni_name='Goethe University Frankfurt', type='Public', ranking_global=250, ranking_by_sub={'Finance': 101}, lat=50.1260, long=8.6675, website_url='https://www.goethe-university-frankfurt.de/en')
        University.objects.create(city=ffm, uni_name='Frankfurt University of Applied Sciences', type='Public', ranking_global=500, ranking_by_sub={'Engineering': 10}, lat=50.1300, long=8.6917, website_url='https://www.frankfurt-university.de/en/')
        University.objects.create(city=ffm, uni_name='Frankfurt School of Finance & Management', type='Private', ranking_global=70, ranking_by_sub={'Finance': 1}, lat=50.1263, long=8.6780, website_url='https://www.frankfurt-school.de/en/')
        University.objects.create(city=wi, uni_name='EBS Universität (European Business School)', type='Private', ranking_global=300, ranking_by_sub={'Business': 1}, lat=50.0825, long=8.2435, website_url='https://www.ebs.edu/en')
        University.objects.create(city=da, uni_name='Hochschule Darmstadt (h_da)', type='Public', ranking_global=450, ranking_by_sub={'Computer Science': 5}, lat=49.8660, long=8.6360, website_url='https://h-da.de/en/')
        University.objects.create(city=ffm, uni_name='Frankfurt Institute for Advanced Studies (FIAS)', type='Public', ranking_global=800, ranking_by_sub={'Physics': 50}, lat=50.1740, long=8.6300, website_url='https://fias.institute/')

        self.stdout.write('Seeding Housing...')
        Housing.objects.create(city=ffm, district_name='Sachsenhausen', housing_type='Popular & Lively', lat=50.0988, long=8.6883, kaltmiete='€700 - €1,100/mo', highlight='Famous Apfelwein district.', costs={'electricity': '€60-80', 'water': '€30', 'food': '€250-350'}, image='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '10 min', 'supermarket': '3 min', 'uni': '20 min', 'transport': 'U1, U2, S-Bahn'})
        Housing.objects.create(city=ffm, district_name='Bornheim', housing_type='Student-Friendly', lat=50.1210, long=8.7103, kaltmiete='€650 - €950/mo', highlight='Multicultural, vibrant.', costs={'electricity': '€55-75', 'water': '€28', 'food': '€220-320'}, image='https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '15 min', 'supermarket': '5 min'})
        Housing.objects.create(city=ffm, district_name='Westend', housing_type='Premium & Quiet', lat=50.1195, long=8.6548, kaltmiete='€1,000 - €1,800/mo', highlight='Upscale residential area.', costs={'electricity': '€70-90', 'water': '€35', 'food': '€280-400'}, image='https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '8 min'})
        Housing.objects.create(city=ffm, district_name='Nordend', housing_type='Trendy & Cultural', lat=50.1277, long=8.6893, kaltmiete='€750 - €1,100/mo', highlight='Highly sought-after by students.', costs={'electricity': '€60-80', 'water': '€30', 'food': '€240-340'}, image='https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '12 min'})
        Housing.objects.create(city=ffm, district_name='Gallus', housing_type='Budget-Friendly', lat=50.1065, long=8.6481, kaltmiete='€550 - €800/mo', highlight='Most affordable option near the main station.', costs={'electricity': '€50-70', 'water': '€25', 'food': '€200-280'}, image='https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '18 min'})
        Housing.objects.create(city=ffm, district_name='Bockenheim', housing_type='University Quarter', lat=50.1152, long=8.6456, kaltmiete='€600 - €900/mo', highlight='Directly adjacent to Goethe University campus.', costs={'electricity': '€55-75', 'water': '€28', 'food': '€210-310'}, image='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', proximity={'hospital': '10 min'})

        self.stdout.write('Seeding Dishes & Restaurants...')
        Dish.objects.create(city=ffm, dish_name='Frankfurter Würstchen', ingredients=['Pork'], about='The original Frankfurt sausage', price_avg='€3 - €5', how_to_eat='Traditionally eaten by hand with mustard only', has_pork=True, has_beef=False, has_vegetarian=False, has_vegan=False, image='https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80')
        Dish.objects.create(city=ffm, dish_name='Handkäse mit Musik', ingredients=['Cheese', 'Onions', 'Vinegar'], about="Hesse's iconic sour milk cheese", price_avg='€4 - €6', how_to_eat='"Musik" is a joke about the digestive sounds after eating.', has_pork=False, has_beef=False, has_vegetarian=True, has_vegan=False, image='https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80')
        Dish.objects.create(city=ffm, dish_name='Grüne Soße (Green Sauce)', ingredients=['7 Herbs', 'Eggs'], about="Frankfurt's beloved herb sauce", price_avg='€7 - €12', how_to_eat='Try it at a traditional Gasthaus', has_pork=False, has_beef=False, has_vegetarian=True, has_vegan=False, image='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80')
        Dish.objects.create(city=ffm, dish_name='Pho Bò', ingredients=['Beef', 'Noodles'], about='Aromatic Vietnamese beef noodle soup', price_avg='€8 - €12', how_to_eat='Slurping noodles is perfectly acceptable', has_pork=False, has_beef=True, has_vegetarian=False, has_vegan=False, image='https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&q=80')
        Dish.objects.create(city=ffm, dish_name='Döner Kebab', ingredients=['Meat', 'Bread', 'Vegetables'], about="Germany's beloved street food", price_avg='€5 - €7', how_to_eat='Late-night staple', has_pork=False, has_beef=True, has_vegetarian=False, has_vegan=False, image='https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80')
        Dish.objects.create(city=ffm, dish_name='Bibimbap', ingredients=['Rice', 'Vegetables', 'Egg'], about='Mixed Korean rice bowl with vegetables', price_avg='€10 - €15', how_to_eat='Mix all ingredients thoroughly', has_pork=False, has_beef=False, has_vegetarian=True, has_vegan=False, image='https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80')

        Place.objects.create(city=ffm, name='Metropol Restaurant', category='Restaurant', address='Römerberg', rating=4.5, tags=['German Traditional', 'Beef-free options'], price='€€', image='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80')
        Place.objects.create(city=ffm, name='Bamboo Garden', category='Restaurant', address='Sachsenhausen', rating=4.3, tags=['Chinese & Pan-Asian', 'Vegetarian', 'Vegan'], price='€€', image='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80')
        Place.objects.create(city=ffm, name='Pho 1975', category='Restaurant', address='Bornheim', rating=4.6, tags=['Vietnamese', 'Pork-free options'], price='€', image='https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80')

        self.stdout.write('Seeding Entertainment...')
        Place.objects.create(city=ffm, name='Alte Oper Frankfurt', category='Venue', description="Frankfurt's iconic neo-Renaissance concert hall", address='Opernplatz 1, 60313 Frankfurt', hours='Box office: Mon-Fri 10:00-19:00', price='€15 - €120', tags=['International orchestras', 'Opera productions'], website='https://www.alteoper.de', image='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80')
        Place.objects.create(city=ffm, name='Städel Museum', category='Venue', description='One of Germany\'s most significant art museums', address='Schaumainkai 63, 60596 Frankfurt', hours='Tue-Sun 10:00-18:00', price='€16', tags=['700 years of art history'], website='https://www.staedelmuseum.de', image='https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=800&q=80')

        Event.objects.create(city=ffm, name='Museumsuferfest', description="Europe's largest culture festival along the museum riverbank.", time_of_year='August', is_annual=True)
        Event.objects.create(city=ffm, name='Weihnachtsmarkt', description="One of Germany's oldest Christmas markets.", time_of_year='November - December', is_annual=True)

        self.stdout.write('Seeding Stations & Routes...')
        Station.objects.create(station_id='S1-S9', city=ffm, station_name='S-Bahn - Frankfurt Metro Rail', transport_type='Train', description='The backbone of Frankfurt commuting.', lines=['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S8', 'S9'], duration='Every 15-30 min', image='https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1080&q=80')
        Station.objects.create(station_id='U1-U9', city=ffm, station_name='U-Bahn - City Subway', transport_type='Subway', description='Frankfurt\'s underground subway covers the inner city.', lines=['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'], duration='Every 5-10 min (peak)', image='https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=1080&q=80')

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with mock data'))
