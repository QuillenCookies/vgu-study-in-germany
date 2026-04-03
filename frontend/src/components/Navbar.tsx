import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2, UtensilsCrossed,
  Ticket, BookOpen, Menu, X, ChevronDown, Search, Sun, Moon, Globe, CheckCircle, Gavel, HeartPulse, Rocket, Coins
} from 'lucide-react';
import Logo from '../assets/logo.png';

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

// ── ANIMATION VARIANTS (Minimalist European) ──────────────────────────────
// Snappy spring — feels responsive but buttery
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

// Nav link container: subtle lift on hover
const navLinkVariants: Variants = {
  initial: { y: 0 },
  hover:   { y: -2, transition: springTransition },
};

// Amber underline: expands from center
const underlineVariants: Variants = {
  initial: { scaleX: 0, opacity: 0 },
  hover:   { scaleX: 1, opacity: 1, transition: springTransition },
};

// Mega menu: clean slide-down
const megaMenuVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: 6, transition: { duration: 0.13, ease: [0.4, 0, 1, 1]   } },
};

// ── EXPLORE ITEMS ──────────────────────────────────────────────────────────
const EXPLORE_ITEMS = [
  {
    icon: <GraduationCap size={16} strokeWidth={1.75} />,
    trKey: 'education' as const,
    trSubKey: 'eduSub' as const,
    href: '/university',
  },
  {
    icon: <TrainFront size={16} strokeWidth={1.75} />,
    trKey: 'transport' as const,
    trSubKey: 'transSub' as const,
    href: '/bahn',
  },
  {
    icon: <Building2 size={16} strokeWidth={1.75} />,
    trKey: 'housing' as const,
    trSubKey: 'housingSub' as const,
    href: '/housing',
  },
  {
    icon: <UtensilsCrossed size={16} strokeWidth={1.75} />,
    trKey: 'food' as const,
    trSubKey: 'foodSub' as const,
    href: '/food',
  },
  {
    icon: <Ticket size={16} strokeWidth={1.75} />,
    trKey: 'entertainment' as const,
    trSubKey: 'entSub' as const,
    href: '/entertainment',
  },
  {
    icon: <BookOpen size={16} strokeWidth={1.75} />,
    trKey: 'library' as const,
    trSubKey: 'libSub' as const,
    href: '/explore/library',
  },
  {
    icon: <Gavel size={16} strokeWidth={1.75} />,
    trKey: 'legal' as const,
    trSubKey: 'legalSub' as const,
    href: '/explore/legal',
  },
  {
    icon: <HeartPulse size={16} strokeWidth={1.75} />,
    trKey: 'health' as const,
    trSubKey: 'healthSub' as const,
    href: '/explore/health',
  },
  {
    icon: <Rocket size={16} strokeWidth={1.75} />,
    trKey: 'careerLaunch' as const,
    trSubKey: 'careerSub' as const,
    href: '/explore/career',
  },
  {
    icon: <Coins size={16} strokeWidth={1.75} />,
    trKey: 'salaryFinance' as const,
    trSubKey: 'salarySub' as const,
    href: '/explore/salary',
  },
];

const LANG_OPTIONS = [
  { code: 'EN' as const, label: 'English',    hoverIconClass: 'group-hover:text-amber-500 group-hover:bg-amber-500/10' },
  { code: 'DE' as const, label: 'Deutsch',    hoverIconClass: 'group-hover:text-amber-500 group-hover:bg-amber-500/10' },
  { code: 'VN' as const, label: 'Tiếng Việt', hoverIconClass: 'group-hover:text-amber-500 group-hover:bg-amber-500/10' },
];

