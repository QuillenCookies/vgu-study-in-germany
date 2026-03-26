import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Search, Loader2, GraduationCap, TrainFront, Building2,
  UtensilsCrossed, Ticket, ArrowRight, Users, MapPin, Compass,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUniversity } from '../context/UniversityContext';
import type { LocationState } from '../context/UniversityContext';

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const HERO_BG =
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=80';

const WISE_QUACKS = [
  {
    id: 0,
    trTip: 'tip0' as const,
    trTag: 'tip0tag' as const,
    color: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-400/30',
    tagColor: 'text-green-400',
  },
  {
    id: 1,
    trTip: 'tip1' as const,
    trTag: 'tip1tag' as const,
    color: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-400/30',
    tagColor: 'text-blue-400',
  },
  {
    id: 2,
    trTip: 'tip2' as const,
    trTag: 'tip2tag' as const,
    color: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-400/30',
    tagColor: 'text-orange-400',
  },
];

const QUICK_TAGS = [
  { emoji: '🏫', trKey: 'tagEducation' as const, href: '/university' },
  { emoji: '🚲', trKey: 'tagTransport' as const, href: '/bahn' },
  { emoji: '🏠', trKey: 'tagHousing' as const, href: '/housing' },
  { emoji: '🥨', trKey: 'tagFood' as const, href: '/food' },
  { emoji: '🎉', trKey: 'tagEntertainment' as const, href: '/entertainment' },
];

const TOPIC_SECTIONS = [
  {
    icon: <GraduationCap size={22} />,
    trLabel: 'tagEducation' as const,
    trTagline: 'topicEduTagline' as const,
    href: '/university',
    accent: '#f97316',
    gradient: 'from-orange-500/10 to-amber-400/5',
    border: 'border-orange-200 dark:border-orange-900/40',
  },
  {
    icon: <TrainFront size={22} />,
    trLabel: 'tagTransport' as const,
    trTagline: 'topicTransTagline' as const,
    href: '/bahn',
    accent: '#22c55e',
    gradient: 'from-green-500/10 to-emerald-400/5',
    border: 'border-green-200 dark:border-green-900/40',
  },
  {
    icon: <Building2 size={22} />,
    trLabel: 'tagHousing' as const,
    trTagline: 'topicHouseTagline' as const,
    href: '/housing',
    accent: '#a855f7',
    gradient: 'from-purple-500/10 to-violet-400/5',
    border: 'border-purple-200 dark:border-purple-900/40',
  },
  {
    icon: <UtensilsCrossed size={22} />,
    trLabel: 'tagFood' as const,
    trTagline: 'topicFoodTagline' as const,
    href: '/food',
    accent: '#ef4444',
    gradient: 'from-red-500/10 to-rose-400/5',
    border: 'border-red-200 dark:border-red-900/40',
  },
  {
    icon: <Ticket size={22} />,
    trLabel: 'tagEntertainment' as const,
    trTagline: 'topicEntTagline' as const,
    href: '/entertainment',
    accent: '#14b8a6',
    gradient: 'from-teal-500/10 to-cyan-400/5',
    border: 'border-teal-200 dark:border-teal-900/40',
  },
];

const FIRST_PADDLE_ITEMS = [
  {
    icon: <Compass size={20} />,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    trTitle: 'item1Title' as const,
    trDesc: 'item1Desc' as const,
  },
  {
    icon: <MapPin size={20} />,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    trTitle: 'item2Title' as const,
    trDesc: 'item2Desc' as const,
  },
  {
    icon: <Users size={20} />,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/40',
    trTitle: 'item3Title' as const,
    trDesc: 'item3Desc' as const,
  },
];

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── HERO SEARCH BAR ────────────────────────────────────────────────────────
interface SearchBarProps {
  onNavigate: (path: string) => void;
}

