import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Music, Theater, Trees, Star, ArrowLeft, Ticket, Calendar, Clock,
  MapPin, Users, Sparkles, Film, Coffee, Moon, Sun
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';


// ─── Data ──────────────────────────────────────────────────────────────────

const venues = [
  {
    name: 'Alte Oper Frankfurt',
    type: 'Concert Hall & Opera',
    icon: <Music className="w-7 h-7" />,
    color: 'from-purple-600 to-indigo-600',
    bg: 'bg-purple-50',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Frankfurt\'s iconic neo-Renaissance concert hall hosting world-class orchestras, opera, and classical performances.',
    address: 'Opernplatz 1, 60313 Frankfurt',
    hours: 'Box office: Mon–Fri 10:00–19:00',
    highlights: ['International orchestras', 'Opera productions', 'Jazz & pop concerts', 'New Year\'s gala'],
    price: '€15 – €120',
    website: 'https://www.alteoper.de',
  },
  {
    name: 'Städel Museum',
    type: 'Art Museum',
    icon: <Star className="w-7 h-7" />,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=800&q=80',
    description: 'One of Germany\'s most significant art museums with works spanning 700 years, from the Middle Ages to the present day.',
    address: 'Schaumainkai 63, 60596 Frankfurt',
    hours: 'Tue–Sun 10:00–18:00 (Thu until 21:00)',
    highlights: ['700 years of art history', 'Botticelli to Picasso', 'Garden events', 'Student discounts'],
    price: '€16 (students €14)',
    website: 'https://www.staedelmuseum.de',
  },
  {
    name: 'Palmengarten',
    type: 'Botanical Garden & Events',
    icon: <Trees className="w-7 h-7" />,
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
    description: 'A stunning 22-hectare botanical garden that transforms into an outdoor venue for summer concerts and festivals.',
    address: 'Siesmayerstraße 61, 60323 Frankfurt',
    hours: 'Daily 09:00–18:00 (seasonal variations)',
    highlights: ['Summer concerts', 'Greenhouse collections', 'Family events', 'Annual Rose Garden festival'],
    price: '€7 (students €3.50)',
    website: 'https://palmengarten.de',
  },
  {
    name: 'Berger Straße',
    type: 'Nightlife & Dining Strip',
    icon: <Moon className="w-7 h-7" />,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    description: 'Frankfurt\'s vibrant cultural mile with bars, restaurants, cafes, and independent shops. Popular with students.',
    address: 'Berger Straße, 60316 Frankfurt',
    hours: 'Bars open until 01:00–03:00',
    highlights: ['Student bars & pubs', 'International restaurants', 'Live music venues', 'Weekend markets'],
    price: 'Free entry (drinks from €3)',
    website: '#',
  },
  {
    name: 'Senckenberg Museum',
    type: 'Natural History Museum',
    icon: <Film className="w-7 h-7" />,
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
    description: 'Europe\'s second-largest natural history museum featuring massive dinosaur skeletons and biodiversity exhibitions.',
    address: 'Senckenberganlage 25, 60325 Frankfurt',
    hours: 'Mon–Sun 09:00–17:00 (Wed/Thu until 20:00)',
    highlights: ['Full dinosaur skeletons', 'Planet Earth showcase', 'Biodiversity Lab', 'Night museum events'],
    price: '€12 (students €6)',
    website: 'https://www.senckenberg.de',
  },
  {
    name: 'Kleinmarkthalle',
    type: 'Market & Local Food Hall',
    icon: <Coffee className="w-7 h-7" />,
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    description: 'Frankfurt\'s beloved indoor market with 150+ stalls selling local produce, international foods, and street snacks.',
    address: 'Hasengasse 5-7, 60311 Frankfurt',
    hours: 'Mon–Fri 08:00–18:00, Sat 08:00–16:00',
    highlights: ['Fresh Frankfurt sausages', 'International spices', 'Local cheeses & wine', 'Upstairs wine bar'],
    price: 'Free entry',
    website: '#',
  },
];

