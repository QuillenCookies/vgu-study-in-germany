import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2,
  UtensilsCrossed, Ticket, ArrowRight, Users, MapPin, Compass,
  Search, Loader2, Heart, Scale, BookOpen, Briefcase, Wallet,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUniversity } from '../contexts/UniversityContext';
import { HeroSearchBar } from '../components/pages/home/sections/HeroSearchBar';
import type { LocationState } from '../types';

// ── DESIGN TOKENS (Bauhaus / Scandinavian EU Light) ───────────────────────
const CREAM = '#F9F9F7';  // main bg — warm off-white, never pure white
const WHITE = '#FFFFFF';  // inner frosted fill
const CHARCOAL = '#2C3340';  // soft charcoal headings
const SLATE_BODY = '#546073';  // muted slate body copy
const SLATE_MUTED = '#94A3B8';  // below-the-line text
const GOLD = '#FACC15';  // Duck Yellow — CTA accent
const GOLD_DIM = '#CA8A04';  // hover / subdued gold

// Frosted glass system — reused across all floating tiles
const FROST_BG = 'rgba(255,255,255,0.74)';
const FROST_BORDER = `rgba(250,204,21,0.28)`;
const FROST_SHADOW = '0 20px 50px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)';
const FROST_BLUR = 'blur(24px)';  // backdrop-blur-xl consistent depth
const FROST_STROKE = '1.5px';       // consistent border weight

// Hero-section legacy tokens (dark overlay)
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


// ── DIFFICULTY BADGES — light pastel ──────────────────────────────────────
const DIFFICULTY = {
  Schwer: { bg: '#FEE2E2', color: '#DC2626', border: '#FECACA', label: 'Schwer' },
  Mittel: { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A', label: 'Mittel' },
  Einfach: { bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0', label: 'Einfach' },
} as const;
type DiffKey = keyof typeof DIFFICULTY;

// ── STAGE PASTEL ACCENTS ───────────────────────────────────────────────────
const STAGE_ACCENTS = [
  { iconBg: '#DCFCE7', iconColor: '#059669', leftBar: '#34D399', cardHover: 'rgba(220,252,231,0.35)' },
  { iconBg: '#FEF9C3', iconColor: '#CA8A04', leftBar: '#FBBF24', cardHover: 'rgba(254,249,195,0.35)' },
  { iconBg: '#DBEAFE', iconColor: '#2563EB', leftBar: '#60A5FA', cardHover: 'rgba(219,234,254,0.35)' },
  { iconBg: '#EDE9FE', iconColor: '#7C3AED', leftBar: '#A78BFA', cardHover: 'rgba(237,233,254,0.35)' },
];

// ── THE MAP: 4 BENTO STAGES ───────────────────────────────────────────────
const MAP_STAGES: {
  roman: string; emoji: string; trStageLabel: any;
  difficulty: DiffKey; colClass: string;
  items: { icon: React.ReactNode; trName: any; trDesc: any; href: string }[];
}[] = [
    {
      roman: 'I', emoji: '🪶', trStageLabel: 'stageI',
      difficulty: 'Schwer', colClass: 'md:col-span-2',
      items: [
        { icon: <GraduationCap size={15} strokeWidth={1.75} />, trName: 'mapEdu', trDesc: 'mapEduDesc', href: '/university' },
        { icon: <Scale size={15} strokeWidth={1.75} />, trName: 'mapLegal', trDesc: 'mapLegalDesc', href: '/explore/legal' },
        { icon: <BookOpen size={15} strokeWidth={1.75} />, trName: 'mapLib', trDesc: 'mapLibDesc', href: '/explore/library' },
      ],
    },
    {
      roman: 'II', emoji: '🏡', trStageLabel: 'stageII',
      difficulty: 'Mittel', colClass: 'md:col-span-1',
      items: [
        { icon: <Building2 size={15} strokeWidth={1.75} />, trName: 'mapHousing', trDesc: 'mapHousingDesc', href: '/housing' },
        { icon: <Heart size={15} strokeWidth={1.75} />, trName: 'mapHealth', trDesc: 'mapHealthDesc', href: '/explore/health' },
      ],
    },
    {
      roman: 'III', emoji: '🌊', trStageLabel: 'stageIII',
      difficulty: 'Einfach', colClass: 'md:col-span-1',
      items: [
        { icon: <UtensilsCrossed size={15} strokeWidth={1.75} />, trName: 'mapFood', trDesc: 'mapFoodDesc', href: '/food' },
        { icon: <TrainFront size={15} strokeWidth={1.75} />, trName: 'mapTrans', trDesc: 'mapTransDesc', href: '/bahn' },
        { icon: <Ticket size={15} strokeWidth={1.75} />, trName: 'mapEnt', trDesc: 'mapEntDesc', href: '/entertainment' },
      ],
    },
    {
      roman: 'IV', emoji: '🚀', trStageLabel: 'stageIV',
      difficulty: 'Mittel', colClass: 'md:col-span-2',
      items: [
        { icon: <Briefcase size={15} strokeWidth={1.75} />, trName: 'mapCareer', trDesc: 'mapCareerDesc', href: '/explore/career' },
        { icon: <Wallet size={15} strokeWidth={1.75} />, trName: 'mapSalary', trDesc: 'mapSalaryDesc', href: '/explore/salary' },
      ],
    },
  ];

// ── ALPHA DUCKS ───────────────────────────────────────────────────────────
const ALPHA_DUCKS = [
  { emoji: '🛂', name: 'Trọng Quý', trBadge: 'duckBadge0' as const, trTitle: 'duckTitle0' as const, survivalRate: 97, winters: 4, trQuote: 'duckQuote0' as const },
  { emoji: '💻', name: 'Tech Navigator', trBadge: 'duckBadge1' as const, trTitle: 'duckTitle1' as const, survivalRate: 88, winters: 3, trQuote: 'duckQuote1' as const },
  { emoji: '🎨', name: 'Culture Explorer', trBadge: 'duckBadge2' as const, trTitle: 'duckTitle2' as const, survivalRate: 94, winters: 2, trQuote: 'duckQuote2' as const },
];

// ── BULLETIN BOARD ────────────────────────────────────────────────────────
const BULLETIN_CARDS = [
  { type: 'note' as const, tag: '[QUACK-ALERT]', tagColor: '#16A34A', germanWord: 'Ruhetag', trContent: 'quack0' as const },
  { type: 'sticky' as const, tag: '#MoneyBack', bg: '#FFFDE7', germanWord: 'Pfand', trContent: 'quack1' as const, rotate: '-2deg' },
  { type: 'sticky' as const, tag: '#FreeTravel', bg: '#EFF6FF', germanWord: 'Semesterticket', trContent: 'quack2' as const, rotate: '1.5deg' },
  { type: 'note' as const, tag: '[SURVIVAL-TIP]', tagColor: '#D97706', germanWord: 'Anmeldung', trContent: 'quack3' as const },
  { type: 'sticky' as const, tag: '#GreenLiving', bg: '#F0FDF4', germanWord: 'Mülltrennung', trContent: 'quack4' as const, rotate: '-1deg' },
  { type: 'sticky' as const, tag: '#TravelHack', bg: '#FFF1F2', germanWord: 'Bahncard', trContent: 'quack5' as const, rotate: '2deg' },
];

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ── GOLD DUCK SVG (wireframe, light mode) ────────────────────────────────
const DuckSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} style={style} aria-hidden="true">
    <ellipse cx="88" cy="90" rx="52" ry="28" stroke={GOLD} strokeWidth="1.5" />
    <circle cx="130" cy="52" r="22" stroke={GOLD} strokeWidth="1.5" />
    <path d="M148 47 L172 44 L172 56 L148 52 Z" stroke={GOLD} strokeWidth="1.5" />
    <circle cx="138" cy="46" r="3.5" fill={GOLD} />
    <path d="M116 68 C110 78 110 84 120 90" stroke={GOLD} strokeWidth="1.5" />
    <path d="M52 86 C75 70 100 72 116 80" stroke={GOLD} strokeWidth="1" strokeDasharray="4 3" opacity="0.55" />
    <path d="M38 76 C26 60 28 48 38 42" stroke={GOLD} strokeWidth="1.5" />
    <path d="M72 118 L63 130 M72 118 L77 130 M72 118 L72 130" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <path d="M96 120 L87 132 M96 120 L101 132" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <path d="M14 114 Q50 108 88 114 Q126 120 186 114" stroke={GOLD} strokeWidth="0.6" opacity="0.5" />
    <path d="M22 120 Q60 116 100 120 Q140 124 180 120" stroke={GOLD} strokeWidth="0.6" opacity="0.25" />
  </svg>
);

