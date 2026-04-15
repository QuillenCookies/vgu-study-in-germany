import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2,
  UtensilsCrossed, Ticket, ArrowRight, Users, MapPin, Compass,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUniversity } from '../contexts/UniversityContext';
import { HeroSearchBar } from '../components/pages/home/sections/HeroSearchBar';
import type { LocationState } from '../types';

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const AMBER = '#FFCC00';
const AMBER_DIM = '#e6b800';

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const HERO_BG =
  'https://images.unsplash.com/photo-1774112168776-1e1f4e2797e5?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const WISE_QUACKS = [
  {
    id: 0,
    trTip: 'tip0' as const,
    trTag: 'tip0tag' as const,
    color: 'from-[#1A2B4C]/30 to-[#1A2B4C]/10',
    border: 'border-[#FFCC00]/20',
    tagColor: 'text-[#FFCC00]',
  },
  {
    id: 1,
    trTip: 'tip1' as const,
    trTag: 'tip1tag' as const,
    color: 'from-[#1A2B4C]/25 to-[#0D1F38]/15',
    border: 'border-[#FFCC00]/15',
    tagColor: 'text-[#FFCC00]',
  },
  {
    id: 2,
    trTip: 'tip2' as const,
    trTag: 'tip2tag' as const,
    color: 'from-[#1A2B4C]/20 to-[#132038]/10',
    border: 'border-[#FFCC00]/25',
    tagColor: 'text-[#FFCC00]',
  },
];

const QUICK_TAGS = [
  { emoji: '🏫', trKey: 'tagEducation' as const, href: '/university' },
  { emoji: '🚲', trKey: 'tagTransport' as const, href: '/bahn' },
  { emoji: '🏠', trKey: 'tagHousing' as const, href: '/housing' },
  { emoji: '🥨', trKey: 'tagFood' as const, href: '/food' },
  { emoji: '🎉', trKey: 'tagEntertainment' as const, href: '/entertainment' },
];

// All Topic Sections standardized to Midnight Blue + Amber Gold
const TOPIC_SECTIONS = [
  {
    icon: <GraduationCap size={22} strokeWidth={1.75} />,
    trLabel: 'tagEducation' as const,
    trTagline: 'topicEduTagline' as const,
    href: '/university',
  },
  {
    icon: <TrainFront size={22} strokeWidth={1.75} />,
    trLabel: 'tagTransport' as const,
    trTagline: 'topicTransTagline' as const,
    href: '/bahn',
  },
  {
    icon: <Building2 size={22} strokeWidth={1.75} />,
    trLabel: 'tagHousing' as const,
    trTagline: 'topicHouseTagline' as const,
    href: '/housing',
  },
  {
    icon: <UtensilsCrossed size={22} strokeWidth={1.75} />,
    trLabel: 'tagFood' as const,
    trTagline: 'topicFoodTagline' as const,
    href: '/food',
  },
  {
    icon: <Ticket size={22} strokeWidth={1.75} />,
    trLabel: 'tagEntertainment' as const,
    trTagline: 'topicEntTagline' as const,
    href: '/entertainment',
  },
];

const PATHFINDERS = [
  {
    name: "Alex Tran",
    role: "Visa Pathfinder",
    avatar: "https://i.pravatar.cc/150?img=11",
    hacks: 24,
    badge: "Legendary",
    gradient: "from-[#1A2B4C]/30 to-[#1A2B4C]/10",
    border: "border-[#FFCC00]/20",
    icon: "🛂",
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Sarah N.",
    role: "Housing Guru",
    avatar: "https://i.pravatar.cc/150?img=5",
    hacks: 18,
    badge: "Expert",
    gradient: "from-[#1A2B4C]/25 to-[#0D1F38]/15",
    border: "border-[#FFCC00]/15",
    icon: "🏠",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Minh Le",
    role: "Bargain Hunter",
    avatar: "https://i.pravatar.cc/150?img=8",
    hacks: 15,
    badge: "Pro",
    gradient: "from-[#1A2B4C]/20 to-[#132038]/10",
    border: "border-[#FFCC00]/25",
    icon: "💰",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Duc Pham",
    role: "Transport Pro",
    avatar: "https://i.pravatar.cc/150?img=12",
    hacks: 12,
    badge: "Veteran",
    gradient: "from-[#1A2B4C]/30 to-[#0D1F38]/20",
    border: "border-[#FFCC00]/20",
    icon: "🚆",
    colSpan: "md:col-span-1 md:row-span-1",
  }
];

