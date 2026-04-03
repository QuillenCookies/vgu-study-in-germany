import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2, UtensilsCrossed,
  Ticket, BookOpen, Menu, X, ChevronDown, Search, Sun, Moon,
  Globe, CheckCircle, Gavel, HeartPulse, Rocket, Coins,
} from 'lucide-react';
import Logo from '../assets/logo.png';

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const spring = { type: 'spring' as const, stiffness: 300, damping: 30 };

const megaMenuVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: 6, transition: { duration: 0.12, ease: [0.4, 0, 1, 1] } },
};

// ── STATIC DATA ─────────────────────────────────────────────────────────────
const EXPLORE_ITEMS = [
  { icon: <GraduationCap size={15} strokeWidth={1.75} />, trKey: 'education'    as const, trSubKey: 'eduSub'     as const, href: '/university'    },
  { icon: <TrainFront   size={15} strokeWidth={1.75} />, trKey: 'transport'    as const, trSubKey: 'transSub'   as const, href: '/bahn'           },
  { icon: <Building2    size={15} strokeWidth={1.75} />, trKey: 'housing'      as const, trSubKey: 'housingSub' as const, href: '/housing'        },
  { icon: <UtensilsCrossed size={15} strokeWidth={1.75} />, trKey: 'food'      as const, trSubKey: 'foodSub'   as const, href: '/food'           },
  { icon: <Ticket       size={15} strokeWidth={1.75} />, trKey: 'entertainment'as const, trSubKey: 'entSub'    as const, href: '/entertainment'  },
  { icon: <BookOpen     size={15} strokeWidth={1.75} />, trKey: 'library'      as const, trSubKey: 'libSub'    as const, href: '/explore/library'},
  { icon: <Gavel        size={15} strokeWidth={1.75} />, trKey: 'legal'        as const, trSubKey: 'legalSub'  as const, href: '/explore/legal'  },
  { icon: <HeartPulse   size={15} strokeWidth={1.75} />, trKey: 'health'       as const, trSubKey: 'healthSub' as const, href: '/explore/health' },
  { icon: <Rocket       size={15} strokeWidth={1.75} />, trKey: 'careerLaunch' as const, trSubKey: 'careerSub' as const, href: '/explore/career' },
  { icon: <Coins        size={15} strokeWidth={1.75} />, trKey: 'salaryFinance'as const, trSubKey: 'salarySub' as const, href: '/explore/salary' },
];

const LANG_OPTIONS = [
  { code: 'EN' as const, label: 'English'    },
  { code: 'DE' as const, label: 'Deutsch'    },
  { code: 'VN' as const, label: 'Tiếng Việt' },
];

const NAV_LINKS = [
  { trKey: 'home'      as const, href: '/'          },
  { trKey: 'tools'     as const, href: '/tools'     },
  { trKey: 'community' as const, href: '/community' },
  { trKey: 'about'     as const, href: '/about'     },
];

// ── PILL NAV LINK ───────────────────────────────────────────────────────────
interface NavLinkProps {
  to: string;
  label: string;
  active?: boolean;
  transparent?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, active, transparent, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`
      flex items-center px-3 py-1 rounded-full text-[13px] select-none whitespace-nowrap
      transition-all duration-150
      ${transparent
        ? active
          ? 'bg-white/15 text-white font-semibold'
          : 'text-white/75 font-medium hover:text-white hover:bg-white/10'
        : active
          ? 'bg-[#FFCC00]/10 text-[#FFCC00] font-semibold'
          : 'text-gray-500 dark:text-slate-400 font-medium hover:bg-[#FFCC00]/[0.08] dark:hover:bg-[#FFCC00]/[0.08] hover:text-[#FFCC00] dark:hover:text-[#FFCC00]'
      }
    `}
  >
    {label}
  </Link>
);

