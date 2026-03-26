// App.tsx
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UniversitiesPage from './pages/UniversitiesPage';
import TrainPage from './pages/TrainPage';
import EntertainmentPage from './pages/EntertainmentPage';
import FoodPage from './pages/FoodPage';
import HousingPage from './pages/HousingPage';
import CommunityPage from './pages/CommunityPage';
import ToolsPage from './pages/ToolsPage';

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/university" element={<UniversitiesPage />} />
        <Route path="/bahn" element={<TrainPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/housing" element={<HousingPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
    </LanguageProvider>
  );
}