// ── NAV LINKS (excluding Explore) ─────────────────────────────────────────
const NAV_LINKS = [
  { trKey: 'home' as const,      href: '/',          gradient: `radial-gradient(ellipse, rgba(26,43,76,0.12) 0%, transparent 70%)` },
  { trKey: 'tools' as const,     href: '/tools',     gradient: `radial-gradient(ellipse, rgba(26,43,76,0.12) 0%, transparent 70%)` },
  { trKey: 'community' as const, href: '/community', gradient: `radial-gradient(ellipse, rgba(26,43,76,0.12) 0%, transparent 70%)` },
  { trKey: 'about' as const,     href: '/about',     gradient: `radial-gradient(ellipse, rgba(26,43,76,0.12) 0%, transparent 70%)` },
];

// ── ANIMATED NAV LINK (Minimalist European) ──────────────────────────────
interface AnimatedNavLinkProps {
  to: string;
  label: string;
  gradient?: string;
  active?: boolean;
  onClick?: () => void;
  transparent?: boolean;
}

const AnimatedNavLink: React.FC<AnimatedNavLinkProps> = ({ to, label, active, onClick, transparent }) => (
  <motion.div
    className="relative"
    whileHover="hover"
    initial="initial"
  >
    <motion.div variants={navLinkVariants}>
      <Link
        to={to}
        onClick={onClick}
        className={`relative block px-4 py-2 text-[13.5px] rounded-lg leading-none transition-colors duration-200 ${
          transparent
            ? active
              ? 'text-white font-semibold'
              : 'text-white/80 font-medium hover:text-white'
            : active
              ? 'font-semibold'
              : 'text-gray-500 dark:text-gray-300 font-medium'
        }`}
        style={!transparent && active ? { color: MIDNIGHT } : undefined}
      >
        {/* Label — darkens to Midnight on hover */}
        <motion.span
          className="relative"
          variants={{
            initial: {},
            hover: { color: transparent ? '#FFCC00' : MIDNIGHT },
          }}
          style={active && !transparent ? { color: MIDNIGHT } : undefined}
        >
          {label}
        </motion.span>

        {/* Active underline — layoutId shared across all links */}
        {active && (
          <motion.span
            layoutId="nav-active-line"
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
            style={{ backgroundColor: transparent ? 'rgba(255,204,0,0.75)' : AMBER }}
          />
        )}

        {/* Hover underline — expands from centre, hidden on active */}
        {!active && (
          <motion.span
            variants={underlineVariants}
            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full origin-center"
            style={{ backgroundColor: transparent ? 'rgba(255,204,0,0.7)' : AMBER }}
          />
        )}
      </Link>
    </motion.div>
  </motion.div>
);

