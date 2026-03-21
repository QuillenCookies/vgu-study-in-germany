import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Euro, Search, Leaf, Globe, Star, Filter, ChefHat, MapPin, UtensilsCrossed } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';

type DietTag = 'Vegetarian' | 'Beef-free' | 'Pork-free' | 'Vegan' | 'All';

interface Dish {
  name: string; origin: string; image: string; description: string;
  dietary: DietTag[]; flavors: string[]; avgCost: string; etiquette?: string;
}

const dishes: Dish[] = [
  {
    name: 'Frankfurter Würstchen', origin: 'German (Frankfurt)',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    description: 'The original Frankfurt sausage — thin, smoked pork sausage traditionally served with mustard and bread rolls.',
    dietary: ['Beef-free'], flavors: ['Savory', 'Hearty'], avgCost: '€3 – €5',
    etiquette: 'Traditionally eaten by hand with mustard only — never ketchup!',
  },
  {
    name: 'Handkäse mit Musik', origin: 'German (Hessian)',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    description: "Hesse's iconic sour milk cheese marinated in oil, vinegar, and onions. A staple in Apfelwein pubs.",
    dietary: ['Vegetarian', 'Pork-free', 'Beef-free'], flavors: ['Sour', 'Savory'], avgCost: '€4 – €6',
    etiquette: '"Musik" is a joke about the digestive sounds after eating.',
  },
  {
    name: 'Grüne Soße (Green Sauce)', origin: 'German (Frankfurt)',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    description: "Frankfurt's beloved herb sauce made from 7 traditional herbs, served with boiled eggs or beef.",
    dietary: ['Vegetarian'], flavors: ['Savory', 'Sour'], avgCost: '€7 – €12',
    etiquette: 'Try it at a traditional Gasthaus (inn) for the full experience.',
  },
  {
    name: 'Pho Bò', origin: 'Vietnamese',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic Vietnamese beef noodle soup popular in Frankfurt\'s large Vietnamese community.',
    dietary: ['Pork-free'], flavors: ['Savory', 'Hearty'], avgCost: '€8 – €12',
    etiquette: 'Slurping noodles is perfectly acceptable and even appreciated!',
  },
  {
    name: 'Döner Kebab', origin: 'Turkish',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    description: "Germany's beloved street food — grilled meat in flatbread with fresh vegetables and sauces.",
    dietary: ['Beef-free'], flavors: ['Savory', 'Spicy'], avgCost: '€5 – €7',
    etiquette: 'Late-night staple — many shops open until 4am.',
  },
  {
    name: 'Bibimbap', origin: 'Korean',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80',
    description: 'Mixed Korean rice bowl with vegetables, gochujang sauce, and egg. Very popular with students.',
    dietary: ['Vegetarian', 'Beef-free', 'Pork-free'], flavors: ['Savory', 'Spicy'], avgCost: '€10 – €15',
    etiquette: 'Mix all ingredients thoroughly before eating for the authentic experience.',
  },
];

