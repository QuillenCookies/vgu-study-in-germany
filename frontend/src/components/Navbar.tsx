import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2, UtensilsCrossed,
  Ticket, Menu, X, ChevronDown, Search, Sun, Moon, Globe,
} from 'lucide-react';
import VguIcon from '../assets/navbar_vgu_wide.png';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};
const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};
const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  hover: {
    opacity: 1,
    scale: 1.4,
    transition: {
      opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.35, type: 'spring', stiffness: 260, damping: 22 },
    },
  },
};
const sharedTransition = {
  type: 'spring' as const,
  stiffness: 110,
  damping: 22,
};

// ── EXPLORE ITEMS ──────────────────────────────────────────────────────────
const EXPLORE_ITEMS = [
  {
    icon: <GraduationCap size={16} />,
    trKey: 'education' as const,
    trSubKey: 'eduSub' as const,
    href: '/university',
    accent: '#f97316',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.16) 0%, transparent 70%)',
  },
  {
    icon: <TrainFront size={16} />,
    trKey: 'transport' as const,
    trSubKey: 'transSub' as const,
    href: '/bahn',
    accent: '#22c55e',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.16) 0%, transparent 70%)',
  },
  {
    icon: <Building2 size={16} />,
    trKey: 'housing' as const,
    trSubKey: 'housingSub' as const,
    href: '/housing',
    accent: '#a855f7',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.16) 0%, transparent 70%)',
  },
  {
    icon: <UtensilsCrossed size={16} />,
    trKey: 'food' as const,
    trSubKey: 'foodSub' as const,
    href: '/food',
    accent: '#ef4444',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.16) 0%, transparent 70%)',
  },
  {
    icon: <Ticket size={16} />,
    trKey: 'entertainment' as const,
    trSubKey: 'entSub' as const,
    href: '/entertainment',
    accent: '#14b8a6',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.16) 0%, transparent 70%)',
  },
];

const LANG_OPTIONS = [
  { code: 'EN' as const, label: 'English',     flag: '🇬🇧' },
  { code: 'DE' as const, label: 'Deutsch',     flag: '🇩🇪' },
  { code: 'VN' as const, label: 'Tiếng Việt', flag: '🇻🇳' },
];

// ── NAV LINKS (excluding Explore) ─────────────────────────────────────────
const NAV_LINKS = [
  { trKey: 'home' as const,      href: '/',          gradient: 'radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)' },
  { trKey: 'tools' as const,     href: '/tools',     gradient: 'radial-gradient(ellipse, rgba(34,197,94,0.14) 0%, transparent 70%)' },
  { trKey: 'community' as const, href: '/community', gradient: 'radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 70%)' },
  { trKey: 'about' as const,     href: '/about',     gradient: 'radial-gradient(ellipse, rgba(20,184,166,0.14) 0%, transparent 70%)' },
];

// ── ANIMATED FLIP NAV LINK ─────────────────────────────────────────────────
interface AnimatedNavLinkProps {
  to: string;
  label: string;
  gradient: string;
  active?: boolean;
  onClick?: () => void;
}

const AnimatedNavLink: React.FC<AnimatedNavLinkProps> = ({ to, label, gradient, active, onClick }) => (
  <motion.div
    className="relative"
    style={{ perspective: '600px' }}
    whileHover="hover"
    initial="initial"
  >
    {/* Contained glow */}
    <motion.div
      className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
      variants={glowVariants}
      style={{ background: gradient, opacity: 0 }}
    />
    {/* Front */}
    <motion.div
      variants={itemVariants}
      transition={sharedTransition}
      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
      className="relative z-10"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`relative block px-4 py-2 text-[13.5px] font-medium rounded-lg transition-colors leading-none ${
          active
            ? 'text-[#0a2463] font-semibold'
            : 'text-gray-600 hover:text-[#0a2463]'
        }`}
      >
        {label}
        {/* Underline indicator — only decoration for active state, no background */}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#0a2463]/60"
          />
        )}
      </Link>
    </motion.div>
    {/* Back */}
    <motion.div
      variants={backVariants}
      transition={sharedTransition}
      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top', transform: 'rotateX(90deg)' }}
      className="absolute inset-0 z-10"
    >
      <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-2 text-[13.5px] font-semibold rounded-lg text-[#0a2463] leading-none"
      >
        {label}
      </Link>
    </motion.div>
  </motion.div>
);

