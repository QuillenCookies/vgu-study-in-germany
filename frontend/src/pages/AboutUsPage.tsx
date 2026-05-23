import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AboutUsHeroSection from '../components/pages/about_us/sections/AboutUsHeroSection';
import Stats from '../components/pages/about_us/sections/Stats';
import Mission from '../components/pages/about_us/sections/Mission';
import OurValue from '../components/pages/about_us/sections/OurValue';
import CTA from '../components/pages/about_us/sections/CTA';

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
const AboutUsPage: React.FC = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-gray-950 font-sans w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative z-10 w-full">
          <Navbar />
          {/* Navbar spacer — compensates for fixed positioning */}
          <div className="h-[59px]" />

          {/* ══════════════════════════════════════════
              SECTION 1 — HERO
          ══════════════════════════════════════════ */}
          <AboutUsHeroSection />

          {/* ══════════════════════════════════════════
              SECTION 2 — STATS (Overlap)
          ══════════════════════════════════════════ */}
          <Stats />

          {/* ══════════════════════════════════════════
              SECTION 3 — MISSION
          ══════════════════════════════════════════ */}
          <Mission />

          {/* ══════════════════════════════════════════
              SECTION 4 — OUR VALUES
          ══════════════════════════════════════════ */}
          <OurValue />

          {/* ══════════════════════════════════════════
              SECTION 5 — CTA
          ══════════════════════════════════════════ */}
          <CTA />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;