const restaurants = [
  { name: 'Metropol Restaurant', cuisine: 'German Traditional', origin: '🇩🇪', location: 'Römerberg', price: '€€', rating: 4.5, suitable: ['Beef-free options'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Bamboo Garden', cuisine: 'Chinese & Pan-Asian', origin: '🇨🇳', location: 'Sachsenhausen', price: '€€', rating: 4.3, suitable: ['Vegetarian', 'Vegan'], image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Pho 1975', cuisine: 'Vietnamese', origin: '🇻🇳', location: 'Bornheim', price: '€', rating: 4.6, suitable: ['Pork-free options'], image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80' },
  { name: 'Saravanaa Bhavan', cuisine: 'South Indian', origin: '🇮🇳', location: 'City Centre', price: '€€', rating: 4.4, suitable: ['Vegetarian', 'Vegan', 'Beef-free', 'Pork-free'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80' },
  { name: 'Istanbul Grill', cuisine: 'Turkish', origin: '🇹🇷', location: 'Gallus', price: '€', rating: 4.2, suitable: ['Beef-free', 'Pork-free'], image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80' },
  { name: 'Felix Restaurant', cuisine: 'International', origin: '🌍', location: 'Westend', price: '€€€', rating: 4.7, suitable: ['All dietary options'], image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80' },
];

const dietFilters: DietTag[] = ['All', 'Vegetarian', 'Vegan', 'Beef-free', 'Pork-free'];
const dietColors: Record<DietTag, string> = {
  All: 'bg-gray-100 text-gray-700', Vegetarian: 'bg-green-100 text-green-700',
  Vegan: 'bg-emerald-100 text-emerald-700', 'Beef-free': 'bg-blue-100 text-blue-700',
  'Pork-free': 'bg-cyan-100 text-cyan-700',
};

const FoodPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<DietTag>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = dishes.filter((dish) => {
    const matchFilter = activeFilter === 'All' || dish.dietary.includes(activeFilter);
    const matchSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || dish.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80)' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#5c1a0a]/80 via-[#3d1209]/70 to-[#1a0804]/50" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-500/30 text-orange-200 text-sm font-medium border border-orange-400/30">🍽️ Frankfurt Culinary Guide</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            Eat in <span className="text-orange-400">Frankfurt</span>
          </h1>
          <p className="text-lg text-white/85 mb-10 max-w-2xl">From traditional Hessian classics to international cuisine — your complete food guide for student life in Frankfurt.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            {[{ label: 'Local Dishes', value: '50+', icon: '🥘' }, { label: 'Dietary Options', value: '4 Types', icon: '🥗' }, { label: 'Restaurants', value: '1,500+', icon: '🍴' }, { label: 'Avg Meal Cost', value: '€8–15', icon: '💶' }].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dish Directory */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">Culinary Directory</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Dishes You'll Love</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Browse authentic dishes available in Frankfurt — filter by dietary preference.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-500" />
              {dietFilters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === f ? 'bg-orange-500 text-white shadow-md' : `${dietColors[f]} hover:opacity-80`}`}>
                  {f === 'Vegetarian' && <Leaf className="w-3 h-3 inline mr-1" />}{f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search dishes..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish, idx) => (
              <motion.div key={dish.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {dish.dietary.map((d) => (
                      <span key={d} className={`text-xs px-2 py-0.5 rounded-full font-medium ${dietColors[d]}`}>{d}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>
                    <span className="flex items-center gap-1 text-orange-600 font-semibold text-sm"><Euro className="w-3.5 h-3.5" />{dish.avgCost}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3"><Globe className="w-3 h-3" /><span>{dish.origin}</span></div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{dish.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dish.flavors.map((f) => (<span key={f} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">{f}</span>))}
                  </div>
                  {dish.etiquette && (<div className="bg-orange-50 rounded-xl p-3 mt-3 border border-orange-100"><p className="text-xs text-orange-700 italic">💡 {dish.etiquette}</p></div>)}
                </div>
              </motion.div>
            ))}
          </div>
          {filteredDishes.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No dishes found for your filter.</p>
              <button onClick={() => { setActiveFilter('All'); setSearchQuery(''); }} className="mt-3 text-orange-600 text-sm hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#3d1209] to-[#7c2c0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold">Restaurant Discovery</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Recommended Restaurants</h2>
            <p className="text-white/70 max-w-xl mx-auto">Student-tested restaurants across Frankfurt's diverse neighborhoods.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r, idx) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-36 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 text-xl bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">{r.origin}</div>
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold px-2 py-0.5 rounded-lg">{r.price}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{r.name}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><ChefHat className="w-3 h-3" />{r.cuisine}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold"><Star className="w-3.5 h-3.5 fill-current" />{r.rating}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3"><MapPin className="w-3 h-3" />{r.location}</div>
                  <div className="flex flex-wrap gap-1">
                    {r.suitable.map((s) => (<span key={s} className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">✓ {s}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter accentColor="#f97316" />
    </div>
  );
};

export default FoodPage;
