import React from 'react';
import Navbar from '../components/Navbar';
import CommunityHeroSection from '../components/pages/community/sections/ComunityHeroSection';
import FlockFootPrint from '../components/pages/community/sections/FlockFootPrint';
import QuackTalk from '../components/pages/community/sections/QuackTalk';
import AggregatedWisdom from '../components/pages/community/sections/AggregatedWisdom';
import CTA from '../components/pages/community/sections/CTA';
import MiniCTA from '../components/pages/community/sections/MiniCTA';

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1220] font-sans max-w-full overflow-x-hidden">
      <Navbar />
      {/* Navbar spacer — compensates for fixed positioning */}
      <div className="h-[59px]" />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO: "Join the Flock"
      ══════════════════════════════════════════ */}
      <CommunityHeroSection />

      {/* ══════════════════════════════════════════
          SECTION 2 — "Footprints from the Flock"
      ══════════════════════════════════════════ */}
      <FlockFootPrint />

      {/* ══════════════════════════════════════════
          SECTION 3 — "Quack-Talk" Forum (Bento)
      ══════════════════════════════════════════ */}
      <QuackTalk />

      {/* ══════════════════════════════════════════
          SECTION 4 — "Aggregated Wisdom" Dashboard
      ══════════════════════════════════════════ */}
      <AggregatedWisdom />

      {/* ══════════════════════════════════════════
          SECTION 5 — CTA: "From Resident to Pathfinder"
      ══════════════════════════════════════════ */}
      <CTA />

      {/* ══════════════════════════════════════════
          SECTION 6 — Newsletter Mini-CTA
      ══════════════════════════════════════════ */}
      <MiniCTA />

      {/* Footer component moved to App.tsx */}
    </div>
  );
};

export default CommunityPage;
