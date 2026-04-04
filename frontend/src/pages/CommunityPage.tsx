import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  FileText, ArrowRight, Star, MessageCircle,
  BookOpen, ShoppingBag, Network, BarChart2, PenLine,
  ArrowLeft, ChevronRight, Mail,
} from 'lucide-react';
import Navbar from '../components/Navbar';

import { useLanguage } from '../contexts/LanguageContext';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── ALUMNI NOTES DATA ───────────────────────────────────────────────────────
const ALUMNI_NOTES = [
  {
    city: 'Munich',
    emoji: '🍺',
    snippet:
      "The most important thing I learned about my first winter in Munich wasn't on a brochure. It was about keeping a 'Pfand' stash and knowing which Mensa closes early on Fridays...",
    author: 'VGU Alumni \'22',
    authorAvatar: 'https://i.pravatar.cc/150?u=munich',
    badges: [{ type: 'Golden Feather', icon: '🪶' }, { type: 'Top 10', icon: '🏆' }],
    topic: 'Life Hacks',
    stars: 5,
    color: 'from-blue-600/20 to-indigo-600/10',
    border: 'border-blue-400/30',
    tagColor: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  {
    city: 'Berlin',
    emoji: '🎨',
    snippet:
      "Getting registered (Anmeldung) in Berlin felt like a boss battle. I waited 6 weeks for an appointment. Here's the shortcut no one tells you about German bureaucracy...",
    author: 'VGU Alumni \'23',
    authorAvatar: 'https://i.pravatar.cc/150?u=berlin',
    badges: [{ type: 'Early Bird', icon: '🐦' }, { type: 'Helpful', icon: '💡' }],
    topic: 'Bureaucracy',
    stars: 5,
    color: 'from-orange-600/20 to-amber-600/10',
    border: 'border-amber-400/30',
    tagColor: 'text-amber-400',
    badge: 'bg-[#FFCC00]/20 text-orange-300',
  },
  {
    city: 'Frankfurt',
    emoji: '🏦',
    snippet:
      'Opening a German bank account as a student is tricky without a registered address. I tried 3 banks before finding one that works — no Schufa needed and full English support...',
    author: 'VGU Alumni \'21',
    authorAvatar: 'https://i.pravatar.cc/150?u=frankfurt',
    badges: [{ type: 'Golden Feather', icon: '🪶' }, { type: 'Finance Pro', icon: '💰' }],
    topic: 'Finance',
    stars: 4,
    color: 'from-green-600/20 to-emerald-600/10',
    border: 'border-green-400/30',
    tagColor: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300',
  },
];

// ── FORUM CATEGORIES DATA ───────────────────────────────────────────────────
const FORUM_CATEGORIES = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'The Bureaucracy Maze',
    subtitle: 'Visa · Anmeldung · Health Insurance',
    desc: 'Deciphering the paperwork — one form at a time.',
    color: '#FFCC00',
    gradient: 'from-amber-400/30 to-amber-500/5',
    border: 'border-amber-400/30',
    posts: 248,
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Academic Nest',
    subtitle: 'Exams · Thesis · Prof. Tips',
    desc: 'Passing the German way — structured, punctual, and thorough.',
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-indigo-500/5',
    border: 'border-blue-400/30',
    posts: 184,
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: 'The Marketplace',
    subtitle: 'Furniture · Books · WG Spots',
    desc: "One duck's trash, another duck's treasure.",
    color: '#22c55e',
    gradient: 'from-green-500/20 to-emerald-500/5',
    border: 'border-green-400/30',
    posts: 312,
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'VGU Connection',
    subtitle: 'Alumni Networking · Mentorship',
    desc: 'Direct bridge to those who were here before you.',
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-violet-500/5',
    border: 'border-purple-400/30',
    posts: 97,
  },
];

// ── SURVIVAL STATS ──────────────────────────────────────────────────────────
const SURVIVAL_STATS = [
  { emoji: '🦆', value: '500+', label: 'Active Ducks' },
  { emoji: '📜', value: '1,200+', label: 'Validated Notes' },
  { emoji: '🌉', value: '1', label: 'Bridge: VGU ↔ Germany' },
];

// ── NETWORK GRAPH (SVG duck-node animation) ─────────────────────────────────
const NODE_POSITIONS = [
  { cx: 50, cy: 50 },
  { cx: 20, cy: 78 },
  { cx: 80, cy: 78 },
  { cx: 10, cy: 40 },
  { cx: 90, cy: 40 },
  { cx: 35, cy: 25 },
  { cx: 65, cy: 25 },
  { cx: 50, cy: 90 },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [1, 7], [2, 7], [3, 5], [4, 6],
];

