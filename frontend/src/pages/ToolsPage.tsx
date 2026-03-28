import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Globe, Languages, CreditCard, FileText, BookOpen,
  Map, Shield, Smartphone, Star, ExternalLink, Search,
  Zap, Heart, CheckCircle, ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Types ─────────────────────────────────────────────────────────────────

interface Tool {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  features: string[];
  url: string;
  free: boolean;
  studentDiscount?: boolean;
  rating: number;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const categories = ['All', 'Language', 'Banking', 'Documents', 'Study', 'Navigation', 'Health'];

const tools: Tool[] = [
  {
    name: 'DeepL Translator',
    category: 'Language',
    icon: <Languages className="w-7 h-7" />,
    color: 'from-blue-600 to-indigo-600',
    bg: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    description: 'The gold standard for German ↔ English translation. Far superior to Google Translate for academic and official German texts.',
    features: ['Documents (PDF, Word)', 'Browser extension', 'Glossary feature', 'Formal/informal tone'],
    url: 'https://www.deepl.com',
    free: true,
    rating: 5,
  },
  {
    name: 'Duolingo',
    category: 'Language',
    icon: <BookOpen className="w-7 h-7" />,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    description: 'Daily German practice through gamification. Ideal for building vocabulary and basic grammar before arrival.',
    features: ['Daily streaks', 'Listening exercises', 'Offline mode', 'A1–B2 coverage'],
    url: 'https://www.duolingo.com',
    free: true,
    rating: 4,
  },
  {
    name: 'dict.cc',
    category: 'Language',
    icon: <Globe className="w-7 h-7" />,
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    description: 'Community-driven German dictionary with example sentences, audio pronunciation, and conjugation tables.',
    features: ['Offline app', 'Audio pronunciation', 'Example sentences', 'Conjugation tables'],
    url: 'https://www.dict.cc',
    free: true,
    rating: 4,
  },
  {
    name: 'N26',
    category: 'Banking',
    icon: <CreditCard className="w-7 h-7" />,
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    badgeBg: 'bg-gray-200',
    badgeText: 'text-gray-700',
    description: 'Digital bank with a free account fully operated from your phone. No paperwork — open an account in 8 minutes.',
    features: ['Free IBAN in minutes', 'Free ATM withdrawals (EU)', 'Real-time notifications', 'Instant transfers'],
    url: 'https://n26.com',
    free: true,
    rating: 5,
  },
  {
    name: 'DKB Bank',
    category: 'Banking',
    icon: <Shield className="w-7 h-7" />,
    color: 'from-blue-800 to-blue-600',
    bg: 'bg-blue-50',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    description: 'Deutsche Kreditbank — popular among students for its free Visa card and free worldwide ATM withdrawals.',
    features: ['Free Visa card', 'Free global ATM', 'Requires German address', 'Online banking only'],
    url: 'https://www.dkb.de',
    free: true,
    studentDiscount: true,
    rating: 4,
  },
  {
    name: 'DAAD Portal',
    category: 'Documents',
    icon: <FileText className="w-7 h-7" />,
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-700',
    description: "Germany's official academic exchange portal. Find scholarships, program listings, and deadlines all in one place.",
    features: ['Scholarship database', 'University search', 'Visa guidance', 'Application tracker'],
    url: 'https://www.daad.de',
    free: true,
    rating: 5,
  },
  {
    name: 'Uni-Assist',
    category: 'Documents',
    icon: <CheckCircle className="w-7 h-7" />,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    description: 'Centralized portal to submit and verify academic documents for German university applications.',
    features: ['Document verification', '170+ partner universities', 'Online status tracking', 'VPD document issuance'],
    url: 'https://www.uni-assist.de',
    free: false,
    rating: 3,
  },
  {
    name: 'Anki',
    category: 'Study',
    icon: <Zap className="w-7 h-7" />,
    color: 'from-purple-600 to-indigo-600',
    bg: 'bg-purple-50',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    description: 'Spaced repetition flashcard system. The most efficient way to memorize vocabulary, formulas, and concepts.',
    features: ['Shared decks library', 'Spaced repetition', 'Cross-device sync', 'Image & audio cards'],
    url: 'https://apps.ankiweb.net',
    free: true,
    rating: 5,
  },
  {
    name: 'Notion',
    category: 'Study',
    icon: <BookOpen className="w-7 h-7" />,
    color: 'from-slate-600 to-slate-800',
    bg: 'bg-slate-50',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-700',
    description: 'All-in-one workspace for notes, task management, and project organization. Free for students with .edu email.',
    features: ['Free student plan', 'AI writing assistant', 'Team collaboration', 'Templates library'],
    url: 'https://www.notion.so',
    free: true,
    studentDiscount: true,
    rating: 5,
  },
  {
    name: 'Citymapper',
    category: 'Navigation',
    icon: <Map className="w-7 h-7" />,
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
    description: 'The smartest transit app for navigating German cities. Shows real-time delays, platform changes, and walking routes.',
    features: ['Real-time delays', 'Offline maps', 'Bike & scooter options', 'Frankfurt coverage'],
    url: 'https://citymapper.com',
    free: true,
    rating: 4,
  },
  {
    name: 'RMV App',
    category: 'Navigation',
    icon: <Smartphone className="w-7 h-7" />,
    color: 'from-red-600 to-rose-600',
    bg: 'bg-red-50',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    description: 'Official app for the Rhein-Main transport network. Buy tickets, check timetables, and save favorites.',
    features: ['Official ticket purchase', 'Live timetables', 'Semester ticket info', 'Station finder'],
    url: 'https://www.rmv.de',
    free: true,
    rating: 4,
  },
  {
    name: 'TK Health App',
    category: 'Health',
    icon: <Heart className="w-7 h-7" />,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    description: 'Techniker Krankenkasse app — manage your statutory health insurance, find doctors, and submit claims digitally.',
    features: ['Digital health card', 'Doctor search', 'Claim submission', 'Sick note upload'],
    url: 'https://www.tk.de',
    free: true,
    rating: 4,
  },
];

const stats = [
  { label: 'Curated Tools', value: `${tools.length}`, icon: <Star className="w-5 h-5" /> },
  { label: 'Free to Use', value: `${tools.filter(t => t.free).length}`, icon: <CheckCircle className="w-5 h-5" /> },
  { label: 'Student Deals', value: `${tools.filter(t => t.studentDiscount).length}`, icon: <Heart className="w-5 h-5" /> },
  { label: 'Categories', value: `${categories.length - 1}`, icon: <Globe className="w-5 h-5" /> },
];

const proTips = [
  {
    icon: '🎓',
    tip: 'Student Email Perks',
    desc: 'Sign up with your university .de email to unlock free premium tiers on Notion, GitHub Pro, JetBrains, and more.',
  },
  {
    icon: '🌐',
    tip: 'VPN for Streaming',
    desc: 'A VPN (e.g., Mullvad) lets you access your home country\'s streaming libraries. Mullvad is just €5/month.',
  },
  {
    icon: '📱',
    tip: 'WhatsApp Groups',
    desc: 'Join your university\'s unofficial WhatsApp / Telegram student communities — they share tips, rides, and sold items.',
  },
  {
    icon: '☁️',
    tip: 'Cloud Storage',
    desc: 'VGU students often get Microsoft 365 for free via the university, including 1 TB OneDrive. Check your student portal.',
  },
];

// ─── Star Rating ────────────────────────────────────────────────────────────

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ))}
  </div>
);