// ── MAIN NAVBAR ─────────────────────────────────────────────────────────────
interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const { pathname } = useLocation();
  const { lang, setLang, tr } = useLanguage();
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const { isDark, toggleTheme }            = useTheme();
  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [langOpen, setLangOpen]           = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const langRef    = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLInputElement>(null);

  const isActive        = (path: string) => pathname === path;
  const isExploreActive = EXPLORE_ITEMS.some(item => pathname === item.href);
  const activeLang      = LANG_OPTIONS.find(l => l.code === lang)!;

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search input when it opens
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  return (
    <header className={`${transparent ? 'absolute top-0 left-0 hover:bg-black/20 hover:backdrop-blur-md transition-all duration-300' : 'sticky top-0'} z-50 w-full font-sans`}>

      {/* Top accent strip — Amber Gold */}
      {!transparent && (
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(to right, ${MIDNIGHT}, ${AMBER}, ${MIDNIGHT})` }} />
      )}

      <div className={`${
        transparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/96 dark:bg-[#0B1220]/96 backdrop-blur-lg border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm'
      }`}>
        {/*
          3-column balanced layout:
            col-1 (flex-none): Brand
            col-2 (flex-1):    Nav links — centered
            col-3 (flex-none): Utilities
        */}
        <div className="max-w-screen-xl mx-auto relative flex items-center justify-between px-6 h-14">

          {/* ── Brand (left) ── */}
          <Link to="/" className="flex items-center gap-4 group flex-shrink-0">
            <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
              <img src={Logo} alt="Study in Germany Logo" className="h-9 w-auto object-contain drop-shadow-sm" />
            </div>
            <div className="hidden sm:flex flex-col">
              <p
                className={`text-[14px] font-semibold leading-tight tracking-tight ${
                  transparent ? 'text-white' : 'dark:text-white'
                }`}
                style={!transparent ? { color: MIDNIGHT } : undefined}
              >
                Study in Germany
              </p>
              <p className={`text-[10px] leading-tight mt-0.5 ${
                transparent ? 'text-white/55' : 'text-gray-400 dark:text-gray-500'
              }`}>
                International Student Guide
              </p>
            </div>
          </Link>

          {/* ── Nav Links — absolute center ── */}
          <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {/* Home */}
            <AnimatedNavLink
              to="/"
              label={tr('navbar', NAV_LINKS[0].trKey)}
              active={isActive('/')}
              gradient={NAV_LINKS[0].gradient}
              transparent={transparent}
            />

            {/* Explore dropdown */}
            <div
              ref={exploreRef}
              className="relative"
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
            >
              <motion.div
                className="relative"
                whileHover="hover"
                initial="initial"
              >
                <motion.div variants={navLinkVariants}>
                  <button
                    aria-expanded={isExploreOpen}
                    className={`relative flex items-center gap-1 px-4 py-2 text-[13.5px] rounded-lg transition-colors duration-200 ${
                      transparent
                        ? isExploreActive ? 'text-[#FFCC00] font-semibold' : 'text-white/80 font-medium'
                        : isExploreActive
                          ? 'font-semibold'
                          : 'text-gray-500 dark:text-gray-300 font-medium'
                    }`}
                    style={!transparent && isExploreActive ? { color: MIDNIGHT } : undefined}
                  >
                    <motion.span
                      variants={{
                        initial: {},
                        hover: { color: transparent ? '#FFCC00' : MIDNIGHT },
                      }}
                      style={isExploreActive && !transparent ? { color: MIDNIGHT } : undefined}
                    >
                      {tr('navbar', 'explore')}
                    </motion.span>
                    <motion.span
                      animate={{ rotate: isExploreOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="inline-flex mt-px"
                    >
                      <ChevronDown size={13} className="opacity-50" />
                    </motion.span>

                    {/* Hover underline for Explore */}
                    {!isExploreActive && (
                      <motion.span
                        variants={underlineVariants}
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full origin-center"
                        style={{ backgroundColor: transparent ? 'rgba(255,204,0,0.7)' : AMBER }}
                      />
                    )}
                    {isExploreActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor: transparent ? 'rgba(255,204,0,0.75)' : AMBER }}
                      />
                    )}
                  </button>
                </motion.div>
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {isExploreOpen && (
                  <motion.div
                    variants={megaMenuVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[900px]
                      bg-white dark:bg-[#0D1F38]
                      border border-gray-100 dark:border-gray-800
                      rounded-xl shadow-lg shadow-black/8 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pt-4 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {tr('navbar', 'explore')}
                      </span>
                      {/* Sections pill badge */}
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: '#F3F4F6', color: MIDNIGHT }}
                      >
                        {EXPLORE_ITEMS.length} {tr('navbar', 'sections')}
                      </span>
                    </div>

                    {/* Horizontal Grid */}
                    <div
                      className="px-5 pb-4 grid gap-x-12 gap-y-2"
                      style={{
                        gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
                        gridAutoFlow: 'column'
                      }}
                    >
                      {EXPLORE_ITEMS.map(({ icon, trKey, trSubKey, href }) => (
                        <Link
                          key={href}
                          to={href}
                          onClick={() => setIsExploreOpen(false)}
                          className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                            hover:bg-gray-50 dark:hover:bg-white/5
                            transition-all duration-300"
                        >
                          {/* Left accent bar — Amber on hover */}
                          <span
                            className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: AMBER }}
                          />
                          {/* Icon chip */}
                          <span
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                            style={{
                              background: `rgba(26,43,76,0.05)`,
                              color: MIDNIGHT,
                            }}
                          >
                            <span
                              className="transition-colors duration-300"
                              style={{ color: 'inherit' }}
                            >
                              {icon}
                            </span>
                          </span>
                          {/* Text */}
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100
                              group-hover:text-[#1A2B4C] dark:group-hover:text-amber-300
                              transition-colors duration-300 leading-tight">
                              {tr('navbar', trKey)}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5 truncate">
                              {tr('navbar', trSubKey)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-2.5 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-[11px] text-gray-400 dark:text-gray-600">
                        {tr('navbar', 'practicalInfo')}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools / Community / About */}
            {NAV_LINKS.slice(1).map(({ trKey, href, gradient }) => (
              <AnimatedNavLink
                key={href}
                to={href}
                label={tr('navbar', trKey)}
                active={isActive(href)}
                gradient={gradient}
                transparent={transparent}
              />
            ))}
          </nav>

          {/* ── Utility Cluster (right) ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">

            {/* Search — spring expand */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 160, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className="overflow-hidden"
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onBlur={() => { setSearchOpen(false); setSearchQuery(''); }}
                    onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                    placeholder="Search…"
                    className="w-full text-[12px] px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100
                      outline-none transition-all duration-300"
                    style={{ '--tw-ring-color': AMBER } as React.CSSProperties}
                  />
                </motion.div>
              ) : (
                <motion.button
                  key="search-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  title="Search"
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                    transparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-500 dark:text-gray-400 hover:dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                  style={!transparent ? { ['--hover-color' as string]: MIDNIGHT } : undefined}
                >
                  <Search size={15} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              {/* Pill trigger */}
              <button
                onClick={() => setLangOpen(v => !v)}
                className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-[12px] font-medium
                  border transition-all duration-300 leading-none select-none backdrop-blur-sm
                  ${transparent
                    ? langOpen ? 'bg-white/20 border-white/30 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                    : langOpen
                      ? 'bg-white/10 dark:bg-white/10 border-black/10 dark:border-white/10 shadow-sm text-gray-900 dark:text-gray-100'
                      : 'bg-white/10 dark:bg-white/5 border-black/5 dark:border-white/8 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/15'
                  }`}
              >
                <Globe size={13} className="opacity-50 flex-shrink-0" />
                <span className="tracking-wide font-semibold">{activeLang.code}</span>
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="flex-shrink-0 opacity-40"
                >
                  <ChevronDown size={12} />
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -2 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top right' }}
                    className="absolute top-[calc(100%+8px)] right-0 w-[240px]
                      bg-white/60 dark:bg-[#0D1F38]/80 backdrop-blur-2xl
                      border border-white/40 dark:border-white/10
                      rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                      p-1.5 z-50 overflow-hidden"
                  >
                    {/* Header label */}
                    <div className="px-3 pt-2.5 pb-2 relative z-10">
                       <p className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-gray-500/80 dark:text-gray-400/80">
                         LANGUAGE
                       </p>
                    </div>

                    <motion.div
                      className="flex flex-col gap-0.5 relative z-10"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } }
                      }}
                    >
                    {LANG_OPTIONS.map(opt => {
                      const isActive = lang === opt.code;
                      return (
                        <motion.button
                          variants={{
                            hidden: { opacity: 0, x: 8 },
                            visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
                          }}
                          key={opt.code}
                          onClick={() => { setLang(opt.code); setLangOpen(false); }}
                          className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-300 group overflow-hidden ${
                            isActive
                              ? 'bg-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                              : 'hover:bg-white/40 dark:hover:bg-white/5'
                          }`}
                        >
                          {/* Active Background Glow — Amber Gold */}
                          {isActive && (
                            <motion.div
                              layoutId="activeLangGlow"
                              className="absolute inset-x-0 inset-y-0 backdrop-blur-sm"
                              style={{
                                borderRadius: '12px',
                                background: 'rgba(255,204,0,0.12)',
                                boxShadow: 'inset 0 0 20px rgba(255,204,0,0.15), 0 4px 16px rgba(255,204,0,0.2)',
                                border: '1px solid rgba(255,204,0,0.3)',
                              }}
                            />
                          )}

                          <div className="relative z-10 flex items-center gap-2.5">
                            {/* Globe icon */}
                            <div className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-amber-500/10'
                                : `text-slate-400 ${opt.hoverIconClass}`
                            }`}
                            style={isActive ? { color: AMBER } : undefined}>
                              <Globe size={14} strokeWidth={2.5} />
                            </div>

                            {/* Text */}
                            <div className="flex items-baseline gap-1.5">
                              <span className={`text-[13px] tracking-[0.01em] transition-colors ${
                                isActive ? 'font-medium' : 'text-[#0F172A] font-normal dark:text-gray-200'
                              }`}
                              style={isActive ? { color: MIDNIGHT } : undefined}>
                                {opt.label}
                              </span>
                              <span className={`text-xs transition-colors ${
                                isActive ? 'text-slate-400 font-medium' : 'text-slate-400/50 font-normal group-hover:text-slate-400/80'
                              }`}>
                                {opt.code}
                              </span>
                            </div>
                          </div>

                          {/* Active checkmark — Amber Gold */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2, delay: 0.05 }}
                              className="relative z-10 flex items-center justify-center ml-auto"
                            >
                              <CheckCircle size={16} strokeWidth={2.5} style={{ color: AMBER, opacity: 0.8 }} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                transparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}>
                    <Sun size={15} />
                  </motion.span>
                ) : (
                  <motion.span key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}>
                    <Moon size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="flex md:hidden">
            <button
              className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400
                hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Panel ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-white dark:bg-[#0B1220] border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                  isActive('/') ? 'font-semibold bg-amber-50 dark:bg-amber-950/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                style={isActive('/') ? { color: MIDNIGHT } : undefined}
              >
                Home
              </Link>

              {/* Explore */}
              <div className="py-1">
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1.5">
                  {tr('navbar', 'explore')}
                </p>
                <div className="space-y-0.5 pl-2 border-l-2 border-amber-200 dark:border-amber-900/40 ml-2">
                  {EXPLORE_ITEMS.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? 'font-semibold bg-amber-50 dark:bg-amber-950/20'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      style={isActive(item.href) ? { color: MIDNIGHT } : undefined}
                    >
                      <span style={{ color: isActive(item.href) ? AMBER : MIDNIGHT }}>{item.icon}</span>
                      <span className="font-medium">{tr('navbar', item.trKey)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {NAV_LINKS.slice(1).map(({ trKey, href }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                    isActive(href)
                      ? 'font-semibold bg-amber-50 dark:bg-amber-950/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  style={isActive(href) ? { color: MIDNIGHT } : undefined}
                >
                  {tr('navbar', trKey)}
                </Link>
              ))}

              {/* Mobile Utilities */}
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                {/* Language picker */}
                <div className="flex gap-1.5">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setIsMobileOpen(false); }}
                      className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 border ${
                        lang === opt.code
                          ? 'border-amber-400/50'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-amber-400/40'
                      }`}
                      style={lang === opt.code ? { background: 'rgba(255,204,0,0.1)', color: MIDNIGHT } : undefined}
                    >
                      <Globe size={18} strokeWidth={2} style={{ color: lang === opt.code ? AMBER : undefined }} className={lang === opt.code ? '' : 'text-gray-400 dark:text-gray-500'} />
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-[11px] tracking-wide">{opt.label}</span>
                        <span className="font-medium text-[9px] text-current opacity-70">({opt.code})</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 py-2.5 w-full text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-amber-400/50 transition-all duration-300"
                >
                  {isDark ? <><Sun size={15} className="text-amber-400" /> Light Mode</> : <><Moon size={15} style={{ color: MIDNIGHT }} /> Dark Mode</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;