const FIRST_PADDLE_ITEMS = [
  {
    icon: <Compass size={20} strokeWidth={1.75} />,
    color: MIDNIGHT,
    bg: 'rgba(26,43,76,0.08)',
    bgHover: 'rgba(255,204,0,0.12)',
    trTitle: 'item1Title' as const,
    trDesc: 'item1Desc' as const,
  },
  {
    icon: <MapPin size={20} strokeWidth={1.75} />,
    color: MIDNIGHT,
    bg: 'rgba(26,43,76,0.08)',
    bgHover: 'rgba(255,204,0,0.12)',
    trTitle: 'item2Title' as const,
    trDesc: 'item2Desc' as const,
  },
  {
    icon: <Users size={20} strokeWidth={1.75} />,
    color: MIDNIGHT,
    bg: 'rgba(26,43,76,0.08)',
    bgHover: 'rgba(255,204,0,0.12)',
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
      <section className="relative w-full flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden="true"
        />
        {/* Midnight Blue overlays */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, ${MIDNIGHT}CC, ${MIDNIGHT}99, ${MIDNIGHT}CC)`
        }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />

        {/* Horizontal dark-blue gradient (left edge) */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to right, #0D1226 0%, #0D1226CC 8%, transparent 22%)',
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center px-4 py-20 w-full max-w-4xl mx-auto"
        >
          {/* HeroSearchBar: stamp title + duck GIF + search bar */}
          <HeroSearchBar onNavigate={navigate} />

          {/* CTA: Join the Migration */}
          <motion.div variants={fadeUp} className="mt-5 mb-1">
            <Link to="/community/contributor" className="group flex items-center justify-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors cursor-pointer">
              <span className="font-medium text-white/90">Have a survival hack?</span>
              <span className="font-semibold group-hover:underline underline-offset-4" style={{ color: AMBER, textDecorationColor: `${AMBER}80` }}>Join the Migration</span>
              <ArrowRight size={14} style={{ color: AMBER }} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Quick tags */}
          <motion.div variants={stagger} className="flex flex-wrap gap-2.5 mt-6 justify-center">
            {QUICK_TAGS.map(tag => (
              <motion.div key={tag.href} variants={fadeUp}>
                <Link
                  to={tag.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                    bg-white/12 hover:bg-white/22 backdrop-blur-sm border border-white/15
                    text-white text-[13px] font-medium transition-all duration-300 hover:scale-105
                    hover:border-white/30"
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
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${AMBER}80` }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — WALL OF PATHFINDERS
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: `linear-gradient(to bottom, ${MIDNIGHT}, #0D1F38)` }}>
        {/* Subtle glow blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: `${MIDNIGHT}30` }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: `${AMBER}08` }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${AMBER}20`, color: AMBER, borderColor: `${AMBER}30` }}>
              Community Legends
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Wall of Pathfinders
            </h2>
            <p className="mt-3 text-white/60 max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
              Meet the top contributors who mapped the unknown for you. Share your survival hacks and join the ranks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
            {PATHFINDERS.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative group p-6 rounded-lg border bg-white/5 backdrop-blur-xl
                  hover:bg-white/8 transition-all duration-300 overflow-hidden flex flex-col justify-between
                  ${p.colSpan}`}
                style={{ borderColor: `${AMBER}25` }}
              >
                {/* Gradient bg hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full border-2 object-cover"
                      style={{ borderColor: `${AMBER}40` }} />
                    <div>
                      <h3 className="text-lg font-semibold text-white leading-tight">{p.name}</h3>
                      <p className="text-sm text-white/60">{p.role}</p>
                    </div>
                  </div>
                  <div className="text-3xl opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {p.icon}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-start mt-auto">
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <div className="text-3xl font-bold text-white">{p.hacks}</div>
                      <div className="text-[12px] font-medium text-white/50 uppercase tracking-wider">Hacks Shared</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold border"
                      style={{ background: `${AMBER}15`, color: AMBER, borderColor: `${AMBER}30` }}>
                      {p.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Join the Wall Card */}
            <motion.div variants={fadeUp} className="md:col-span-1 md:row-span-1 h-full">
              <Link
                to="/community/contributor"
                className="relative group h-full p-6 text-center flex flex-col items-center justify-center cursor-pointer
                  rounded-lg border-2 border-dashed bg-white/5 backdrop-blur-xl
                  transition-all duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${AMBER}60`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <div className="w-14 h-14 rounded-full border border-dashed border-white/40 flex items-center justify-center mb-4
                  group-hover:scale-110 transition-all duration-300 text-white/50 group-hover:text-white"
                  style={{}}
                  onMouseEnter={e => { const t = e.currentTarget as HTMLDivElement; t.style.backgroundColor = AMBER; t.style.borderColor = AMBER; t.style.color = MIDNIGHT; }}
                  onMouseLeave={e => { const t = e.currentTarget as HTMLDivElement; t.style.backgroundColor = ''; t.style.borderColor = ''; t.style.color = ''; }}
                >
                  <span className="text-3xl font-light leading-none">+</span>
                </div>
                <p className="text-[13px] font-medium text-white/60 group-hover:text-white/90 leading-relaxed px-1"
                  style={{ lineHeight: 1.6 }}>
                  Your face here? Share your first note to join the elite flock of Pathfinders.
                </p>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — THE FIRST PADDLE
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
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${AMBER}15`, color: MIDNIGHT, borderColor: `${AMBER}40` }}>
              {tr('home', 'sec2Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
              {tr('home', 'sec2Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
              {tr('home', 'sec2Desc')}
            </p>
          </motion.div>

          {/* 3-column stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FIRST_PADDLE_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group flex flex-col items-start p-6 rounded-lg border border-gray-100
                  dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-gray-900
                  bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-300"
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-lg mb-4 transition-all duration-300"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  {item.icon}
                </span>
                <h3 className="text-[15px] font-semibold dark:text-gray-100 mb-1.5" style={{ color: MIDNIGHT }}>
                  {tr('home', item.trTitle)}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>
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
      <section className="py-16 px-4 overflow-hidden" style={{ backgroundColor: MIDNIGHT }}>
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
            <h2 className="text-3xl font-semibold text-white">
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
                    className={`relative p-7 rounded-lg border ${q.border} bg-gradient-to-br ${q.color} backdrop-blur-md`}
                  >
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      🦆
                    </motion.div>
                    <p className="text-white text-lg leading-relaxed font-medium mb-4" style={{ lineHeight: 1.6 }}>
                      "{tr('home', q.trTip)}"
                    </p>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${q.tagColor}`}>
                      # {tr('home', q.trTag)}
                    </span>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {/* Dot indicators — Amber Gold */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {WISE_QUACKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuack(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeQuack ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === activeQuack ? AMBER : 'rgba(255,255,255,0.3)',
                  }}
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
      <section className="py-20 px-4" style={{ backgroundColor: '#F3F4F6' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-screen-lg mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${AMBER}15`, color: MIDNIGHT, borderColor: `${AMBER}40` }}>
              {tr('home', 'sec4Badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
              {tr('home', 'sec4Title')}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
              {tr('home', 'sec4Desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPIC_SECTIONS.map((section) => (
              <motion.div key={section.href} variants={fadeUp}>
                <Link
                  to={section.href}
                  className="group flex flex-col h-full p-6 rounded-lg border border-gray-200
                    bg-white dark:bg-gray-800/60 dark:border-gray-700
                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                >
                  {/* Amber Gold hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${AMBER}08 0%, transparent 70%)` }}
                  />
                  {/* Left accent bar — Amber Gold on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: AMBER }}
                  />

                  {/* Icon chip — Midnight Blue */}
                  <span
                    className="relative z-10 flex items-center justify-center w-11 h-11 rounded-lg mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${MIDNIGHT}10`, color: MIDNIGHT }}
                  >
                    {section.icon}
                  </span>

                  {/* Text */}
                  <h3
                    className="relative z-10 text-[16px] font-semibold mb-1.5 dark:text-white transition-colors duration-300"
                    style={{ color: MIDNIGHT }}
                  >
                    {tr('home', section.trLabel)}
                  </h3>
                  <p className="relative z-10 text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1" style={{ lineHeight: 1.6 }}>
                    {tr('home', section.trTagline)}
                  </p>

                  {/* Explore link — Amber Gold */}
                  <div
                    className="relative z-10 flex items-center gap-1.5 mt-5 text-[13px] font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: MIDNIGHT }}
                  >
                    <span className="group-hover:text-[#b89300] transition-colors duration-300">
                      {tr('home', 'explore')}
                    </span>
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
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: MIDNIGHT }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${MIDNIGHT}40` }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${AMBER}08` }} />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-screen-sm mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="text-5xl mb-6">🦆</motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-semibold text-white mb-3 leading-tight">
            {tr('home', 'sec5Title1')}
            <br />
            <span style={{ color: AMBER }}>{tr('home', 'sec5Title2')}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/60 mb-8 text-[15px] max-w-sm mx-auto" style={{ lineHeight: 1.6 }}>
            {tr('home', 'sec5Desc')}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              to="/community/contributor"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-[15px]
                transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: AMBER,
                color: MIDNIGHT,
                boxShadow: `0 4px 20px ${AMBER}35`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = AMBER_DIM; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = AMBER; }}
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