// ── MAIN NAVBAR ─────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { lang, setLang, tr } = useLanguage();
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isDark, setIsDark]               = useState(false);
  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [langOpen, setLangOpen]           = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const langRef    = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLInputElement>(null);

  const isActive        = (path: string) => pathname === path;
  const isExploreActive = EXPLORE_ITEMS.some(item => pathname === item.href);
  const activeLang      = LANG_OPTIONS.find(l => l.code === lang)!;

  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); }, [isDark]);

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
    <header className="sticky top-0 z-50 w-full font-sans">

      {/* Top accent strip */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

      <div className="bg-white/96 dark:bg-gray-950/96 backdrop-blur-lg border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm">
        {/*
          3-column balanced layout:
            col-1 (flex-none): Brand — fixed width so nav can be truly centered
            col-2 (flex-1):    Nav links — centered in remaining space
            col-3 (flex-none): Utilities — same visual weight as brand
        */}
        <div className="max-w-screen-xl mx-auto relative flex items-center justify-between px-6 h-14">

          {/* ── Brand (left) ── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={VguIcon}
              className="h-7 flex-shrink-0 transition-opacity group-hover:opacity-80"
              alt="VGU"
            />
            <div className="hidden sm:block h-5 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="hidden sm:block">
              <p className="text-[14px] font-bold text-[#0a2463] dark:text-blue-400 leading-tight tracking-tight">
                Study in Germany
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
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
                style={{ perspective: '600px' }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
                  variants={glowVariants}
                  style={{
                    background: 'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)',
                    opacity: 0,
                  }}
                />
                <motion.button
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
                  aria-expanded={isExploreOpen}
                  className={`relative z-10 flex items-center gap-1 px-4 py-2 text-[13.5px] rounded-lg transition-colors ${
                    isExploreActive
                      ? 'text-[#0a2463] dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 font-medium hover:text-[#0a2463] dark:hover:text-blue-400'
                  }`}
                >
                  {tr('navbar', 'explore')}
                  <motion.span
                    animate={{ rotate: isExploreOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="inline-flex mt-px"
                  >
                    <ChevronDown size={13} className="opacity-60" />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {isExploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.975 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.975 }}
                    transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[460px]
                      bg-white dark:bg-gray-900
                      border border-gray-100 dark:border-gray-800
                      rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                        {tr('navbar', 'explore')}
                      </span>
                      <span className="text-[10px] text-gray-300 dark:text-gray-700">5 {tr('navbar', 'sections')}</span>
                    </div>

                    {/* 2-column grid */}
                    <div className="px-3 pb-3 grid grid-cols-2 gap-1">
                      {EXPLORE_ITEMS.map(({ icon, trKey, trSubKey, href, accent, gradient }) => (
                        <Link
                          key={href}
                          to={href}
                          onClick={() => setIsExploreOpen(false)}
                          className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                            hover:bg-gray-50 dark:hover:bg-gray-800/60
                            transition-colors duration-100"
                        >
                          {/* Left accent bar */}
                          <span
                            className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full
                              opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            style={{ backgroundColor: accent }}
                          />
                          {/* Icon chip */}
                          <span
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
                              transition-transform duration-150 group-hover:scale-110"
                            style={{ background: gradient, color: accent }}
                          >
                            {icon}
                          </span>
                          {/* Text */}
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100
                              group-hover:text-[#0a2463] dark:group-hover:text-blue-300
                              transition-colors leading-tight">
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
              />
            ))}
          </nav>

          {/* ── Utility Cluster (right) ── */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">

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
                    className="w-full text-[12px] px-3 py-1.5 rounded-full bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100
                      outline-none focus:ring-2 focus:ring-[#f97316]/40 focus:border-[#f97316]/50 transition"
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
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400
                    hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5
                    transition-all duration-150"
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
                className={`flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-full text-[12px] font-medium
                  border transition-all duration-200 leading-none select-none
                  ${langOpen
                    ? 'bg-white dark:bg-gray-800 border-black/10 dark:border-white/10 shadow-sm text-gray-900 dark:text-gray-100'
                    : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/8 text-gray-600 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/15'
                  }`}
              >
                <Globe size={13} className="opacity-50 flex-shrink-0" />
                <span className="tracking-wide font-semibold">{activeLang.code}</span>
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-shrink-0 opacity-40"
                >
                  <ChevronDown size={12} />
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: 'top right' }}
                    className="absolute top-[calc(100%+6px)] right-0 w-52
                      bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
                      border border-black/[0.06] dark:border-white/[0.08]
                      rounded-2xl shadow-2xl shadow-black/[0.08] dark:shadow-black/40
                      p-2 z-50"
                  >
                    {/* Header label */}
                    <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                      Language
                    </p>

                    {LANG_OPTIONS.map(opt => {
                      const isActive = lang === opt.code;
                      return (
                        <button
                          key={opt.code}
                          onClick={() => { setLang(opt.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-all duration-150 group ${
                            isActive
                              ? 'bg-orange-50/60 dark:bg-orange-950/20'
                              : 'hover:bg-slate-100/60 dark:hover:bg-white/5'
                          }`}
                        >
                          {/* Flag icon — grayscale → color on hover / active */}
                          <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7
                            rounded-full text-[15px] leading-none
                            ring-1 ring-black/5 dark:ring-white/10
                            transition-all duration-200
                            ${isActive
                              ? 'grayscale-0 shadow-sm'
                              : 'grayscale group-hover:grayscale-0'
                            }`}>
                            {opt.flag}
                          </span>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium leading-tight ${
                              isActive ? 'text-[#f97316]' : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {opt.label}
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-600 leading-tight mt-0.5">
                              {opt.code}
                            </p>
                          </div>

                          {/* Active checkmark */}
                          {isActive && (
                            <svg
                              viewBox="0 0 12 12"
                              className="w-3 h-3 flex-shrink-0 text-[#f97316]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="2,6 5,9 10,3" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400
                hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5
                transition-all duration-150"
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
            className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                  isActive('/') ? 'text-[#0a2463] dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </Link>

              {/* Explore */}
              <div className="py-1">
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1.5">
                  {tr('navbar', 'explore')}
                </p>
                <div className="space-y-0.5 pl-2 border-l-2 border-gray-100 dark:border-gray-800 ml-2">
                  {EXPLORE_ITEMS.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'text-[#0a2463] dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/30'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span style={{ color: item.accent }}>{item.icon}</span>
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
                  className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                    isActive(href)
                      ? 'text-[#0a2463] dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
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
                      className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 border ${
                        lang === opt.code
                          ? 'bg-[#f97316]/10 border-[#f97316]/30 text-[#f97316]'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-[#f97316]/40'
                      }`}
                    >
                      <span className="text-xl leading-none">{opt.flag}</span>
                      <span className="tracking-wide">{opt.code}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsDark(d => !d)}
                  className="flex items-center justify-center gap-2 py-2.5 w-full text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#f97316]/50 transition-colors"
                >
                  {isDark ? <><Sun size={15} className="text-amber-500" /> Light Mode</> : <><Moon size={15} className="text-indigo-500" /> Dark Mode</>}
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