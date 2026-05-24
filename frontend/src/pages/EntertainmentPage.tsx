import React from 'react';
import Navbar from '../components/Navbar';
import EntertainmentHeroSection from '../components/pages/entertainment/sections/EntertainmentHeroSection';
import Venues from '../components/pages/entertainment/sections/Venues';
import Events from '../components/pages/entertainment/sections/Events';
import NightlifeTips from '../components/pages/entertainment/sections/NightlifeTips';


// ─── Component ─────────────────────────────────────────────────────────────

const EntertainmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1220]">
      <Navbar />
      {/* Navbar spacer — compensates for fixed positioning */}
      <div className="h-[59px]" />

      {/* Hero Section */}
      <EntertainmentHeroSection />

      {/* Venues Section */}
      <Venues />

      {/* Events Section */}
      <Events />

      {/* Nightlife Tips */}
      <NightlifeTips />

      {/* Footer component moved to App.tsx */}
    </div>
  );
};

export default EntertainmentPage;
