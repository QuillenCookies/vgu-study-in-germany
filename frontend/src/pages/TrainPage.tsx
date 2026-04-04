import React from 'react';
import Layout from '../components/Layout';
import TrainHeroSection from '../components/pages/train/TrainHeroSection';
import JourneyCalculator from '../components/pages/train/JourneyCalculator';
import TransitKnowledgeBase from '../components/pages/train/TransitKnowledgeBase';
import TypeOfTrain from '../components/pages/train/sections/TypeOfTrain';
import TicketPrice from '../components/pages/train/sections/TicketPrice';
import DelayCheck from '../components/pages/train/sections/DelayCheck';

const TrainPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <TrainHeroSection />

      {/* Feature A: Budgeting & Journey Pricing */}
      <JourneyCalculator />

      {/* Feature B: German Transit Types */}
      <TypeOfTrain />

      {/* Feature C: Ticket Guide & Semesterticket */}
      <TicketPrice />

      {/* Feature D: Real-Time Delay & Station Board */}
      <DelayCheck />

      {/* Feature E: The Crash Course (knowledge base) */}
      <TransitKnowledgeBase />
    </Layout>
  );
};

export default TrainPage;