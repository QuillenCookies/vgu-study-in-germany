import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  Home, GraduationCap, TrainFront, Building2, UtensilsCrossed, Ticket, Menu, X
} from 'lucide-react';
import VguIcon from '../assets/navbar_vgu_wide.png';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: 'Home',
    href: '/',
    gradient: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
    iconColor: 'group-hover:text-blue-500',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: 'University',
    href: '/university',
    gradient: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
    iconColor: 'group-hover:text-orange-500',
  },
  {
    icon: <TrainFront className="h-5 w-5" />,
    label: 'Bahn',
    href: '/bahn',
    gradient: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
    iconColor: 'group-hover:text-green-500',
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    label: 'Housing',
    href: '/housing',
    gradient: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)',
    iconColor: 'group-hover:text-purple-500',
  },
  {
    icon: <UtensilsCrossed className="h-5 w-5" />,
    label: 'Food',
    href: '/food',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
    iconColor: 'group-hover:text-red-500',
  },
  {
    icon: <Ticket className="h-5 w-5" />,
    label: 'Entertainment',
    href: '/entertainment',
    gradient: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)',
    iconColor: 'group-hover:text-teal-500',
  },
];

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};
const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};
const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
};
const sharedTransition = { type: 'spring' as const, stiffness: 100, damping: 20, duration: 0.5 };

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Top logo bar (always visible) ───────────────────────────── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 w-full">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={VguIcon} className="h-10" alt="VGU Logo" />
            <span className="text-xl font-bold text-[#0a2463] whitespace-nowrap">
              Study in Germany
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop plain links (fallback for non-animated) */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors pb-1 ${location.pathname === item.href
                  ? 'text-[#0a2463] border-b-2 border-[#f97316]'
                  : 'text-gray-600 hover:text-[#0a2463]'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.href
                  ? 'bg-[#0a2463]/10 text-[#0a2463]'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Animated floating bottom nav (desktop md+) ───────────────── */}
      <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          className="px-4 py-3 rounded-3xl bg-white/90 backdrop-blur-lg border border-gray-200/80 shadow-xl"
          initial="initial"
          whileHover="hover"
        >
          <ul className="flex items-center justify-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.li key={item.label} className="relative">
                  <motion.div
                    className="block rounded-2xl overflow-visible group relative"
                    style={{ perspective: '600px' }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                      variants={glowVariants}
                      style={{ background: item.gradient, opacity: 0 }}
                    />
                    {/* Front */}
                    <motion.div
                      className="relative z-10"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
                    >
                      <Link
                        to={item.href}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl text-xs transition-colors ${isActive
                          ? 'text-[#0a2463] font-semibold'
                          : 'text-gray-600 group-hover:text-gray-900'
                          } ${item.iconColor}`}
                      >
                        <span className={`transition-colors duration-300 ${item.iconColor}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#f97316]" />
                        )}
                      </Link>
                    </motion.div>
                    {/* Back (flip face) */}
                    <motion.div
                      className="absolute inset-0 z-10"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center top',
                        transform: 'rotateX(90deg)',
                      }}
                    >
                      <Link
                        to={item.href}
                        className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl text-xs transition-colors ${item.iconColor}`}
                      >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;