// ── GERMAN FLAG DUCK SVG v2 (ink-style, hand-drawn, warm flag palette) ───
const GermanFlagDuckSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 220 165" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} style={style} aria-hidden="true">
    <defs>
      {/* Warm German flag: ink-black → warm red → orange → gold */}
      <linearGradient id="inkFlag2" x1="0" y1="0" x2="0" y2="165" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1A1914" />
        <stop offset="34%" stopColor="#1A1914" />
        <stop offset="34%" stopColor="#C42B1A" />
        <stop offset="63%" stopColor="#C42B1A" />
        <stop offset="76%" stopColor="#D86210" />
        <stop offset="100%" stopColor="#E8A810" />
      </linearGradient>
    </defs>

    {/* ── BODY — organic ink path (not perfect ellipse) ── */}
    <path d="M98 71 C130 70 155 85 154 104 C153 122 129 137 96 136 C64 135 39 122 40 104 C41 87 65 72 98 71 Z"
      stroke="url(#inkFlag2)" strokeWidth="2.2" strokeLinejoin="round" />
    {/* Inner contour shadow for depth */}
    <path d="M98 76 C128 75 150 88 149 104 C148 119 126 131 97 130 C68 129 45 117 46 104 C47 91 68 77 98 76 Z"
      stroke="url(#inkFlag2)" strokeWidth="0.5" opacity="0.2" />

    {/* ── HEAD — organic ink path ── */}
    <path d="M144 36 C158 35 168 46 167 60 C166 74 155 84 142 84 C129 84 118 75 118 61 C118 47 129 36 144 36 Z"
      stroke="url(#inkFlag2)" strokeWidth="2.2" strokeLinejoin="round" />

    {/* ── BEAK — angular filled shape, yellow-orange / red border ── */}
    <path d="M163 54 L192 50 L192 65 L163 60 Z"
      fill="#E09810" fillOpacity="0.58" stroke="#C42B1A" strokeWidth="1.7" strokeLinejoin="round" />
    <line x1="164" y1="57.5" x2="192" y2="57.5" stroke="#C42B1A" strokeWidth="0.65" opacity="0.38" />

    {/* ── EYE — confident ink dot with glint ── */}
    <circle cx="152" cy="52" r="4.4" fill="#1A1914" />
    <circle cx="153.8" cy="50.8" r="1.5" fill="white" opacity="0.82" />

    {/* ── NECK ── */}
    <path d="M127 78 C120 90 120 98 131 106"
      stroke="url(#inkFlag2)" strokeWidth="2.3" strokeLinecap="round" />

    {/* ── WING — main arc + 3 feather scallop lines ── */}
    <path d="M57 100 C82 84 114 85 128 94"
      stroke="url(#inkFlag2)" strokeWidth="2" strokeLinecap="round" opacity="0.88" />
    <path d="M63 98 C72 93 80 93 85 97" stroke="url(#inkFlag2)" strokeWidth="1.1" strokeLinecap="round" opacity="0.52" />
    <path d="M80 94 C90 89 98 89 103 94" stroke="url(#inkFlag2)" strokeWidth="1.1" strokeLinecap="round" opacity="0.46" />
    <path d="M96 91 C106 86 116 87 121 92" stroke="url(#inkFlag2)" strokeWidth="1.1" strokeLinecap="round" opacity="0.40" />

    {/* ── TAIL — two strokes for expressive depth ── */}
    <path d="M41 88 C29 71 31 56 42 49" stroke="url(#inkFlag2)" strokeWidth="2.1" strokeLinecap="round" />
    <path d="M39 92 C25 74 23 57 37 49" stroke="url(#inkFlag2)" strokeWidth="0.9" strokeLinecap="round" opacity="0.28" />

    {/* ── FEET — red, with toe webbing arc ── */}
    <path d="M79 136 L70 150 M79 136 L84 150 M79 136 L79 150"
      stroke="#C42B1A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M71 150 Q79 147 84 150" stroke="#C42B1A" strokeWidth="1" strokeLinecap="round" opacity="0.52" />
    <path d="M106 138 L97 152 M106 138 L112 152"
      stroke="#C42B1A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M98 152 Q106 149 112 152" stroke="#C42B1A" strokeWidth="1" strokeLinecap="round" opacity="0.52" />

    {/* ── WATER — 5 delicate hand-drawn organic ripples ── */}
    <path d="M12 124 Q56 118 97 124 Q140 130 208 124" stroke="#E8A810" strokeWidth="1.15" strokeLinecap="round" opacity="0.70" />
    <path d="M22 131 Q63 125 104 131 Q147 137 205 130" stroke="#E8A810" strokeWidth="0.9" strokeLinecap="round" opacity="0.54" />
    <path d="M6 118 Q50 112 94 118 Q140 124 214 118" stroke="#D86210" strokeWidth="0.72" strokeLinecap="round" opacity="0.38" />
    <path d="M28 139 Q66 134 108 139 Q151 144 207 138" stroke="#E8A810" strokeWidth="0.65" strokeLinecap="round" opacity="0.32" />
    <path d="M16 147 Q60 142 102 147 Q144 152 202 146" stroke="#E8A810" strokeWidth="0.5" strokeLinecap="round" opacity="0.20" />
  </svg>
);

