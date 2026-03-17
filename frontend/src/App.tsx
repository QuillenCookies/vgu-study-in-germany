// App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import UniversityPage from './pages/UniversityPage';
import TrainsPage from './pages/TrainsPage';
import EntertainmentPage from './pages/EntertainmentPage';
import FoodPage from './pages/FoodPage';
import HousingPage from './pages/HousingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Hero />
        </Layout>
      } />
      <Route path="/university" element={<UniversityPage />} />
      <Route path="/bahn" element={<TrainsPage />} />
      <Route path="/entertainment" element={<EntertainmentPage />} />
      <Route path="/food" element={<FoodPage />} />
      <Route path="/housing" element={<HousingPage />} />
    </Routes>
  );
}