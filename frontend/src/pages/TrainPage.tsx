import React from 'react';
import Layout from '../components/Layout';
import TrainHeroSection from '../components/pages/train/sections/TrainHeroSection';
import TransitOverview from '../components/pages/train/sections/TransitOverview';
import JourneyCalculator from '../components/pages/train/sections/JourneyCalculator';
import TransitKnowledgeBase from '../components/pages/train/sections/TransitKnowledgeBase';
import TypeOfTrain from '../components/pages/train/sections/TypeOfTrain';
import TicketPrice from '../components/pages/train/sections/TicketPrice';
import DelayCheck from '../components/pages/train/sections/DelayCheck';

const TrainPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <TrainHeroSection />

      {/* Transit Overview */}
      <TransitOverview />

      {/* German Transit Types */}
      <TypeOfTrain />

      {/* Ticket Guide & Semesterticket */}
      <TicketPrice />

      {/* The Crash Course (knowledge base) */}
      <TransitKnowledgeBase />

      {/* Budgeting & Journey Pricing */}
      <JourneyCalculator />

      {/* Real-Time Delay & Station Board */}
      <DelayCheck />
    </Layout>
  );
};

export default TrainPage;