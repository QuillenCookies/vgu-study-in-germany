import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
    GraduationCap, TrainFront, Building2,
    UtensilsCrossed, Ticket,
    Heart, Scale, BookOpen, Briefcase, Wallet, Linkedin,
} from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';

// ── DESIGN TOKENS (Bauhaus / Scandinavian EU Light) ───────────────────────
export const CREAM = '#F9F9F7';  // main bg — warm off-white, never pure white
export const WHITE = '#FFFFFF';  // inner frosted fill
export const CHARCOAL = '#2C3340';  // soft charcoal headings
export const SLATE_BODY = '#546073';  // muted slate body copy
export const SLATE_MUTED = '#94A3B8';  // below-the-line text
export const GOLD = '#FACC15';  // Duck Yellow — CTA accent
export const GOLD_DIM = '#CA8A04';  // hover / subdued gold

// Frosted glass system — reused across all floating tiles
export const FROST_BG = 'rgba(255,255,255,0.74)';
export const FROST_BORDER = `rgba(250,204,21,0.28)`;
export const FROST_SHADOW = '0 20px 50px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)';
export const FROST_BLUR = 'blur(24px)';  // backdrop-blur-xl consistent depth
export const FROST_STROKE = '1.5px';       // consistent border weight

// Hero-section legacy tokens (dark overlay)
export const MIDNIGHT = '#1A2B4C';

// ── DIFFICULTY BADGES — light pastel ──────────────────────────────────────
export const DIFFICULTY = {
    Schwer: { bg: '#FEE2E2', color: '#DC2626', border: '#FECACA', label: 'Schwer' },
    Mittel: { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A', label: 'Mittel' },
    Einfach: { bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0', label: 'Einfach' },
} as const;
export type DiffKey = keyof typeof DIFFICULTY;

// ── STAGE PASTEL ACCENTS ───────────────────────────────────────────────────
export const STAGE_ACCENTS = [
    { iconBg: '#DCFCE7', iconColor: '#059669', leftBar: '#34D399', cardHover: 'rgba(220,252,231,0.35)' },
    { iconBg: '#FEF9C3', iconColor: '#CA8A04', leftBar: '#FBBF24', cardHover: 'rgba(254,249,195,0.35)' },
    { iconBg: '#DBEAFE', iconColor: '#2563EB', leftBar: '#60A5FA', cardHover: 'rgba(219,234,254,0.35)' },
    { iconBg: '#EDE9FE', iconColor: '#7C3AED', leftBar: '#A78BFA', cardHover: 'rgba(237,233,254,0.35)' },
];

// ── THE MAP: 4 BENTO STAGES ───────────────────────────────────────────────
export const MAP_STAGES: {
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
export const ALPHA_DUCKS = [
    { emoji: '🦆', name: 'Phạm Trọng Quý', trBadge: 'duckBadge0' as const, trTitle: 'duckTitle0' as const, survivalRate: 97, winters: 4, trQuote: 'duckQuote0' as const, linkedin: 'https://www.linkedin.com/in/phamtrongquy/' },
    { emoji: '🎨', name: 'Hồ Nguyễn Phú', trBadge: 'duckBadge1' as const, trTitle: 'duckTitle1' as const, survivalRate: 88, winters: 3, trQuote: 'duckQuote1' as const, linkedin: '#' },
    { emoji: '✍️', name: 'Cao Tuệ Anh', trBadge: 'duckBadge2' as const, trTitle: 'duckTitle2' as const, survivalRate: 94, winters: 2, trQuote: 'duckQuote2' as const, linkedin: '#' },
];

// ── BULLETIN BOARD ────────────────────────────────────────────────────────
export const BULLETIN_CARDS = [
    { type: 'note' as const, tag: '[QUACK-ALERT]', tagColor: '#16A34A', germanWord: 'Ruhetag', trContent: 'quack0' as const },
    { type: 'sticky' as const, tag: '#MoneyBack', bg: '#FFFDE7', germanWord: 'Pfand', trContent: 'quack1' as const, rotate: '-2deg' },
    { type: 'sticky' as const, tag: '#FreeTravel', bg: '#EFF6FF', germanWord: 'Semesterticket', trContent: 'quack2' as const, rotate: '1.5deg' },
    { type: 'note' as const, tag: '[SURVIVAL-TIP]', tagColor: '#D97706', germanWord: 'Anmeldung', trContent: 'quack3' as const },
    { type: 'sticky' as const, tag: '#GreenLiving', bg: '#F0FDF4', germanWord: 'Mülltrennung', trContent: 'quack4' as const, rotate: '-1deg' },
    { type: 'sticky' as const, tag: '#TravelHack', bg: '#FFF1F2', germanWord: 'Bahncard', trContent: 'quack5' as const, rotate: '2deg' },
];

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
};
export const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

// ── GERMAN FLAG DUCK SVG v2 (ink-style, hand-drawn, warm flag palette) ───
export const GermanFlagDuckSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
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

// ── DUCK FOOTPRINT WATERMARK SVG ──────────────────────────────────────────
export const FootprintSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
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
export const MentorOrb: React.FC<{ duck: typeof ALPHA_DUCKS[0] }> = ({ duck }) => {
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
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 z-30 rounded-3xl p-5"
                        style={{
                            background: 'rgba(255,255,255,0.94)',
                            backdropFilter: FROST_BLUR,
                            WebkitBackdropFilter: FROST_BLUR,
                            border: `${FROST_STROKE} solid rgba(250,204,21,0.38)`,
                            boxShadow: `0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)`,
                        }}>
                        <div className="flex items-center justify-between mb-2.5">
                            <p className="text-[13px] font-bold leading-tight" style={{ color: '#0a2463' }}>
                                {duck.name}
                            </p>
                            <a
                                href={duck.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 ml-2 transition-colors duration-150"
                                style={{ color: '#CBD5E1' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0a2463'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#CBD5E1'; }}
                                aria-label={`${duck.name} on LinkedIn`}
                            >
                                <Linkedin size={14} />
                            </a>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: '#CA8A04' }}>
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


