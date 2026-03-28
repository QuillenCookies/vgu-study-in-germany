import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import ContributorsPage from './pages/ContributorsPage';
import LibraryPage from './pages/Library';
import LegalCompassPage from './pages/LegalCompassPage';
import HealthWellnessPage from './pages/HealthWellnessPage';
import CareerPage from './pages/CareerPage';
import AboutUsPage from './pages/AboutUsPage';

import Footer from './components/Footer';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

export default function App() {
  const location = useLocation();

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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
              <Route path="/contributors" element={<ContributorsPage />} />
              <Route path="/community/contributor" element={<ContributorsPage />} />
              <Route path="/explore/library" element={<LibraryPage />} />
              <Route path="/explore/legal" element={<LegalCompassPage />} />
              <Route path="/explore/legal-compass" element={<LegalCompassPage />} />
              <Route path="/explore/health" element={<HealthWellnessPage />} />
              <Route path="/explore/career" element={<CareerPage />} />
              <Route path="/about" element={<AboutUsPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}