// ── DUCK LITHOGRAPH SVG (cream-on-dark, for circular plate) ─────────────
const DuckLithographSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 220 165" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} style={style} aria-hidden="true">
    <defs>
      <linearGradient id="litoGrad" x1="0" y1="0" x2="0" y2="165" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F0E4C8" stopOpacity="0.90" />
        <stop offset="55%" stopColor="#E8C86A" stopOpacity="0.84" />
        <stop offset="100%" stopColor="#D4A030" stopOpacity="0.80" />
      </linearGradient>
    </defs>
    {/* Body */}
    <path d="M98 71 C130 70 155 85 154 104 C153 122 129 137 96 136 C64 135 39 122 40 104 C41 87 65 72 98 71 Z"
      stroke="url(#litoGrad)" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M98 76 C128 75 150 88 149 104 C148 119 126 131 97 130 C68 129 45 117 46 104 C47 91 68 77 98 76 Z"
      stroke="url(#litoGrad)" strokeWidth="0.45" opacity="0.28" />
    {/* Head */}
    <path d="M144 36 C158 35 168 46 167 60 C166 74 155 84 142 84 C129 84 118 75 118 61 C118 47 129 36 144 36 Z"
      stroke="url(#litoGrad)" strokeWidth="1.7" strokeLinejoin="round" />
    {/* Beak */}
    <path d="M163 54 L192 50 L192 65 L163 60 Z"
      fill="#D4A030" fillOpacity="0.32" stroke="#E8C070" strokeWidth="1.4" strokeLinejoin="round" />
    <line x1="164" y1="57.5" x2="192" y2="57.5" stroke="#E8C070" strokeWidth="0.5" opacity="0.34" />
    {/* Eye */}
    <circle cx="152" cy="52" r="3.8" fill="#F0E4C8" opacity="0.88" />
    {/* Neck */}
    <path d="M127 78 C120 90 120 98 131 106"
      stroke="url(#litoGrad)" strokeWidth="1.8" strokeLinecap="round" />
    {/* Wing */}
    <path d="M57 100 C82 84 114 85 128 94"
      stroke="url(#litoGrad)" strokeWidth="1.6" strokeLinecap="round" opacity="0.84" />
    <path d="M63 98 C72 93 80 93 85 97" stroke="url(#litoGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.50" />
    <path d="M80 94 C90 89 98 89 103 94" stroke="url(#litoGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.43" />
    <path d="M96 91 C106 86 116 87 121 92" stroke="url(#litoGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.37" />
    {/* Tail */}
    <path d="M41 88 C29 71 31 56 42 49" stroke="url(#litoGrad)" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M39 92 C25 74 23 57 37 49" stroke="url(#litoGrad)" strokeWidth="0.7" strokeLinecap="round" opacity="0.24" />
    {/* Feet */}
    <path d="M79 136 L70 150 M79 136 L84 150 M79 136 L79 150"
      stroke="#E8C070" strokeWidth="1.5" strokeLinecap="round" opacity="0.76" />
    <path d="M71 150 Q79 147 84 150" stroke="#E8C070" strokeWidth="0.8" strokeLinecap="round" opacity="0.44" />
    <path d="M106 138 L97 152 M106 138 L112 152"
      stroke="#E8C070" strokeWidth="1.5" strokeLinecap="round" opacity="0.76" />
    <path d="M98 152 Q106 149 112 152" stroke="#E8C070" strokeWidth="0.8" strokeLinecap="round" opacity="0.44" />
    {/* Water ripples */}
    <path d="M12 124 Q56 118 97 124 Q140 130 208 124" stroke="#E8C070" strokeWidth="0.95" strokeLinecap="round" opacity="0.50" />
    <path d="M22 131 Q63 125 104 131 Q147 137 205 130" stroke="#D4A030" strokeWidth="0.72" strokeLinecap="round" opacity="0.36" />
    <path d="M6 118 Q50 112 94 118 Q140 124 214 118" stroke="#E8C070" strokeWidth="0.55" strokeLinecap="round" opacity="0.26" />
    <path d="M28 139 Q66 134 108 139 Q151 144 207 138" stroke="#D4A030" strokeWidth="0.48" strokeLinecap="round" opacity="0.22" />
    <path d="M16 147 Q60 142 102 147 Q144 152 202 146" stroke="#E8C070" strokeWidth="0.40" strokeLinecap="round" opacity="0.16" />
  </svg>
);

// ── DUCK FOOTPRINT WATERMARK SVG ──────────────────────────────────────────
const FootprintSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} style={style} aria-hidden="true">
    {/* Left foot */}
    <ellipse cx="22" cy="68" rx="6" ry="10" stroke={GOLD} strokeWidth="1.2" />
    <path d="M16 62 C10 52 8 42 14 38" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M22 58 C18 46 20 36 26 33" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M28 62 C28 50 32 40 38 38" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    {/* Right foot */}
    <ellipse cx="58" cy="32" rx="6" ry="10" stroke={GOLD} strokeWidth="1.2" />
    <path d="M52 26 C46 16 44 6 50 2" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M58 22 C54 10 56 0 62 -3" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M64 26 C64 14 68 4 74 2" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ── MENTOR ORB — frosted glass hover card ────────────────────────────────
