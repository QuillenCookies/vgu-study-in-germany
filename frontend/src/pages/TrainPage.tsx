import React from 'react';
import Layout from '../components/Layout';
import TrainHeroSection from '../components/pages/train/TrainHeroSection';
import JourneyCalculator from '../components/pages/train/JourneyCalculator';
import TransitKnowledgeBase from '../components/pages/train/TransitKnowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';

const TrainPage: React.FC = () => {
  const { tr } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <TrainHeroSection />

      {/* Feature A: Budgeting & Journey Pricing */}
      <JourneyCalculator />

      {/* Feature B: The Crash Course */}
      <TransitKnowledgeBase />

    </Layout>
  );
};

export default TrainPage;