// ── MAIN NAVBAR ─────────────────────────────────────────────────────────────
interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const { pathname }              = useLocation();
  const { lang, setLang, tr }     = useLanguage();
  const { isDark, toggleTheme }   = useTheme();
  const [isMobileOpen, setMobile] = useState(false);
  const [exploreOpen, setExplore] = useState(false);
  const [searchOpen, setSearch]   = useState(false);
  const [searchQuery, setQ]       = useState('');
  const [langOpen, setLangOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  const exploreRef    = useRef<HTMLDivElement>(null);
  const langRef       = useRef<HTMLDivElement>(null);
  const searchRef     = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive        = (p: string) => pathname === p;
  const isExploreActive = EXPLORE_ITEMS.some(i => pathname === i.href);
  const activeLang      = LANG_OPTIONS.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // True when the navbar should appear transparent (hero overlay, not yet scrolled)
  const isTransparentTop = transparent && !scrolled;

  const handleExploreEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setExplore(true);
  };
  const handleExploreLeave = () => {
    closeTimerRef.current = setTimeout(() => setExplore(false), 150);
  };

  // Shared pill container style — adjusts when transparent hero is scrolled
  const pillCls = isTransparentTop
    ? 'bg-white/10 border-white/20 backdrop-blur-sm'
    : 'bg-gray-50/80 dark:bg-white/[0.04] border-gray-200/70 dark:border-white/[0.08] backdrop-blur-sm';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans">

      {/* ── Glassmorphism background ── */}
      <div
        className={`
          absolute inset-0 border-b pointer-events-none
          transition-all duration-500 ease-in-out
          ${isTransparentTop
            ? 'bg-transparent border-transparent'
            : scrolled
              ? 'bg-white/70 dark:bg-[#0B1220]/75 backdrop-blur-lg border-gray-200/30 dark:border-white/[0.04] shadow-sm'
              : 'bg-white/95 dark:bg-[#0B1220]/90 backdrop-blur-md border-gray-100/40 dark:border-white/[0.04]'
          }
        `}
      />

      {/* ── Content ── */}
      <div className={`max-w-screen-xl mx-auto flex items-center justify-between px-6 relative transition-all duration-500 ease-in-out ${scrolled ? 'h-14' : 'h-[68px]'}`}>

          {/* ── Brand ── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0 select-none">
            <motion.div whileHover={{ scale: 1.05 }} transition={spring}>
              <img
                src={Logo}
                alt="Study in Germany"
                className={`w-auto object-contain transition-all duration-500 ease-in-out ${scrolled ? 'h-6' : 'h-8'}`}
              />
            </motion.div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className={`text-[13.5px] font-bold tracking-tight transition-colors duration-500 ${isTransparentTop ? 'text-white' : 'text-[#1A2B4C] dark:text-white'}`}>
                Study in Germany
              </span>
              <span className={`text-[9px] mt-0.5 tracking-wider transition-colors duration-500 ${isTransparentTop ? 'text-white/50' : 'text-gray-400 dark:text-slate-500'}`}>
                International Student Guide
              </span>
            </div>
          </Link>

          {/* ── Central Nav — Pill Capsule ── */}
          <nav className={`hidden md:flex items-center rounded-full border absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${scrolled ? 'gap-0 px-1 py-0.5' : 'gap-0.5 px-1.5 py-1'} ${pillCls}`}>

            {/* Home */}
            <NavLink
              to="/"
              label={tr('navbar', 'home')}
              active={isActive('/')}
              transparent={isTransparentTop}
            />

            {/* Explore — mega menu trigger */}
            <div
              ref={exploreRef}
              onMouseEnter={handleExploreEnter}
              onMouseLeave={handleExploreLeave}
            >
              <button
                aria-expanded={exploreOpen}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-[13px]
                  select-none whitespace-nowrap transition-all duration-150
                  ${isTransparentTop
                    ? (isExploreActive || exploreOpen)
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-white/75 font-medium hover:text-white hover:bg-white/10'
                    : (isExploreActive || exploreOpen)
                      ? 'bg-[#FFCC00]/10 text-[#FFCC00] font-semibold'
                      : 'text-gray-500 dark:text-slate-400 font-medium hover:bg-[#FFCC00]/[0.08] dark:hover:bg-[#FFCC00]/[0.08] hover:text-[#FFCC00] dark:hover:text-[#FFCC00]'
                  }
                `}
              >
                <span>{tr('navbar', 'explore')}</span>
                <motion.span
                  animate={{ rotate: exploreOpen ? 180 : 0 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  className="inline-flex opacity-50"
                >
                  <ChevronDown size={12} strokeWidth={2.5} />
                </motion.span>
              </button>
            </div>

            {/* Tools / Community / About */}
            {NAV_LINKS.slice(1).map(({ trKey, href }) => (
              <NavLink
                key={href}
                to={href}
                label={tr('navbar', trKey)}
                active={isActive(href)}
                transparent={isTransparentTop}
              />
            ))}
          </nav>

          {/* ── Mega Menu — anchored to full navbar width ── */}
          <AnimatePresence>
            {exploreOpen && (
              <motion.div
                variants={megaMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onMouseEnter={handleExploreEnter}
                onMouseLeave={handleExploreLeave}
                className="
                  absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-full max-w-[850px]
                  rounded-xl overflow-hidden
                  bg-white dark:bg-[#0D1B33]
                  border border-gray-100 dark:border-white/[0.06]
                  shadow-xl dark:shadow-black/50
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between px-10 pt-4 pb-3 border-b border-gray-100 dark:border-white/[0.05]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-slate-600">
                    {tr('navbar', 'explore')}
                  </span>
                  <span className="
                    inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium
                    border border-gray-200 dark:border-white/10
                    text-gray-500 dark:text-slate-500
                    bg-gray-50 dark:bg-transparent
                  ">
                    {EXPLORE_ITEMS.length} {tr('navbar', 'sections')}
                  </span>
                </div>

                {/* Grid */}
                <div className="px-10 py-5 grid grid-cols-3 gap-x-16 gap-y-1.5">
                  {EXPLORE_ITEMS.map(({ icon, trKey, trSubKey, href }) => (
                    <Link
                      key={href}
                      to={href}
                      onClick={() => setExplore(false)}
                      className="
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                        hover:bg-gray-50 dark:hover:bg-[#1E2D4D]
                        transition-colors duration-150
                      "
                    >
                      <span
                        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ backgroundColor: AMBER }}
                      />
                      <span
                        className="
                          flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md
                          text-[#1A2B4C] dark:text-slate-500
                          bg-gray-100 dark:bg-white/[0.05]
                          group-hover:bg-gray-200 dark:group-hover:text-[#FFCC00] dark:group-hover:bg-[#FFCC00]/10
                          transition-all duration-150
                        "
                      >
                        {icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold leading-tight text-[#1A2B4C] dark:text-slate-300 dark:group-hover:text-white transition-colors duration-150">
                          {tr('navbar', trKey)}
                        </p>
                        <p className="text-[11px] leading-tight mt-0.5 truncate text-gray-400 dark:text-slate-600">
                          {tr('navbar', trSubKey)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-10 py-3 border-t border-gray-100 dark:border-white/[0.05]">
                  <span className="text-[11px] text-gray-400 dark:text-slate-600">
                    {tr('navbar', 'practicalInfo')}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Utility Capsule ── */}
          <div className={`hidden md:flex items-center rounded-full border flex-shrink-0 transition-all duration-500 ease-in-out ${scrolled ? 'gap-0 px-1 py-0.5' : 'gap-0.5 px-1.5 py-1'} ${pillCls}`}>

            {/* Search — icon stays fixed, input expands in-place to its left */}
            <div className="flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    key="search-field"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 190, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="overflow-hidden mr-1.5"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setQ(e.target.value)}
                      onBlur={() => { setSearch(false); setQ(''); }}
                      onKeyDown={e => e.key === 'Escape' && setSearch(false)}
                      placeholder="Search…"
                      className={`
                        block w-[190px] text-[12.5px] px-3 py-1.5 rounded-full outline-none
                        bg-gray-100 dark:bg-white/[0.05]
                        border border-transparent focus:border-[#FFCC00]/50
                        ${isTransparentTop ? 'text-white placeholder-white/40' : 'text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-600'}
                        transition-colors duration-150
                      `}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearch(v => !v); setLangOpen(false); }}
                title="Search"
                className={`
                  flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0
                  transition-all duration-150
                  ${searchOpen
                    ? isTransparentTop
                      ? 'bg-white/15 text-white'
                      : 'bg-white dark:bg-white/[0.1] text-[#1A2B4C] dark:text-white shadow-sm'
                    : isTransparentTop
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.07]'
                  }
                `}
              >
                <Search size={13} strokeWidth={2} />
              </button>
            </div>

            {/* Divider */}
            <span className={`w-px h-4 mx-0.5 flex-shrink-0 ${isTransparentTop ? 'bg-white/20' : 'bg-gray-200 dark:bg-white/[0.08]'}`} />

            {/* Language selector */}
            <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className={`
                    flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[12px] font-semibold
                    transition-all duration-150 select-none whitespace-nowrap
                    ${isTransparentTop
                      ? langOpen
                        ? 'bg-white/15 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      : langOpen
                        ? 'bg-white dark:bg-white/[0.1] text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.07]'
                    }
                  `}
                >
                  <Globe size={12} strokeWidth={2} className="opacity-70" />
                  <span>{activeLang.code}</span>
                  <motion.span
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="opacity-40"
                  >
                    <ChevronDown size={10} strokeWidth={2.5} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: 'top right' }}
                      className="
                        absolute top-[calc(100%+8px)] right-0 w-[210px] z-50
                        bg-white dark:bg-[#16223A]/90 dark:backdrop-blur-xl
                        border border-gray-100 dark:border-white/10
                        rounded-2xl shadow-xl dark:shadow-black/60
                        p-1.5 overflow-hidden
                      "
                    >
                      <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                        Language
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {LANG_OPTIONS.map(opt => {
                          const active = lang === opt.code;
                          return (
                            <button
                              key={opt.code}
                              onClick={() => { setLang(opt.code); setLangOpen(false); }}
                              className={`
                                relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left
                                transition-all duration-150 group
                                ${active
                                  ? 'bg-amber-400/10 dark:bg-white/[0.05]'
                                  : 'hover:bg-gray-50 dark:hover:bg-white/[0.05]'
                                }
                              `}
                            >
                              {/* Amber left accent bar for active item */}
                              {active && (
                                <span className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full bg-[#FFCC00]" />
                              )}
                              <div className="flex items-center gap-2.5">
                                <Globe
                                  size={13}
                                  strokeWidth={2}
                                  className={active
                                    ? 'text-[#FFCC00]'
                                    : 'text-slate-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-white transition-colors duration-150'
                                  }
                                />
                                <div className="flex items-baseline gap-1.5">
                                  <span className={`text-[13px] transition-colors duration-150 ${
                                    active
                                      ? 'font-semibold text-gray-900 dark:text-white'
                                      : 'font-medium text-gray-600 dark:text-slate-200 group-hover:text-gray-900 dark:group-hover:text-white'
                                  }`}>
                                    {opt.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{opt.code}</span>
                                </div>
                              </div>
                              {active && (
                                <CheckCircle size={13} strokeWidth={2.5} className="text-[#FFCC00] opacity-90 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            {/* Theme toggle */}
            <button
                onClick={toggleTheme}
                title={isDark ? 'Light mode' : 'Dark mode'}
                className={`
                  flex items-center justify-center w-7 h-7 rounded-full
                  transition-all duration-150
                  ${isTransparentTop
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-gray-700 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.07]'
                  }
                `}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.span key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                      exit={{    rotate: 90,  opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Sun size={14} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon"
                      initial={{ rotate: 90,  opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                      exit={{    rotate: -90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Moon size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={`flex md:hidden items-center justify-center w-8 h-8 rounded-lg transition-colors ${
              isTransparentTop ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-gray-700 dark:hover:text-white'
            }`}
            onClick={() => setMobile(v => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.14 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.14 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>

      {/* ── Mobile Panel ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-white dark:bg-[#0B1220] border-b border-gray-200 dark:border-white/[0.06] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">

              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobile(false)}
                className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                  isActive('/') ? 'bg-[#FFCC00]/10' : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
                style={isActive('/') ? { color: MIDNIGHT } : undefined}
              >
                {tr('navbar', 'home')}
              </Link>

              {/* Explore group */}
              <div className="pt-1">
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-widest mb-1">
                  {tr('navbar', 'explore')}
                </p>
                <div className="space-y-0.5 pl-2 border-l-2 border-[#FFCC00]/30 ml-2">
                  {EXPLORE_ITEMS.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobile(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                        isActive(item.href) ? '' : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                      style={isActive(item.href) ? { color: MIDNIGHT } : undefined}
                    >
                      <span style={{ color: isActive(item.href) ? AMBER : undefined }} className="dark:text-slate-500">
                        {item.icon}
                      </span>
                      <span className="font-medium">{tr('navbar', item.trKey)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other links */}
              {NAV_LINKS.slice(1).map(({ trKey, href }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobile(false)}
                  className={`block px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                    isActive(href) ? 'bg-[#FFCC00]/10' : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                  style={isActive(href) ? { color: MIDNIGHT } : undefined}
                >
                  {tr('navbar', trKey)}
                </Link>
              ))}

              {/* Mobile utilities */}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-gray-100 dark:border-white/[0.06]">
                <div className="flex gap-1.5">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setMobile(false); }}
                      className={`
                        flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-semibold transition-colors
                        ${lang === opt.code
                          ? 'border-[#FFCC00]/40 text-[#1A2B4C] dark:text-white'
                          : 'border-gray-200 dark:border-white/[0.06] text-slate-500 dark:text-slate-500 hover:border-[#FFCC00]/30'
                        }
                      `}
                      style={lang === opt.code ? { background: 'rgba(255,204,0,0.08)' } : undefined}
                    >
                      <Globe size={16} strokeWidth={2} style={{ color: lang === opt.code ? AMBER : undefined }} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 py-2.5 w-full text-[13px] font-medium text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-white/[0.06] rounded-xl hover:border-[#FFCC00]/40 transition-colors"
                >
                  {isDark
                    ? <><Sun size={14} className="text-amber-400" /> Light Mode</>
                    : <><Moon size={14} /> Dark Mode</>
                  }
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
