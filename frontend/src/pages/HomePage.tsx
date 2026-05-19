import React from 'react';

import { CREAM } from '../components/pages/home/ui/design_tokens';
import HeroSection from '../components/pages/home/sections/HeroSection';
import HeroTransitionSection from '../components/pages/home/sections/HeroTransitionSection'
import JourneyMapSection from '../components/pages/home/sections/JourneyMapSection';
import BentoMapSection from '../components/pages/home/sections/BentoMapSection';
import BulletinBoardSection from '../components/pages/home/sections/BulletinBoardSection';
import FloatingOrbMentorSection from '../components/pages/home/sections/FloatingOrbMentorSection';
import NestSection from '../components/pages/home/sections/NestSection';

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  return (
    <main className="w-full font-sans" style={{ backgroundColor: CREAM }}>
      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  (dark night, unchanged)
      ══════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════
          TRANSITION ZONE — Hero → Why Die Ente
          Scroll-reveal chapter break
      ══════════════════════════════════════════ */}
      <HeroTransitionSection />

      {/* ══════════════════════════════════════════
          SECTION 2 — THE QUACK PHILOSOPHY
          Book / editorial spread · open layout · 7:3 · dark plate
      ══════════════════════════════════════════ */}
      <JourneyMapSection />

      {/* ══════════════════════════════════════════
          SECTION 3 — THE MAP (Bento Grid Journey)
          1200px container · gap-8 · grid-auto-rows equal height
      ══════════════════════════════════════════ */}
      <BentoMapSection />

      {/* ══════════════════════════════════════════
          SECTION 4 — DAILY QUACKS (Bulletin Board)
          3-col centred grid · max-width 380px cards · gravity-centred rotations
      ══════════════════════════════════════════ */}
      <BulletinBoardSection />

      {/* ══════════════════════════════════════════
          SECTION 5 — THE MENTORS (Floating Orbs)
          White frost matrix · 1200px container · 1.5px border
      ══════════════════════════════════════════ */}
      <FloatingOrbMentorSection />

      {/* ══════════════════════════════════════════
          SECTION 6 — THE NEST (Footer CTA)
          Off-white → muted sky-blue frost gradient
          Polished gold CTA with frosted glass bezel
      ══════════════════════════════════════════ */}
      <NestSection />
    </main >
  );
};

export default HomePage;
