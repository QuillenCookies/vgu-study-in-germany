import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { LegalCompassProvider } from '../contexts/LegalCompassContext';
import SubtleBackground from '../components/pages/legal_compass/ui/SubtleBackground';
import BackButton from '../components/pages/legal_compass/ui/BackButton';
import LegalCompassHeroSection from '../components/pages/legal_compass/sections/LegalCompassHeroSection';
import CatogoryTabs from '../components/pages/legal_compass/sections/CatogoryTabs';
import LegalCompassArticles from '../components/pages/legal_compass/sections/LegalCompassArticles';

/* ─── Main Page Component ────────────────────────────────────── */
const LegalCompassPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col relative font-sans" style={{ background: '#F8F9FB' }}>
      <Navbar transparent={false} />

      {/* Subtle Background */}
      <SubtleBackground />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back Button */}
        <BackButton />

        <LegalCompassProvider>
          {/* ── HERO SECTION ── */}
          <LegalCompassHeroSection />

          {/* ── CATEGORY TABS ── */}
          <CatogoryTabs />

          {/* ── LEGAL COMPASS ARTICLES ── */}
          <LegalCompassArticles />
        </LegalCompassProvider>
      </main>
    </div>
  );
};

export default LegalCompassPage;