// ─── Component ──────────────────────────────────────────────────────────────

const ToolsPage: React.FC = () => {
  const { tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = tools.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchQ = query === '' || t.name.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '72vh' }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80)',
          }}
          aria-hidden="true"
        />
        {/* Multi-stop gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.88) 45%, rgba(10,22,40,0.55) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Back button — top left */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {tr('tools', 'backHome')}
          </Link>
        </div>

        {/* Main content — two-column split */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center" style={{ minHeight: '72vh' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-28 lg:py-0">

            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-400/25 backdrop-blur-sm">
                {tr('tools', 'badge')}
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6">
                <span className="text-white">{tr('tools', 'title1')}</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {tr('tools', 'title2')}
                </span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-8">
                {tr('tools', 'desc')}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#tools-grid"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                >
                  {tr('tools', 'browseBtn')}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/80 bg-white/10 border border-white/15 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
                >
                  {tr('tools', 'shareBtn')}
                </Link>
              </div>
            </motion.div>

            {/* ── Right: Bento Stat Cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-md flex flex-col gap-3"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30 blur-2xl"
                    style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                  />
                  <div className="text-blue-400 relative z-10">{stat.icon}</div>
                  <div>
                    <div className="text-3xl font-black text-white leading-none">{stat.value}</div>
                    <div className="text-sm text-white/55 mt-1 font-medium">
                      {i === 0 ? tr('tools', 'statTools') : i === 1 ? tr('tools', 'statFree') : i === 2 ? tr('tools', 'statDeals') : tr('tools', 'statCats')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: '64px' }}>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" className="fill-gray-50 dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* ── Filter & Search Bar ─────────────────────────────────────────── */}
      <section id="tools-grid" className="py-8 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 sticky top-[56px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={tr('tools', 'searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat === 'All' ? tr('tools', 'filterAll') : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium">{tr('tools', 'noResults')}</p>
              <p className="text-sm mt-1">{tr('tools', 'clearFilter')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.45 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                >
                  {/* Card Header */}
                  <div className={`relative h-28 bg-gradient-to-br ${tool.color} flex items-center justify-between px-6`}>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white">
                      {tool.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tool.badgeBg} ${tool.badgeText}`}>
                        {tool.category}
                      </span>
                      {tool.free && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Free
                        </span>
                      )}
                      {tool.studentDiscount && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          Student Discount
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                      <StarRating rating={tool.rating} />
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{tool.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                      {tool.features.map((f) => (
                        <span
                          key={f}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${tool.bg} text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${tool.color} text-white hover:opacity-90 transition-opacity group-hover:shadow-md`}
                    >
                      {tr('tools', 'openTool')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Pro Tips ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0a1628] to-[#0d2d5e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-500/30 text-blue-300 text-sm font-semibold border border-blue-400/30">
              Insider Knowledge
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {tr('tools', 'proTipsTitle')}
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {tr('tools', 'proTipsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proTips.map((item, idx) => (
              <motion.div
                key={item.tip}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.tip}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Submit a Tool CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
            Community Driven
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {tr('tools', 'ctaTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {tr('tools', 'ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200"
            >
              Share with Community
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolsPage;