const HeroSearchBar: React.FC<SearchBarProps> = ({ onNavigate }) => {
  const { tr } = useLanguage();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ cities: any[]; universities: any[] }>({ cities: [], universities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedLocation, setSelectedLocation } = useUniversity();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.trim().length < 3) { setSuggestions({ cities: [], universities: [] }); return; }
    const t = setTimeout(async () => {
      setIsLoading(true); setShowDropdown(true);
      try {
        const res = await fetch(`/api/cities/search?q=${encodeURIComponent(query)}`);
        const result = await res.json();
        if (result.status === 'success' && result.data) {
          setSuggestions({ cities: result.data.cities || [], universities: result.data.universities || [] });
        } else if (Array.isArray(result)) {
          setSuggestions({ cities: result, universities: [] });
        }
      } catch { /* silently fail */ }
      finally { setIsLoading(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (item: any, type: 'city' | 'university') => {
    const loc: LocationState = { id: item.id || item.city_id || item.uni_id, name: item.name || item.city_name || item.uni_name, type };
    setSelectedLocation(loc);
    setShowDropdown(false);
    setQuery('');
    onNavigate('/university');
  };

  const placeholder = selectedLocation?.name
    ? `Ask Die Ente about ${selectedLocation.name}...`
    : 'Ask Die Ente... (e.g., How to find a WG? What is Pfand?)';

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form
        onSubmit={e => { e.preventDefault(); setShowDropdown(false); onNavigate('/university'); }}
        className="flex w-full items-center
          bg-white/12 dark:bg-white/8 backdrop-blur-xl
          border border-white/25 rounded-2xl overflow-hidden
          shadow-[0_8px_32px_rgba(0,0,0,0.24)]
          focus-within:border-white/50 transition-all duration-200"
      >
        <div className="flex items-center pl-4 text-white/60">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); if (e.target.value.trim().length >= 3) setShowDropdown(true); }}
          onFocus={() => { if (query.trim().length >= 3) setShowDropdown(true); }}
          placeholder={placeholder}
          className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/50 text-[15px] outline-none"
        />
        {isLoading && (
          <div className="flex items-center pr-3 text-white/50">
            <Loader2 size={17} className="animate-spin" />
          </div>
        )}
        <button
          type="submit"
          className="m-2 px-6 py-2.5 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold
            rounded-xl transition-all duration-200 text-[14px] whitespace-nowrap
            hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
        >
          {tr('home', 'searchBtn')}
        </button>
      </form>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-xl
              shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 text-left"
          >
            <div className="max-h-72 overflow-y-auto py-2">
              {suggestions.universities.length > 0 && (
                <div className="mb-1">
                  <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Universities</div>
                  {suggestions.universities.map((uni, i) => (
                    <button
                      key={`uni-${uni.id || i}`}
                      type="button"
                      onClick={() => handleSelect(uni, 'university')}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-950/30
                        text-gray-800 dark:text-gray-100 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">🎓</span>
                      <div>
                        <p className="text-[13px] font-medium">{uni.name || uni.uni_name}</p>
                        {uni.city_name && <p className="text-[11px] text-gray-400">{uni.city_name}, Germany</p>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {suggestions.cities.length > 0 && (
                <div>
                  <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cities</div>
                  {suggestions.cities.map((city, i) => (
                    <button
                      key={`city-${city.id || i}`}
                      type="button"
                      onClick={() => handleSelect(city, 'city')}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-950/30
                        text-gray-800 dark:text-gray-100 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">📍</span>
                      <p className="text-[13px] font-medium">
                        {city.name || city.city_name}{city.state ? `, ${city.state}` : ''}, Germany
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const [activeQuack, setActiveQuack] = useState(0);

  // Auto-rotate Wise Quacks every 5s
  useEffect(() => {
    const timer = setInterval(() => setActiveQuack(q => (q + 1) % WISE_QUACKS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full font-sans">

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full flex items-center justify-center min-h-[92vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden="true"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2463]/75 via-[#0a2463]/60 to-[#0a2463]/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />

        {/* Duck Easter Egg — bottom-right corner */}
        <motion.div
          className="absolute bottom-8 right-8 text-4xl select-none cursor-pointer z-10"
          title="Quack!"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.3, rotate: 15 }}
        >
          🦆
        </motion.div>

        {/* Hero content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full
              bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-[13px] font-medium"
          >
            🦆 <span>{tr('home', 'badgeText')}</span>
          </motion.span>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-3 drop-shadow-xl"
          >
            Notes from{' '}
            <span className="text-[#f97316]">Die Ente</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/80 mb-4 max-w-xl leading-relaxed"
          >
            {tr('home', 'subHeadline')}
          </motion.p>

          {/* Narrative hook */}
          <motion.blockquote
            variants={fadeUp}
            className="text-sm text-white/65 italic max-w-lg mb-10 leading-relaxed border-l-2 border-orange-400/50 pl-4 text-left"
          >
            {tr('home', 'narrative')}
          </motion.blockquote>

          {/* Glassmorphic search bar */}
          <motion.div variants={fadeUp} className="w-full">
            <HeroSearchBar onNavigate={navigate} />
          </motion.div>

          {/* Quick tags */}
          <motion.div variants={stagger} className="flex flex-wrap gap-2.5 mt-7 justify-center">
            {QUICK_TAGS.map(tag => (
              <motion.div key={tag.href} variants={fadeUp}>
                <Link
                  to={tag.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full
                    bg-white/12 hover:bg-white/22 backdrop-blur-sm border border-white/15
                    text-white text-[13px] font-medium transition-all duration-200 hover:scale-105"
                >
                  <span>{tag.emoji}</span>
                  <span>{tr('home', tag.trKey)}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — THE FIRST PADDLE
      ══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#f97316] text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('home', 'sec2Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {tr('home', 'sec2Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {tr('home', 'sec2Desc')}
            </p>
          </motion.div>

          {/* 3-column stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FIRST_PADDLE_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-start p-6 rounded-2xl border border-gray-100
                  dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-gray-900
                  bg-gray-50/50 dark:bg-gray-900/50 transition-shadow duration-200"
              >
                <span className={`flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${item.bg}`}>
                  <span className={item.color}>{item.icon}</span>
                </span>
                <h3 className="text-[15px] font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                  {tr('home', item.trTitle)}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tr('home', item.trDesc)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — WISE QUACKS (rotating tips)
      ══════════════════════════════════════════ */}
      <section className="bg-[#0a2463] dark:bg-[#060f2e] py-16 px-4 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('home', 'sec3Badge')}
            </span>
            <h2 className="text-3xl font-bold text-white">
              {tr('home', 'sec3Title')}
            </h2>
          </motion.div>

          {/* Tip card */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {WISE_QUACKS.map((q, i) =>
                i === activeQuack ? (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={`relative p-7 rounded-2xl border ${q.border} bg-gradient-to-br ${q.color} backdrop-blur-md`}
                  >
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      🦆
                    </motion.div>
                    <p className="text-white text-lg leading-relaxed font-medium mb-4">
                      "{tr('home', q.trTip)}"
                    </p>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${q.tagColor}`}>
                      # {tr('home', q.trTag)}
                    </span>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {WISE_QUACKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuack(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeQuack
                      ? 'w-6 h-2 bg-[#f97316]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Tip ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — TOPIC CARDS
      ══════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#0a2463] dark:text-blue-400 text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('home', 'sec4Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {tr('home', 'sec4Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {tr('home', 'sec4Desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPIC_SECTIONS.map((section) => (
              <motion.div key={section.href} variants={fadeUp}>
                <Link
                  to={section.href}
                  className={`group flex flex-col h-full p-6 rounded-2xl border ${section.border}
                    bg-white dark:bg-gray-800/60 hover:shadow-lg dark:hover:shadow-gray-900/50
                    transition-all duration-200 hover:-translate-y-1 overflow-hidden relative`}
                >
                  {/* Gradient background blob */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Icon chip */}
                  <span
                    className="relative z-10 flex items-center justify-center w-11 h-11 rounded-xl mb-4
                      transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${section.accent}18`, color: section.accent }}
                  >
                    {section.icon}
                  </span>

                  {/* Text */}
                  <h3 className="relative z-10 text-[16px] font-bold text-gray-900 dark:text-white mb-1.5
                    group-hover:text-[#0a2463] dark:group-hover:text-white transition-colors">
                    {tr('home', section.trLabel)}
                  </h3>
                  <p className="relative z-10 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                    {tr('home', section.trTagline)}
                  </p>

                  {/* Explore link */}
                  <div className="relative z-10 flex items-center gap-1.5 mt-5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: section.accent }}>
                    {tr('home', 'explore')}
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — COMMUNITY CTA
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#0a2463] dark:bg-[#060f2e] py-20 px-4 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-screen-sm mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="text-5xl mb-6">🦆</motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            {tr('home', 'sec5Title1')}
            <br />
            <span className="text-[#f97316]">{tr('home', 'sec5Title2')}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/60 mb-8 text-[15px] leading-relaxed max-w-sm mx-auto">
            {tr('home', 'sec5Desc')}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              to="/community/contributor"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-[15px]
                shadow-lg shadow-orange-500/30 transition-all duration-200
                hover:scale-105 active:scale-95"
            >
              <Users size={17} />
              {tr('home', 'sec5Btn')}
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
};

export default HomePage;