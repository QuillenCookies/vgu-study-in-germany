import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, TrainFront, Building2, UtensilsCrossed,
  Ticket, Menu, X, ChevronDown
} from 'lucide-react';
import VguIcon from '../assets/navbar_vgu_wide.png';

// DATA CONFIGURATION
const EXPLORE_ITEMS = [
  { icon: <GraduationCap size={16} />, label: 'University', href: '/university', color: 'text-orange-500' },
  { icon: <TrainFront size={16} />, label: 'Bahn', href: '/bahn', color: 'text-green-500' },
  { icon: <Building2 size={16} />, label: 'Housing', href: '/housing', color: 'text-purple-500' },
  { icon: <UtensilsCrossed size={16} />, label: 'Food', href: '/food', color: 'text-red-500' },
  { icon: <Ticket size={16} />, label: 'Entertainment', href: '/entertainment', color: 'text-teal-500' },
];

const MAIN_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Tool', href: '/tool' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

// ── SUB-COMPONENTS ──────────────────────────────────────────────────
const DesktopNavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-4 py-2 text-sm font-semibold transition-all rounded-md ${active
      ? 'text-[#0a2463] bg-blue-50/50 ring-1 ring-[#0a2463]/10'
      : 'text-gray-600 hover:text-[#0a2463] hover:bg-gray-50'
      }`}
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; onClick: () => void; children: React.ReactNode }> = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
  >
    {children}
  </Link>
);

// MAIN COMPONENT
const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);

  // Helper logic
  const isActive = (path: string) => pathname === path;
  const isExploreActive = EXPLORE_ITEMS.some(item => pathname === item.href);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full font-sans">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={VguIcon} className="h-8" alt="VGU Logo" />
          <div className="hidden sm:block h-6 w-[1px] bg-gray-300 mx-1" />
          <span className="text-lg font-bold text-[#0a2463] tracking-tight">Study in Germany</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2">
          {/* Main Links (Trước Explore) */}
          <DesktopNavLink to="/" active={isActive('/')}>Home</DesktopNavLink>

          {/* Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsExploreDropdownOpen(true)}
            onMouseLeave={() => setIsExploreDropdownOpen(false)}
          >
            <button
              aria-expanded={isExploreDropdownOpen}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all rounded-md ${isExploreActive ? 'text-[#0a2463] bg-gray-50' : 'text-gray-600 hover:text-[#0a2463] hover:bg-gray-50'
                }`}
            >
              Explore
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isExploreDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 w-52 bg-white border border-gray-200 shadow-lg rounded-md py-1.5 mt-1 overflow-hidden"
                >
                  {EXPLORE_ITEMS.map(({ icon, label, href, color }) => (
                    <Link
                      key={href}
                      to={href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0a2463] transition-colors"
                    >
                      <span className={color}>{icon}</span>
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Các link còn lại map từ config */}
          {MAIN_NAV_LINKS.filter(link => link.label !== 'Home').map(({ label, href }) => (
            <DesktopNavLink key={href} to={href} active={isActive(href)}>
              {label}
            </DesktopNavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {MAIN_NAV_LINKS.map(({ label, href }) => (
                <React.Fragment key={href}>
                  <MobileNavLink to={href} onClick={() => setIsMobileMenuOpen(false)}>
                    {label}
                  </MobileNavLink>
                  {/* Chèn Explore vào giữa Home và các link khác trên mobile */}
                  {label === 'Home' && (
                    <div className="py-2 px-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explore</span>
                      <div className="mt-2 grid grid-cols-1 gap-1 border-l border-gray-100 ml-1">
                        {EXPLORE_ITEMS.map(item => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-2 px-4 text-sm text-gray-600 hover:text-[#0a2463] hover:bg-gray-50 rounded-md"
                          >
                            <span className={item.color}>{item.icon}</span> {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;