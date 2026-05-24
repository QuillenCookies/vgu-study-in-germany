import Layout from '../components/Layout';
import LibraryHeroSection from '../components/pages/library/sections/LibraryHeroSection';
import BentoGrid from '../components/pages/library/sections/BentoGrid';
import DocumentsList from '../components/pages/library/sections/DocumentsList';

const LibraryPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white transition-colors relative overflow-hidden font-sans mb-32">

        {/* Soft Organic Mesh Gradient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[140px] pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000" />
        <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-100/40 dark:bg-orange-900/20 blur-[140px] pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000" />

        {/* Main Content Container */}
        <div className="max-w-screen-xl mx-auto px-6 pt-52 pb-24 relative z-10">

          {/* === HERO SECTION & COMMAND SEARCH === */}
          <LibraryHeroSection />

          {/* === BENTO GRID (TOP PATHWAYS) === */}
          <BentoGrid />

          {/* Documents and Resource grid */}
          <DocumentsList />
        </div>
      </div>
    </Layout>
  );
};

export default LibraryPage;