const NetworkGraph: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveNode(n => (n + 1) % NODE_POSITIONS.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-full sm:max-w-[500px] mx-auto box-border overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-full" aria-hidden="true">
        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODE_POSITIONS[a].cx}
            y1={NODE_POSITIONS[a].cy}
            x2={NODE_POSITIONS[b].cx}
            y2={NODE_POSITIONS[b].cy}
            stroke="rgba(249,115,22,0.25)"
            strokeWidth="0.8"
          />
        ))}
        {/* Nodes */}
        {NODE_POSITIONS.map((pos, i) => (
          <g key={i}>
            <circle
              cx={pos.cx}
              cy={pos.cy}
              r={i === activeNode ? 5 : 3.5}
              fill={i === activeNode ? '#FFCC00' : 'rgba(249,115,22,0.5)'}
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Duck emoji as text — tiny */}
            <text
              x={pos.cx}
              y={pos.cy + 0.9}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={i === activeNode ? '5' : '3.5'}
              style={{ userSelect: 'none', transition: 'font-size 0.4s ease' }}
            >
              🦆
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// ── STAR RENDERER ───────────────────────────────────────────────────────────
const StarRating: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < count ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
      />
    ))}
  </div>
);

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const CommunityPage: React.FC = () => {
  const { tr } = useLanguage();
  const [activeNote, setActiveNote] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-rotate alumni notes
  useEffect(() => {
    const t = setInterval(() => setActiveNote(n => (n + 1) % ALUMNI_NOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleNoteSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1220] font-sans max-w-full overflow-x-hidden">
      <Navbar />
      {/* Navbar spacer — compensates for fixed positioning */}
      <div className="h-[59px]" />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO: "Join the Flock"
      ══════════════════════════════════════════ */}
      <section className="relative w-full max-w-full overflow-hidden box-border bg-gradient-to-br from-[#1A2B4C] via-[#0D1F38] to-[#080f1e] min-h-[90vh] flex items-center">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFCC00]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-all border border-white/15 backdrop-blur-sm"
            >
              <ArrowLeft size={15} />
              {tr('community', 'backHome')}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              {/* Badge */}
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/85 text-[13px] font-medium"
              >
                {tr('community', 'heroBadge')}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-xl break-words whitespace-normal max-w-full box-border"
              >
                {tr('community', 'heroTitle1')}{' '}
                <span className="text-[#FFCC00] break-words whitespace-normal box-border">{tr('community', 'heroTitle2')}</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed"
              >
                {tr('community', 'heroDesc')}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link
                  to="#leave-note"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#e6b800]
                    text-white font-semibold text-[15px] shadow-lg shadow-amber-400/30
                    transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <PenLine size={16} />
                  {tr('community', 'postNote')}
                </Link>
                <Link
                  to="#forum"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20
                    text-white font-semibold text-[15px] border border-white/20 backdrop-blur-sm
                    transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={16} />
                  {tr('community', 'browseForum')}
                </Link>
              </motion.div>

              {/* Quick stats */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-10">
                {SURVIVAL_STATS.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-extrabold text-white">{stat.emoji} {stat.value}</p>
                    <p className="text-[12px] text-white/50 mt-0.5">
                      {i === 0 ? tr('community', 'statDucks') : i === 1 ? tr('community', 'statNotes') : tr('community', 'statBridge')}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center gap-4 w-full flex-1 box-border"
            >
              <div className="relative w-full max-w-[500px] mx-auto box-border overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm" />
                <div className="relative p-5 sm:p-8 box-border">
                  <NetworkGraph />
                  <p className="text-center text-white/40 text-[11px] sm:text-[12px] mt-3 font-medium tracking-wide uppercase break-words whitespace-normal max-w-full">
                    {tr('community', 'networkCaption')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — "Footprints from the Flock"
      ══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0B1220] py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#FFCC00] text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('community', 'sec2Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white break-words">
              {tr('community', 'sec2Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {tr('community', 'sec2Desc')}
            </p>
          </motion.div>

          {/* Note carousel */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-8">
            <AnimatePresence mode="wait">
              {ALUMNI_NOTES.map((note, i) =>
                i === activeNote ? (
                  <motion.div
                    key={note.city}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.4 }}
                    className={`relative p-7 rounded-2xl border ${note.border} bg-gradient-to-br ${note.color} bg-gray-900 backdrop-blur-md`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-0.5">
                          {note.emoji} {note.city} — Survival Log
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${note.badge}`}>
                            # {note.topic}
                          </span>
                          <StarRating count={note.stars} />
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-white/80 text-[15px] leading-relaxed italic mb-5 border-l-2 border-amber-400/50 pl-4">
                      "{note.snippet}"
                    </blockquote>

                    {/* Author Box replacing old simple author text */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                      <div className="flex items-center gap-3">
                        <img src={note.authorAvatar} alt={note.author} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                        <div>
                          <p className="text-[14px] font-bold text-white leading-none mb-1.5">{note.author}</p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {note.badges.map(b => (
                              <span key={b.type} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/80 font-semibold border border-white/5" title={b.type}>
                                {b.icon} {b.type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#FFCC00] hover:text-orange-300 transition-colors">
                        {tr('community', 'readFull')}
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {ALUMNI_NOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveNote(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeNote
                      ? 'w-6 h-2 bg-[#FFCC00]'
                      : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400'
                  }`}
                  aria-label={`Note ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* All notes CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/15
              text-gray-700 dark:text-white/70 text-[14px] font-medium hover:border-[#FFCC00] hover:text-[#FFCC00]
              transition-all duration-200 hover:scale-105">
              <FileText size={15} />
              {tr('community', 'browseAll')}
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — "Quack-Talk" Forum (Bento)
      ══════════════════════════════════════════ */}
      <section id="forum" className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('community', 'sec3Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {tr('community', 'sec3Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {tr('community', 'sec3Desc')}
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORUM_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative group p-6 rounded-2xl border ${cat.border} bg-white dark:bg-gray-800/60
                  shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50
                  overflow-hidden cursor-pointer transition-shadow duration-200`}
              >
                {/* Gradient bg on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      {cat.icon}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                      {cat.posts} {tr('common', 'posts')}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-[12px] font-medium mb-2" style={{ color: cat.color }}>
                    {cat.subtitle}
                  </p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: cat.color }}
                  >
                    {tr('community', 'enterDiscussion')}
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — "Aggregated Wisdom" Dashboard
      ══════════════════════════════════════════ */}
      <section className="bg-[#1A2B4C] dark:bg-[#060f2e] py-20 px-4 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute left-0 w-72 h-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 w-72 h-72 translate-x-1/2 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-[12px] font-bold uppercase tracking-widest mb-3">
              {tr('community', 'sec4Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {tr('community', 'sec4Title')}
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              {tr('community', 'sec4Desc')}
            </p>
          </motion.div>

          {/* Stats + feature row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {SURVIVAL_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10
                  hover:bg-white/10 transition-all duration-200 backdrop-blur-sm text-center"
              >
                <span className="text-4xl mb-3">{stat.emoji}</span>
                <p className="text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-[13px] text-white/50">
                  {i === 0 ? tr('community', 'statDucks') : i === 1 ? tr('community', 'statNotes') : tr('community', 'statBridge')}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quality tagline */}
          <motion.div variants={fadeUp} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <BarChart2 size={18} className="text-[#FFCC00]" />
              <span className="text-white/70 text-[13px]">
                Notes are community-scored and validated by Alumni with&nbsp;
                <span className="text-[#FFCC00] font-semibold">Insight Score ⭐</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — CTA: "From Resident to Pathfinder"
      ══════════════════════════════════════════ */}
      <section id="leave-note" className="bg-gray-50 dark:bg-[#0B1220] py-24 px-4 relative overflow-hidden">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          {/* Bento-style Contributor Card */}
          <motion.div
            variants={fadeUp}
            className="relative p-10 sm:p-14 rounded-[2rem] border border-amber-400/30 bg-gradient-to-br from-amber-400/30 via-amber-400/30 to-transparent dark:from-amber-400/30 dark:via-amber-400/30 dark:to-transparent bg-white dark:bg-gray-900 shadow-xl dark:shadow-2xl overflow-hidden group flex flex-col md:flex-row items-center md:items-start justify-between gap-10"
          >
            {/* Ghost duck icon in background */}
            <div className="absolute -bottom-16 -right-10 text-[250px] opacity-[0.03] select-none text-[#FFCC00] group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none">
              🦆
            </div>

            <div className="relative z-10 flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#FFCC00]/20 text-[#FFCC00] text-[12px] font-bold uppercase tracking-widest border border-amber-400/20">
                <PenLine size={13} /> The Pathfinder Initiative
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                From Resident to <span className="text-[#FFCC00]">Pathfinder.</span>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-lg mb-8 max-w-xl leading-relaxed">
                Your struggle yesterday is someone else's guide today. Share your notes and get recognized in the Wall of Pathfinders.
              </p>

              <Link
                to="/community/contributor"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                  bg-[#FFCC00] hover:bg-[#e6b800] text-white font-bold text-[16px]
                  shadow-lg shadow-amber-400/30 transition-all duration-300
                  hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Start Contributing <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — Newsletter Mini-CTA
      ══════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 py-14 px-4 border-t border-gray-100 dark:border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-sm mx-auto text-center"
        >
          <Mail size={28} className="mx-auto mb-4 text-[#FFCC00]" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {tr('community', 'sec6Title')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {tr('community', 'sec6Desc')}
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold"
              >
                {tr('community', 'subscribed')}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleNoteSubscribe}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/40 transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#e6b800] text-white
                    font-semibold text-sm whitespace-nowrap transition-all duration-200
                    hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/30"
                >
                  {tr('community', 'subscribe')}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer component moved to App.tsx */}
    </div>
  );
};

export default CommunityPage;