const MentorOrb: React.FC<{ duck: typeof ALPHA_DUCKS[0] }> = ({ duck }) => {
  const { tr } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const ringDeg = Math.round(duck.survivalRate * 3.6);

  return (
    <div className="relative flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Progress ring */}
      <motion.div
        whileHover={{ scale: 1.06, y: -6 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-full"
        style={{
          width: 120, height: 120,
          background: `conic-gradient(${GOLD} 0deg ${ringDeg}deg, #E2E8F0 ${ringDeg}deg 360deg)`,
          padding: '3px',
          boxShadow: hovered
            ? `0 12px 40px rgba(250,204,21,0.28), 0 4px 12px rgba(0,0,0,0.08)`
            : `0 4px 20px rgba(0,0,0,0.07)`,
          transition: 'box-shadow 0.3s',
        }}>
        <div className="w-full h-full rounded-full flex items-center justify-center text-[2.2rem]"
          style={{ background: WHITE }}>
          {duck.emoji}
        </div>
      </motion.div>

      <p className="mt-3 text-[14px] font-semibold text-center" style={{ color: CHARCOAL }}>
        {duck.name}
      </p>
      <p className="text-[11px] mt-0.5 text-center font-bold" style={{ color: GOLD_DIM }}>
        {tr('home', duck.trBadge)}
      </p>

      {/* Frosted hover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 z-30 rounded-3xl p-5 pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: FROST_BLUR,
              WebkitBackdropFilter: FROST_BLUR,
              border: `${FROST_STROKE} solid rgba(250,204,21,0.38)`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)`,
            }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#D97706' }}>
                {duck.survivalRate}% {tr('home', 'duckSurvival')}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium" style={{ color: SLATE_BODY }}>
                ❄️ {duck.winters}× {tr('home', 'duckWinters')}
              </span>
            </div>
            <p className="text-[12px] font-semibold mb-2.5 leading-snug" style={{ color: CHARCOAL }}>
              {tr('home', duck.trTitle)}
            </p>
            <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '10px' }} />
            <p className="text-[11px] italic leading-relaxed" style={{ color: SLATE_BODY, lineHeight: 1.65 }}>
              "{tr('home', duck.trQuote)}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// ── JOURNEY MAP ─────────────────────────────────────────────────────────────
// Two item kinds: section checkpoint or numbered step
interface SectionItem {
  kind: 'section';
  id: string;
  roman: string;       // "I" / "II" / "III" / "IV"
  label: string;       // e.g. "Preparing the Wings"
  sub: string;         // e.g. "Preparing your documents"
}

interface StepItem {
  kind: 'step';
  id: string;
  num: number;
  label: string;
  sub: string;
  href: string;
}

type MapItem = SectionItem | StepItem;

// 14 items – 4 section checkpoints + 10 numbered steps
// Row 0 (LTR, 5):  SecI  · 1 · 2 · 3 · SecII
// Row 1 (RTL, 5):  4 · 5 · SecIII · 6 · 7   (displayed reversed: 7 · 6 · SecIII · 5 · 4)
// Row 2 (LTR, 4):  8 · SecIV · 9 · 10
const MAP_PATH: MapItem[] = [
  // ── Row 0 ──
  { kind: 'section', id: 'sec-I',   roman: 'I',   label: 'Preparing the Wings', sub: 'Documents & applications' },
  { kind: 'step',    id: 'edu',     num: 1,  label: 'Education',       sub: 'Knowledge Lake',      href: '/university' },
  { kind: 'step',    id: 'legal',   num: 2,  label: 'Legal Compass',   sub: 'Orientation Compass', href: '/explore/legal' },
  { kind: 'step',    id: 'lib',     num: 3,  label: 'Library',         sub: 'The Archive',          href: '/explore/library' },
  { kind: 'section', id: 'sec-II',  roman: 'II',  label: 'Building the Nest', sub: 'Setting up your home' },
  { kind: 'step',    id: 'hous',    num: 4,  label: 'Housing',         sub: 'Shelter Burrow',       href: '/housing' },
  { kind: 'step',    id: 'health',  num: 5,  label: 'Health',          sub: 'Recovery Station',     href: '/explore/health' },
  { kind: 'section', id: 'sec-III', roman: 'III', label: 'Daily Survival',    sub: 'Life in Germany' },
  { kind: 'step',    id: 'food',    num: 6,  label: 'Food',            sub: 'The Grocery Store',    href: '/food' },
  { kind: 'step',    id: 'trans',   num: 7,  label: 'Transport',       sub: 'Migration Tracks',     href: '/bahn' },
  { kind: 'step',    id: 'ent',     num: 8,  label: 'Entertainment',   sub: 'The Dance Club',       href: '/entertainment' },
  { kind: 'section', id: 'sec-IV',  roman: 'IV',  label: 'Flying Further',    sub: 'Career & finances' },
  { kind: 'step',    id: 'career',  num: 9,  label: 'Career',          sub: 'Takeoff Strip',        href: '/explore/career' },
  { kind: 'step',    id: 'salary',  num: 10, label: 'Salary',          sub: "The Duck's Purse",    href: '/explore/salary' },
];

const MAP_ROWS: MapItem[][] = [
  MAP_PATH.slice(0, 5),
  MAP_PATH.slice(5, 10),
  MAP_PATH.slice(10),
];

// ── SECTION CHECKPOINT NODE ───────────────────────────────────────────────
const SectionNode: React.FC<{ item: SectionItem }> = ({ item }) => (
  <div className="flex flex-col items-center" style={{ width: '82px', flexShrink: 0 }}>
    {/* Red-flag button — same size as StepNode */}
    <div
      style={{
        width: '70px', height: '64px',
        background: '#fff5f5',
        border: '2.5px dashed #fca5a5',
        borderBottom: '5px solid #f87171',
        borderRadius: '18px',
        boxShadow: '0 3px 0 rgba(239,68,68,0.15), inset 0 0 0 1.5px rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'default',
      }}
      aria-label={`Section ${item.roman}`}
    >
      <span style={{ fontSize: '26px', lineHeight: 1 }}>🚩</span>
    </div>
    {/* Roman numeral */}
    <span
      className="mt-2 text-center font-extrabold leading-none"
      style={{ fontSize: '12px', color: '#dc2626', fontFamily: "'Courier New', monospace", letterSpacing: '0.06em' }}
    >
      {item.roman}
    </span>
    {/* Section title */}
    <span
      className="text-center leading-tight mt-1 font-bold"
      style={{ fontSize: '10px', color: '#b91c1c', maxWidth: '82px', fontFamily: "'Courier New', monospace" }}
    >
      {item.label}
    </span>
    {/* Section sub */}
    <span
      className="text-center leading-tight mt-0.5 italic"
      style={{ fontSize: '9px', color: '#ef4444', maxWidth: '82px', opacity: 0.75 }}
    >
      {item.sub}
    </span>
  </div>
);

// \u2500\u2500 NUMBERED STEP NODE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const StepNode: React.FC<{ item: StepItem }> = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    navigate(item.href);
  };
  return (
    <div className="flex flex-col items-center" style={{ width: '82px', flexShrink: 0 }}>
      <button
        onClick={handleClick}
        className="relative box-border cursor-pointer touch-manipulation rounded-2xl transition-all duration-150 active:translate-y-[2px] hover:brightness-105"
        style={{
          width: '70px', height: '64px',
          background: '#fdf6ec',
          border: '2.5px dashed #d4a97e',
          borderBottom: '5px solid #c5956a',
          boxShadow: '0 3px 0 rgba(0,0,0,0.09), inset 0 0 0 1.5px rgba(255,255,255,0.7)',
          fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label={item.label}
      >
        <span
          className="font-extrabold"
          style={{ fontSize: '22px', color: '#8a6240', letterSpacing: '-0.5px', fontFamily: "'Courier New', monospace" }}
        >
          {item.num}
        </span>
      </button>
      {/* Step name */}
      <span
        className="mt-2 text-center leading-tight font-bold"
        style={{ fontSize: '11px', color: '#1e3a5f', maxWidth: '82px', fontFamily: "'Courier New', monospace" }}
      >
        {item.label}
      </span>
      {/* Sub */}
      <span
        className="text-center leading-tight mt-1"
        style={{ fontSize: '9.5px', color: '#4a6fa5', maxWidth: '82px', opacity: 0.85, fontFamily: "'Courier New', monospace" }}
      >
        {item.sub}
      </span>
    </div>
  );
};

// \u2500\u2500 DUCK FOOTPRINT PAIR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Left foot toes inward (+15\u00b0), right foot toes inward (-15\u00b0), close together.
const FootprintPair: React.FC<{ rtl?: boolean; vertical?: boolean }> = ({ rtl = false, vertical = false }) => {
  const FP_SIZE = 16;
  const style0 = { width: FP_SIZE, height: FP_SIZE, objectFit: 'contain' as const, opacity: 0.52 };

  if (vertical) {
    // Turning corner: feet V-shape side by side
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1px' }}>
        <img src="/duck_fp.png" alt="" style={{ ...style0, transform: 'rotate(-15deg) translateY(-2px)' }} />
        <img src="/duck_fp.png" alt="" style={{ ...style0, transform: 'scaleX(-1) rotate(-15deg) translateY(2px)' }} />
      </div>
    );
  }
  // Horizontal path: left foot (top) +15\u00b0, right foot (bottom) -15\u00b0 — toes kiss toward center
  const base = rtl ? 270 : 90;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
      <img src="/duck_fp.png" alt="" style={{ ...style0, transform: `rotate(${base + 15}deg)` }} />
      <img src="/duck_fp.png" alt="" style={{ ...style0, transform: `rotate(${base - 15}deg) scaleX(-1)` }} />
    </div>
  );
};


const JourneyMap: React.FC = () => {
  return (
    <div
      className="w-full py-7 px-5 rounded-3xl"
      style={{
        background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 50%, #e0f2fe 100%)',
        border: '2.5px dashed #93c5fd',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sketch notebook grid watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
          backgroundImage:
            'repeating-linear-gradient(0deg,#1d4ed8 0px,#1d4ed8 1px,transparent 1px,transparent 28px),' +
            'repeating-linear-gradient(90deg,#1d4ed8 0px,#1d4ed8 1px,transparent 1px,transparent 28px)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── 3 S-shaped rows ── */}
        <div className="flex flex-col w-full" style={{ gap: '6px' }}>
          {MAP_ROWS.map((rowItems, rowIdx) => {
            const isLTR = rowIdx % 2 === 0;
            const display = isLTR ? rowItems : [...rowItems].reverse();
            const isLast = rowIdx === MAP_ROWS.length - 1;

            return (
              <div key={rowIdx} className="flex flex-col">
                {/* Horizontal row — items-start keeps all buttons on the same baseline */}
                <div
                  className="flex items-start w-full"
                  style={{ justifyContent: 'space-between', paddingLeft: '2px', paddingRight: '2px' }}
                >
                  {display.map((item, si) => (
                    <React.Fragment key={item.id}>
                      {item.kind === 'section'
                        ? <SectionNode item={item} />
                        : <StepNode item={item} />}
                      {si < display.length - 1 && (
                        /* 2 duck strides (pairs) between each button */
                        <div
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', alignSelf: 'center', minWidth: 0 }}
                        >
                          <FootprintPair rtl={!isLTR} />
                          <FootprintPair rtl={!isLTR} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Vertical turn connector */}
                {!isLast && (
                  <div
                    style={{
                      alignSelf: isLTR ? 'flex-end' : 'flex-start',
                      marginRight: isLTR ? '28px' : undefined,
                      marginLeft: !isLTR ? '28px' : undefined,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: '6px', paddingTop: '6px', paddingBottom: '6px',
                    }}
                  >
                    <FootprintPair vertical />
                    <FootprintPair vertical />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', marginTop: '16px', paddingTop: '12px', borderTop: '1.5px dashed #93c5fd' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px' }}>🚩</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.06em' }}>Section</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FootprintPair />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.06em' }}>Duck's Path</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '20px', height: '15px', borderRadius: '6px', background: '#fdf6ec', border: '2px dashed #d4a97e' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.06em' }}>Checkpoint</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tr } = useLanguage();

  return (
    <main className="w-full font-sans" style={{ backgroundColor: CREAM }}>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  (dark night, unchanged)
      ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden">
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
            background: 'linear-gradient(to right, #0D1226 0%, #0D1226CC 8%, transparent 40%)',
          }}
          aria-hidden="true"
        />

        {/* HeroSearchBar fills the entire hero section */}
        <HeroSearchBar onNavigate={navigate} />
      </section>

      {/* ══════════════════════════════════════════
          TRANSITION ZONE — Hero → Why Die Ente
          Scroll-reveal chapter break
      ══════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #111E35 0%, #1A2B4C 18%, #243756 38%, #3D5872 58%, #8CAABE 76%, #C4D3E0 90%, #DDE6F4 100%)',
          minHeight: '46vh',
          padding: '5rem 1.5rem 4.5rem',
          marginTop: '-1px',
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.38 }}
          className="text-center"
          style={{ maxWidth: '680px' }}
        >
          {/* Amber thread — visual carry-over from Hero's amber accent */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, #FFCC0066)' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFCC00', opacity: 0.55 }} />
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to left, transparent, #FFCC0066)' }} />
          </motion.div>

          {/* Section index */}
          <motion.p variants={fadeUp} style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.34em',
            color: 'rgba(255,204,0,0.42)',
            textTransform: 'uppercase',
            marginBottom: '1.3rem',
          }}>
            § 01 · CHAPTER I
          </motion.p>

          {/* Main title — all caps, editorial */}
          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Georgia', serif",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.91)',
            lineHeight: 1.12,
            textShadow: '0 4px 28px rgba(0,0,0,0.4)',
          }}>
            The Anatomy<br />of a Mascot
          </motion.h2>

          {/* Amber thin rule */}
          <motion.div variants={fadeUp} style={{
            width: '52px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #FFCC0055, transparent)',
            margin: '1.6rem auto',
          }} />

          {/* Subtitle */}
          <motion.p variants={fadeUp} style={{
            fontFamily: 'monospace',
            fontSize: '8.5px',
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.24)',
            textTransform: 'uppercase',
          }}>
            DIE ENTE · ORIGIN STORY
          </motion.p>
        </motion.div>
      </section >

      {/* ══════════════════════════════════════════
          SECTION 2 — THE QUACK PHILOSOPHY
          Book / editorial spread · open layout · 7:3 · dark plate
      ══════════════════════════════════════════ */}
      < section className="py-16 md:py-28" style={{
        background: 'linear-gradient(to bottom, #DDE6F4 0%, #E8EEF8 18%, #EEF0F5 38%, #F3EEE8 62%, #F9F3EB 82%, #FDF9F4 100%)',
      }}>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[960px] mx-auto px-8 md:px-12">

          <div className="flex flex-col md:flex-row">

            {/* ── LEFT 70% — book text column ── */}
            <div className="flex-[7] py-8 md:pr-14 flex flex-col">

              {/* Main heading — large italic serif */}
              <h2 className="mb-5" style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.7rem, 5vw, 3.9rem)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: '#201E1A',
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
              }}>
                Why "Die Ente"?
              </h2>

              {/* Thin rule */}
              <div className="mb-6" style={{ height: '0.75px', background: 'rgba(0,0,0,0.12)' }} />

              {/* Lead paragraph — slightly larger, lighter */}
              <p className="mb-5" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15.5px',
                fontWeight: 300,
                color: '#4A4540',
                lineHeight: 1.78,
              }}>
                {tr('home', 'philosophyAbove')}
              </p>

              {/* Body paragraphs */}
              {(['philosophyPara1', 'philosophyPara2', 'philosophyPara3'] as const).map((key, i) => (
                <p key={key}
                  className={i < 2 ? 'mb-[1.45rem]' : ''}
                  dangerouslySetInnerHTML={{ __html: tr('home', key) }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14.5px',
                    lineHeight: 1.92,
                    color: '#3A3530',
                  }} />
              ))}

              {/* Folio footer */}
              <div className="mt-8 pt-4 flex items-center gap-3"
                style={{ borderTop: '0.75px solid rgba(0,0,0,0.1)' }}>
                <p className="uppercase" style={{
                  fontSize: '9.5px', letterSpacing: '0.2em',
                  color: '#7A7468', fontFamily: 'monospace',
                }}>
                  EST. 2026 · GERMANY & VIETNAM
                </p>
                <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: '10px', lineHeight: 1 }}>·</span>
                <p style={{
                  fontSize: '9.5px', color: '#9A9080',
                  fontFamily: 'monospace', letterSpacing: '0.16em',
                }}>
                  THE ORIGIN STORY
                </p>
              </div>
            </div>

            {/* Vertical gutter — thin book rule */}
            <div className="hidden md:block w-px self-stretch mx-3"
              style={{ background: 'rgba(0,0,0,0.09)' }} />

            {/* ── RIGHT 30% — German flag duck ── */}
            <div className="flex-[3] py-8 md:pl-12 flex flex-col items-center justify-center">

              <motion.div
                className="w-full max-w-[260px] flex flex-col items-center"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>

                <GermanFlagDuckSVG style={{ width: '100%', height: 'auto' }} />

                {/* Thin separator */}
                <div className="w-full mt-5 mb-3" style={{
                  height: '0.75px',
                  background: 'linear-gradient(to right, transparent, rgba(178,138,50,0.42), transparent)',
                }} />

                {/* DIE ENTE label */}
                <p className="text-center font-mono uppercase"
                  style={{ fontSize: '9.5px', letterSpacing: '0.26em', color: '#8A8070' }}>
                  DIE ENTE
                </p>

                {/* Heritage oval badge */}
                <div className="mt-3">
                  <svg viewBox="0 0 96 40" width="86" height="36" aria-hidden="true">
                    <ellipse cx="48" cy="20" rx="44" ry="17" stroke="#B0A080" strokeWidth="0.85" fill="none" opacity="0.48" />
                    <ellipse cx="48" cy="20" rx="37" ry="12" stroke="#B0A080" strokeWidth="0.5" fill="none" opacity="0.28" />
                    <circle cx="10" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                    <circle cx="86" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                    <text x="48" y="16.5" textAnchor="middle" fill="#7A7060" opacity="0.78"
                      style={{ fontSize: '6.5px', letterSpacing: '0.17em', fontFamily: 'monospace' }}>GER · VN</text>
                    <line x1="18" y1="20" x2="36" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                    <path d="M48 17.5 L50 20 L48 22.5 L46 20 Z" fill="#B0A080" opacity="0.36" />
                    <line x1="60" y1="20" x2="78" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                    <text x="48" y="27" textAnchor="middle" fill="#7A7060" opacity="0.64"
                      style={{ fontSize: '5.5px', letterSpacing: '0.14em', fontFamily: 'monospace' }}>EST. 2026</text>
                  </svg>
                </div>

              </motion.div>
            </div>
          </div>
        </motion.div>
      </section >

      // ── SECTION 3: THE MIGRATORY PATH (HÀNH TRÌNH VƯỢT ĐẠI DƯƠNG) ──────────────
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: CREAM }}>

        {/* Nền trang trí: Dấu chân vịt mờ chạy dọc trang */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none opacity-[0.03]">
          <FootprintSVG className="w-24 h-auto absolute top-10 left-1/4 rotate-12" />
          <FootprintSVG className="w-20 h-auto absolute top-80 right-1/4 -rotate-12" />
          <FootprintSVG className="w-28 h-auto absolute top-[40%] left-1/3 rotate-45" />
          <FootprintSVG className="w-22 h-auto absolute bottom-40 right-1/3 -rotate-12" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto px-6 relative z-10"
        >
          {/* Header của Section */}
          <div className="flex flex-col items-center mb-20 text-center">
            <motion.div variants={fadeUp} className="mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ backgroundColor: GOLD, color: CHARCOAL }}>
                Interactive Map
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: CHARCOAL,
              fontWeight: 700
            }}>
              The Migratory Path
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-4 max-w-xl" style={{
              color: SLATE_BODY,
              fontSize: '15px',
              lineHeight: 1.6
            }}>
              Mỗi bước chân của Die Ente là một cột mốc quan trọng. Hãy đi theo dấu chân vịt để chuẩn bị
              cho hành trình định cư và học tập tại Đức của bạn.
            </motion.p>

            {/* Đường line mảnh Bauhaus */}
            <motion.div variants={fadeUp} className="mt-8 w-12 h-1 bg-charcoal" style={{ backgroundColor: CHARCOAL }} />
          </div>

          {/* Render JourneyMap Component */}
          <motion.div variants={fadeUp} className="w-full flex justify-center">
            {/* Chúng ta bọc JourneyMap trong một container để kiểm soát layout bento-style nếu cần */}
            <div className="w-full max-w-6xl bg-white/40 backdrop-blur-sm rounded-[40px] p-6 md:p-10 border border-white/60 shadow-sm">
              <div className="flex flex-col md:flex-row">

                {/* ── LEFT 70% — book text column ── */}
                <div className="flex-[7] py-8 md:pr-14 flex flex-col">

                  {/* Main heading — large italic serif */}
                  <h2 className="mb-5" style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2.7rem, 5vw, 3.9rem)',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: '#201E1A',
                    lineHeight: 1.04,
                    letterSpacing: '-0.01em',
                  }}>
                    Why "Die Ente"?
                  </h2>

                  {/* Thin rule */}
                  <div className="mb-6" style={{ height: '0.75px', background: 'rgba(0,0,0,0.12)' }} />

                  {/* Lead paragraph — slightly larger, lighter */}
                  <p className="mb-5" style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15.5px',
                    fontWeight: 300,
                    color: '#4A4540',
                    lineHeight: 1.78,
                  }}>
                    {tr('home', 'philosophyAbove')}
                  </p>

                  {/* Body paragraphs */}
                  {(['philosophyPara1', 'philosophyPara2', 'philosophyPara3'] as const).map((key, i) => (
                    <p key={key}
                      className={i < 2 ? 'mb-[1.45rem]' : ''}
                      dangerouslySetInnerHTML={{ __html: tr('home', key) }}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14.5px',
                        lineHeight: 1.92,
                        color: '#3A3530',
                      }} />
                  ))}

                  {/* Folio footer */}
                  <div className="mt-8 pt-4 flex items-center gap-3"
                    style={{ borderTop: '0.75px solid rgba(0,0,0,0.1)' }}>
                    <p className="uppercase" style={{
                      fontSize: '9.5px', letterSpacing: '0.2em',
                      color: '#7A7468', fontFamily: 'monospace',
                    }}>
                      EST. 2026 · GERMANY & VIETNAM
                    </p>
                    <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: '10px', lineHeight: 1 }}>·</span>
                    <p style={{
                      fontSize: '9.5px', color: '#9A9080',
                      fontFamily: 'monospace', letterSpacing: '0.16em',
                    }}>
                      THE ORIGIN STORY
                    </p>
                  </div>
                </div>

                {/* Vertical gutter — thin book rule */}
                <div className="hidden md:block w-px self-stretch mx-3"
                  style={{ background: 'rgba(0,0,0,0.09)' }} />

                {/* ── RIGHT 30% — German flag duck ── */}
                <div className="flex-[3] py-8 md:pl-12 flex flex-col items-center justify-center">

                  <motion.div
                    className="w-full max-w-[260px] flex flex-col items-center"
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>

                    <GermanFlagDuckSVG style={{ width: '100%', height: 'auto' }} />

                    {/* Thin separator */}
                    <div className="w-full mt-5 mb-3" style={{
                      height: '0.75px',
                      background: 'linear-gradient(to right, transparent, rgba(178,138,50,0.42), transparent)',
                    }} />

                    {/* DIE ENTE label */}
                    <p className="text-center font-mono uppercase"
                      style={{ fontSize: '9.5px', letterSpacing: '0.26em', color: '#8A8070' }}>
                      DIE ENTE
                    </p>

                    {/* Heritage oval badge */}
                    <div className="mt-3">
                      <svg viewBox="0 0 96 40" width="86" height="36" aria-hidden="true">
                        <ellipse cx="48" cy="20" rx="44" ry="17" stroke="#B0A080" strokeWidth="0.85" fill="none" opacity="0.48" />
                        <ellipse cx="48" cy="20" rx="37" ry="12" stroke="#B0A080" strokeWidth="0.5" fill="none" opacity="0.28" />
                        <circle cx="10" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                        <circle cx="86" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                        <text x="48" y="16.5" textAnchor="middle" fill="#7A7060" opacity="0.78"
                          style={{ fontSize: '6.5px', letterSpacing: '0.17em', fontFamily: 'monospace' }}>GER · VN</text>
                        <line x1="18" y1="20" x2="36" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                        <path d="M48 17.5 L50 20 L48 22.5 L46 20 Z" fill="#B0A080" opacity="0.36" />
                        <line x1="60" y1="20" x2="78" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                        <text x="48" y="27" textAnchor="middle" fill="#7A7060" opacity="0.64"
                          style={{ fontSize: '5.5px', letterSpacing: '0.14em', fontFamily: 'monospace' }}>EST. 2026</text>
                      </svg>
                    </div>

                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section >

      // ── SECTION 3: THE MIGRATORY PATH (HÀNH TRÌNH VƯỢT ĐẠI DƯƠNG) ──────────────
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: CREAM }}>

        {/* Nền trang trí: Dấu chân vịt mờ chạy dọc trang */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none opacity-[0.03]">
          <FootprintSVG className="w-24 h-auto absolute top-10 left-1/4 rotate-12" />
          <FootprintSVG className="w-20 h-auto absolute top-80 right-1/4 -rotate-12" />
          <FootprintSVG className="w-28 h-auto absolute top-[40%] left-1/3 rotate-45" />
          <FootprintSVG className="w-22 h-auto absolute bottom-40 right-1/3 -rotate-12" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto px-6 relative z-10"
        >
          {/* Section header — matches reference: pill badge + big serif title + subtitle */}
          <div className="flex flex-col items-center mb-10 text-center">

            {/* Pill badge */}
            <motion.div variants={fadeUp} className="mb-4">
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '7px 20px',
                  borderRadius: '999px',
                  background: '#FCF3D9',
                  border: '1.5px solid #E8C97A',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.13em',
                  color: '#A07820',
                  textTransform: 'uppercase',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                }}
              >
                <span>🗺️</span> THE MAP
              </span>
            </motion.div>

            {/* Big serif heading */}
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: CHARCOAL,
              fontWeight: 800,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}>
              Die Ente's Oceanic Journey
            </motion.h2>

            {/* Subtitle */}
            <motion.p variants={fadeUp} style={{
              color: SLATE_BODY,
              fontSize: '15px',
              lineHeight: 1.65,
              maxWidth: '480px',
            }}>
              Ten checkpoints. Every pond you'll cross as an international student in Germany.
            </motion.p>
          </div>

          {/* Render JourneyMap Component */}
          <motion.div variants={fadeUp} className="w-full flex justify-center">
            {/* Chúng ta bọc JourneyMap trong một container để kiểm soát layout bento-style nếu cần */}
            <div className="w-full max-w-6xl bg-white/40 backdrop-blur-sm rounded-[40px] p-6 md:p-10 border border-white/60 shadow-sm">
              <JourneyMap />
            </div>
          </motion.div>



        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — THE MAP (Bento Grid Journey)
          1200px container · gap-8 · grid-auto-rows equal height
      ══════════════════════════════════════════ */}
      < section className="py-10 md:py-20 px-6" style={{ backgroundColor: CREAM }}>

        {/* Section divider */}
        < div className="max-w-[1200px] mx-auto mb-8" >
          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}35, transparent)` }} />
        </div >

        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-7">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GOLD}1A`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}44` }}>
              {tr('home', 'mapBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
              {tr('home', 'mapTitle')}
            </h2>
            <p className="text-[15px] max-w-md mx-auto" style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
              {tr('home', 'mapDesc')}
            </p>
          </motion.div>

          {/* Migration path — visual axis, centred */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8 select-none">
            {(['I', 'II', 'III', 'IV'] as const).map((n, i) => (
              <React.Fragment key={n}>
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ background: `${GOLD}22`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}55` }}>
                  {n}
                </span>
                {i < 3 && (
                  <div className="flex gap-1.5 items-center">
                    {[0, 1, 2, 3, 4].map(d => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${GOLD}40` }} />
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Bento grid — equal-height rows, gap-8 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ gridAutoRows: '1fr' }}>
            {MAP_STAGES.map((stage, si) => {
              const diff = DIFFICULTY[stage.difficulty];
              const accent = STAGE_ACCENTS[si];
              return (
                <motion.div key={stage.roman} variants={fadeUp}
                  className={`group relative rounded-3xl p-8 cursor-default overflow-hidden transition-all duration-300 ${stage.colClass}`}
                  style={{
                    background: FROST_BG,
                    backdropFilter: FROST_BLUR,
                    WebkitBackdropFilter: FROST_BLUR,
                    boxShadow: FROST_SHADOW,
                    border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 24px 56px rgba(250,204,21,0.12), 0 6px 18px rgba(0,0,0,0.06), 0 0 0 ${FROST_STROKE} rgba(250,204,21,0.50)`,
                  }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}>

                  {/* Golden left accent bar */}
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
                    style={{ backgroundColor: accent.leftBar, opacity: 0.55 }} />

                  {/* Hover fill wash */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                    style={{ background: accent.cardHover }} />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Stage header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0"
                          style={{ background: accent.iconBg, color: accent.iconColor }}>
                          {stage.roman}
                        </span>
                        <p className="text-[14px] font-semibold leading-tight" style={{ color: CHARCOAL }}>
                          {stage.emoji} {tr('home', stage.trStageLabel)}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}>
                        {diff.label}
                      </span>
                    </div>

                    {/* Items — flex-grow fills equal height */}
                    <ul className="flex flex-col gap-4 flex-1">
                      {stage.items.map(item => (
                        <li key={item.href}>
                          <Link to={item.href} className="flex items-start gap-3 group/item">
                            <span className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                              style={{ background: accent.iconBg, color: accent.iconColor }}>
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold transition-colors duration-200 group-hover/item:underline underline-offset-2"
                                style={{ color: CHARCOAL }}>
                                {tr('home', item.trName)}
                              </p>
                              <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: SLATE_MUTED }}>
                                {tr('home', item.trDesc)}
                              </p>
                            </div>
                            <ArrowRight size={12} className="mt-1 shrink-0 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200"
                              style={{ color: accent.iconColor }} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section >

      {/* ══════════════════════════════════════════
          SECTION 4 — DAILY QUACKS (Bulletin Board)
          3-col centred grid · max-width 380px cards · gravity-centred rotations
      ══════════════════════════════════════════ */}
      < section className="py-10 md:py-20 px-6" style={{ backgroundColor: CREAM }}>

        {/* Section divider */}
        < div className="max-w-[1200px] mx-auto mb-8" >
          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}35, transparent)` }} />
        </div >

        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-7">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GOLD}1A`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}44` }}>
              {tr('home', 'quacksBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
              {tr('home', 'quacksTitle')}
            </h2>
          </motion.div>

          {/* 3-column centred grid — each card capped at 380px, gravity centred */}
          <motion.div variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {BULLETIN_CARDS.map((card, i) => (
              <motion.div key={i} variants={fadeUp} className="w-full max-w-[380px]"
                style={{ transformOrigin: 'center bottom' }}>

                {card.type === 'note' ? (

                  /* ── Frosted stationery note card ── */
                  <motion.div
                    whileHover={{ y: -6, boxShadow: `0 24px 50px rgba(0,0,0,0.07), 0 0 0 ${FROST_STROKE} ${GOLD}55` }}
                    transition={{ duration: 0.22 }}
                    className="rounded-3xl p-7 h-full"
                    style={{
                      background: FROST_BG,
                      backdropFilter: FROST_BLUR,
                      WebkitBackdropFilter: FROST_BLUR,
                      border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                      boxShadow: FROST_SHADOW,
                    }}>
                    {/* macOS dots */}
                    <div className="flex items-center gap-1.5 mb-5">
                      {['#f87171', '#fbbf24', '#4ade80'].map(c => (
                        <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: 0.65 }} />
                      ))}
                    </div>
                    <p className="font-mono text-[10px] font-bold mb-2 tracking-wider"
                      style={{ color: (card as any).tagColor }}>
                      {card.tag}
                    </p>
                    <p className="font-mono text-[18px] font-bold mb-3 leading-tight" style={{ color: CHARCOAL }}>
                      $ {card.germanWord}
                    </p>
                    <p className="text-[13px] leading-relaxed" style={{ color: SLATE_BODY, lineHeight: 1.75 }}>
                      {tr('home', card.trContent)}
                    </p>
                  </motion.div>

                ) : (

                  /* ── Frosted pastel sticky note — rotation preserves centre of gravity ── */
                  <motion.div
                    whileHover={{ y: -6, rotate: 0, boxShadow: `0 24px 50px rgba(0,0,0,0.07), 0 0 0 ${FROST_STROKE} ${GOLD}50` }}
                    transition={{ duration: 0.22 }}
                    className="rounded-2xl p-6 h-full"
                    style={{
                      background: `color-mix(in srgb, ${(card as any).bg} 68%, rgba(255,255,255,0.80) 32%)`,
                      backdropFilter: FROST_BLUR,
                      WebkitBackdropFilter: FROST_BLUR,
                      transform: `rotate(${(card as any).rotate ?? '0deg'})`,
                      border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                      boxShadow: FROST_SHADOW,
                    }}>
                    <p className="font-mono text-[10px] font-bold mb-3 tracking-wider"
                      style={{ color: 'rgba(44,51,64,0.45)' }}>
                      {card.tag}
                    </p>
                    <p className="font-mono text-[18px] font-bold mb-2 leading-tight" style={{ color: CHARCOAL }}>
                      {card.germanWord}
                    </p>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#334155', lineHeight: 1.75 }}>
                      {tr('home', card.trContent)}
                    </p>
                  </motion.div>

                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section >

      {/* ══════════════════════════════════════════
          SECTION 5 — THE MENTORS (Floating Orbs)
          White frost matrix · 1200px container · 1.5px border
      ══════════════════════════════════════════ */}
      < section className="py-10 md:py-20 px-6" style={{ backgroundColor: CREAM }}>

        {/* Section divider */}
        < div className="max-w-[1200px] mx-auto mb-8" >
          <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}35, transparent)` }} />
        </div >

        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-7">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GOLD}1A`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}44` }}>
              {tr('home', 'mentorsBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
              {tr('home', 'mentorsTitle')}
            </h2>
            <p className="text-[15px] max-w-lg mx-auto" style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
              {tr('home', 'mentorsSlogan')}
            </p>
          </motion.div>

          {/* White frost matrix */}
          <motion.div variants={fadeUp}
            className="rounded-[2rem] p-6 sm:p-8"
            style={{
              background: 'rgba(255,255,255,0.62)',
              backdropFilter: FROST_BLUR,
              WebkitBackdropFilter: FROST_BLUR,
              border: `${FROST_STROKE} solid rgba(250,204,21,0.22)`,
              boxShadow: FROST_SHADOW,
            }}>
            <motion.div variants={stagger}
              className="flex flex-wrap items-end justify-center gap-14 md:gap-20">
              {ALPHA_DUCKS.map((duck, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <MentorOrb duck={duck} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center mt-6">
            <Link to="/community/contributor"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-[13px] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ color: CHARCOAL, border: `${FROST_STROKE} solid ${GOLD}65`, background: `${GOLD}12` }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}22`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}12`; }}>
              <Users size={15} />
              {tr('home', 'mentorsCTA')}
            </Link>
          </motion.div>
        </motion.div>
      </section >

      {/* ══════════════════════════════════════════
          SECTION 6 — THE NEST (Footer CTA)
          Off-white → muted sky-blue frost gradient
          Polished gold CTA with frosted glass bezel
      ══════════════════════════════════════════ */}
      < section className="relative py-10 md:py-20 px-6 overflow-hidden" >

        {/* Off-white → muted cyan/sky-blue frost gradient */}
        < div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #F9F9F7 0%, #EFF6FF 52%, #E0F2FE 100%)' }}
          aria-hidden="true" />

        {/* Thin gold divider at top */}
        < div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-px"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)` }}
          aria-hidden="true" />

        {/* Soft sky-blue ambient glow at bottom */}
        < div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(56,189,248,0.18)' }} aria-hidden="true" />

        {/* Subtle golden warm glow */}
        < div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[400px] h-[180px] rounded-full blur-[80px] pointer-events-none"
          style={{ backgroundColor: `${GOLD}18` }} aria-hidden="true" />

        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 max-w-[640px] mx-auto text-center">

          <motion.span variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
            style={{ background: `${GOLD}22`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}50` }}>
            {tr('home', 'nestBadge')}
          </motion.span>

          <motion.div variants={fadeUp} className="text-4xl mb-4">🦆</motion.div>

          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
            {tr('home', 'nestTitle')}
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-[16px] mb-8 max-w-sm mx-auto"
            style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
            {tr('home', 'nestDesc')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Primary — polished gold CTA with frosted glass bezel */}
            <motion.div
              className="rounded-2xl"
              style={{
                padding: '3px',
                background: `linear-gradient(135deg, ${GOLD} 0%, #FDE68A 50%, ${GOLD} 100%)`,
                boxShadow: `0 0 0 0 ${GOLD}60`,
              }}
              animate={{ boxShadow: [`0 0 0 0 ${GOLD}60`, `0 0 0 14px ${GOLD}00`] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}>
              <Link to="/community/contributor"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-[14px] font-bold text-[15px] transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backgroundColor: GOLD,
                  color: CHARCOAL,
                  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.45), 0 6px 28px ${GOLD}50`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = GOLD_DIM; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = GOLD; }}>
                <Users size={17} />
                {tr('home', 'nestBtn')}
              </Link>
            </motion.div>

            {/* Secondary — frosted ghost */}
            <Link to="/university"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-[15px] border transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                color: CHARCOAL,
                borderColor: 'rgba(44,51,64,0.14)',
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = `${GOLD}70`;
                el.style.background = `rgba(255,255,255,0.75)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(44,51,64,0.14)';
                el.style.background = 'rgba(255,255,255,0.55)';
              }}>
              <ArrowRight size={17} />
              {tr('home', 'nestExplore')}
            </Link>
          </motion.div>

          {/* Warm closing note */}
          <motion.p variants={fadeUp}
            className="mt-8 text-[12px] font-medium italic"
            style={{ color: `${CHARCOAL}55` }}>
            "Đừng để bị lạc giữa dòng đời, hãy về với Nest." — Die Ente
          </motion.p>
        </motion.div>
      </section >

    </main >
  );
};

export default HomePage;