const events = [
  {
    name: 'Museumsuferfest',
    month: 'August',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    description: 'Europe\'s largest culture festival along the museum riverbank. 3 days, 40+ museums, free entry.',
  },
  {
    name: 'Luminale',
    month: 'Spring (biennial)',
    icon: <Star className="w-5 h-5" />,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    description: 'Light art festival transforming Frankfurt\'s architecture into stunning illuminated art installations.',
  },
  {
    name: 'Weihnachtsmarkt',
    month: 'November – December',
    icon: <Theater className="w-5 h-5" />,
    color: 'text-red-600',
    bg: 'bg-red-100',
    description: 'One of Germany\'s oldest Christmas markets in the historic Römerberg. A magical student experience.',
  },
  {
    name: 'Mainfest',
    month: 'August',
    icon: <Sun className="w-5 h-5" />,
    color: 'text-amber-400',
    bg: 'bg-orange-100',
    description: 'A beloved folk festival along the Main riverbank with traditional foods, rides, and live entertainment.',
  },
  {
    name: 'Frankfurt Book Fair',
    month: 'October',
    icon: <Users className="w-5 h-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    description: 'The world\'s largest trade fair for books. Students can attend on public days for a unique cultural experience.',
  },
  {
    name: 'Dippemess',
    month: 'Spring & Autumn',
    icon: <Ticket className="w-5 h-5" />,
    color: 'text-green-600',
    bg: 'bg-green-100',
    description: 'Frankfurt\'s traditional funfair at the fairgrounds with rides, food stalls, and entertainment for all ages.',
  },
];

const stats = [
  { label: 'Venues & Clubs', value: '200+', icon: <Theater className="w-5 h-5" /> },
  { label: 'Annual Events', value: '50+', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Museums', value: '30+', icon: <Star className="w-5 h-5" /> },
  { label: 'Free Entry Days', value: 'Weekly', icon: <Ticket className="w-5 h-5" /> },
];

// ─── Component ─────────────────────────────────────────────────────────────

const EntertainmentPage: React.FC = () => {
  const { tr } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1220]">
      <Navbar />
      {/* Navbar spacer — compensates for fixed positioning */}
      <div className="h-[59px]" />

      {/* Hero Banner */}
      <section
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: '60vh' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0533]/80 via-[#1a0533]/60 to-[#1a0533]/40" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {tr('entertainment', 'backHome')}
          </Link>

          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-500/30 text-purple-200 text-sm font-medium tracking-wide backdrop-blur-sm border border-purple-400/30">
            {tr('entertainment', 'badge')}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {tr('entertainment', 'title1')}{' '}
            <span className="text-purple-400">{tr('entertainment', 'title2')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl">
            {tr('entertainment', 'desc')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="flex justify-center mb-1 text-purple-300">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
              Fixed Venues
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Frankfurt's Best Venues
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From world-class concert halls to lively nightlife districts — here are the top spots every student should explore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, idx) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${venue.color} opacity-50`} />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white">
                    {venue.icon}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {venue.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{venue.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{venue.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                      <span>{venue.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                      <span>{venue.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                      <Ticket className="w-4 h-4 flex-shrink-0" />
                      <span>{venue.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {venue.highlights.map((h) => (
                      <span
                        key={h}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${venue.bg} text-gray-700 dark:text-gray-300`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {venue.website !== '#' && (
                    <a
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1a0533] to-[#1A2B4C]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-purple-500/30 text-purple-300 text-sm font-semibold border border-purple-400/30">
              Dynamic Events
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Frankfurt's Annual Calendar
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Plan your student life around these incredible events that make Frankfurt a world-class cultural city.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${event.bg}`}>
                    <span className={event.color}>{event.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{event.name}</h3>
                    <div className="flex items-center gap-1 text-purple-300 text-xs mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{event.month}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife Tips */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-sm font-semibold">
              Student Tips
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              {tr('entertainment', 'secTipsTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Practical tips for students to enjoy Frankfurt's culture on a budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                tip: 'Museum Discount',
                icon: '🎟️',
                desc: 'Show your student ID for up to 50% off at most Frankfurt museums. Many offer free entry on certain days.',
              },
              {
                tip: 'Festivale Season',
                icon: '🎪',
                desc: 'Summer months (June-August) are packed with free open-air festivals along the Main River — perfect for students.',
              },
              {
                tip: 'NightRide Service',
                icon: '🚌',
                desc: 'RMV NightRide buses run every 30 minutes after midnight on weekends — great for getting home safe after events.',
              },
              {
                tip: 'Sachsenhausen District',
                icon: '🍺',
                desc: 'Frankfurt\'s pub quarter is famous for Apfelwein (apple wine) bars. Budget-friendly and uniquely German.',
              },
            ].map((item) => (
              <div key={item.tip} className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.tip}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer component moved to App.tsx */}
    </div>
  );
};

export default EntertainmentPage;
