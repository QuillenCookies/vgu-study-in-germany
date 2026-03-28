import React from 'react';
import Layout from '../components/Layout';
import TrainHeroSection from '../components/pages/train/TrainHeroSection';
import CommuteExplorer from '../components/pages/train/CommuteExplorer';
import JourneyCalculator from '../components/pages/train/JourneyCalculator';
import TransitKnowledgeBase from '../components/pages/train/TransitKnowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';

const TrainPage: React.FC = () => {
  const { tr } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <TrainHeroSection />

      {/* Feature D: Housing & Commute Explorer */}
      <CommuteExplorer />

      {/* Feature C: Budgeting & Journey Pricing */}
      <JourneyCalculator />

      {/* Feature A & B: The Crash Course */}
      <TransitKnowledgeBase />

    </Layout>
  );
};

export default TrainPage;