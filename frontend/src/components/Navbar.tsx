import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    label: 'Education',
    subLabel: 'University · Enrollment · Exams',
    href: '/university',
    accent: '#f97316',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.16) 0%, transparent 70%)',
  },
  {
    icon: <TrainFront size={16} />,
    label: 'Transportation',
    subLabel: 'DB Bahn · Semester Ticket',
    href: '/bahn',
    accent: '#22c55e',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.16) 0%, transparent 70%)',
  },
  {
    icon: <Building2 size={16} />,
    label: 'Housing',
    subLabel: 'Dorms · WG · Anmeldung',
    href: '/housing',
    accent: '#a855f7',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.16) 0%, transparent 70%)',
  },
  {
    icon: <UtensilsCrossed size={16} />,
    label: 'Food',
    subLabel: 'Mensa · Grocery · Cuisine',
    href: '/food',
    accent: '#ef4444',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.16) 0%, transparent 70%)',
  },
  {
    icon: <Ticket size={16} />,
    label: 'Entertainment',
    subLabel: 'Nightlife · Festivals · Sightseeing',
    href: '/entertainment',
    accent: '#14b8a6',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.16) 0%, transparent 70%)',
  },
];

// ── NAV LINKS (excluding Explore) ─────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',      href: '/',                         gradient: 'radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)' },
  { label: 'Tools',     href: '/tools/budget-calculator',  gradient: 'radial-gradient(ellipse, rgba(34,197,94,0.14) 0%, transparent 70%)' },
  { label: 'Community', href: '/community',               gradient: 'radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 70%)' },
  { label: 'About',     href: '/about',                    gradient: 'radial-gradient(ellipse, rgba(20,184,166,0.14) 0%, transparent 70%)' },
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

// ── UTILITY ICON BUTTON ────────────────────────────────────────────────────
const UtilBtn: React.FC<{ onClick?: () => void; title?: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400
      hover:text-[#0a2463] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5
      transition-colors duration-150"
  >
    {children}
  </button>
);

// ── MAIN NAVBAR ─────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'EN' | 'DE'>('EN');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const exploreRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;
  const isExploreActive = EXPLORE_ITEMS.some(item => pathname === item.href);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
              label="Home"
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
                  Explore
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
                        Browse Topics
                      </span>
                      <span className="text-[10px] text-gray-300 dark:text-gray-700">5 sections</span>
                    </div>

                    {/* 2-column grid */}
                    <div className="px-3 pb-3 grid grid-cols-2 gap-1">
                      {EXPLORE_ITEMS.map(({ icon, label, subLabel, href, accent, gradient }) => (
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
                              {label}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5 truncate">
                              {subLabel}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-2.5 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-[11px] text-gray-400 dark:text-gray-600">
                        Practical info for international students in Germany
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools / Community / About */}
            {NAV_LINKS.slice(1).map(({ label, href, gradient }) => (
              <AnimatedNavLink
                key={href}
                to={href}
                label={label}
                active={isActive(href)}
                gradient={gradient}
              />
            ))}
          </nav>

          {/* ── Utilities (right) ── */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">

            {/* Animated search expand */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 168, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onBlur={() => { setSearchOpen(false); setSearchQuery(''); }}
                    placeholder="Search…"
                    className="w-full text-[13px] px-3 py-1.5 rounded-lg border border-gray-200
                      dark:border-gray-700 bg-gray-50 dark:bg-gray-800
                      text-gray-800 dark:text-gray-100 outline-none
                      focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition"
                  />
                </motion.div>
              ) : (
                <motion.div key="search-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <UtilBtn onClick={() => setSearchOpen(true)} title="Search">
                    <Search size={16} />
                  </UtilBtn>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-0.5" />

            {/* Language */}
            <button
              onClick={() => setLang(l => l === 'EN' ? 'DE' : 'EN')}
              title="Switch language"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold
                text-gray-500 dark:text-gray-400
                hover:text-[#0a2463] dark:hover:text-blue-400
                hover:bg-gray-100 dark:hover:bg-white/5
                transition-colors duration-150 leading-none"
            >
              <Globe size={13} />
              {lang}
            </button>

            {/* Theme toggle */}
            <UtilBtn onClick={() => setIsDark(d => !d)} title={isDark ? 'Light mode' : 'Dark mode'}>
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </UtilBtn>
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
                  Explore
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
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {NAV_LINKS.slice(1).map(({ label, href }) => (
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
                  {label}
                </Link>
              ))}

              {/* Mobile utilities */}
              <div className="flex items-center gap-2 pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setLang(l => l === 'EN' ? 'DE' : 'EN')}
                  className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold text-gray-500
                    border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <Globe size={13} /> {lang}
                </button>
                <button
                  onClick={() => setIsDark(d => !d)}
                  className="p-1.5 text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 transition-colors"
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
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