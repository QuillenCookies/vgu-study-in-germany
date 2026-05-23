import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Eye, ShieldCheck, ChevronRight,
  Command, Key, Shield, Route, Sparkles
} from 'lucide-react';
import Layout from '../components/Layout';

// ==========================================
// SVGs & METAPHORS
// ==========================================
const Sparkline = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">
    <path d="M2 14C3 12 5 8 7 8C9 8 10 12 12 12C14 12 16 6 18 6C20 6 22 10 24 10C26 10 28 4 30 4C32 4 34 8 36 8C38 8 40 4 42 2C44 0 45 4 46 6" stroke="#FFCC00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- DUMMY DATA ---
type DocFilter = 'All' | 'Admission' | 'Career' | 'Academic' | 'Visa';
const FILTERS: DocFilter[] = ['All', 'Admission', 'Career', 'Academic', 'Visa'];

// Bento Grid Categories Data
const BENTO_CATEGORIES = [
  {
    id: 'templates',
    title: 'Featured Templates',
    desc: 'The most downloaded Lebenslauf and cover letters to kickstart your career in Germany.',
    icon: <Sparkles size={24} />,
    colSpan: 'md:col-span-2 md:row-span-2',
    isLarge: true,
  },
  {
    id: 'admission',
    title: 'Admission',
    desc: 'TUM, RWTH & TU Berlin successful profiles.',
    icon: <Key size={20} className="text-amber-400" />,
    colSpan: 'md:col-span-1',
    isLarge: false,
    color: 'bg-orange-50 border-orange-100',
  },
  {
    id: 'career',
    title: 'Career',
    desc: 'Bewerbung & Interview Path',
    icon: <Route size={20} className="text-blue-500" />,
    colSpan: 'md:col-span-1',
    isLarge: false,
    color: 'bg-blue-50 border-blue-100',
  },
  {
    id: 'academic',
    title: 'Academic',
    desc: 'Data Science & Thesis Shield',
    icon: <Shield size={20} className="text-emerald-500" />,
    colSpan: 'md:col-span-2',
    isLarge: false,
    color: 'bg-emerald-50 border-emerald-100',
  },
];

const DOCUMENTS = [
  {
    id: 1,
    title: 'TUM Data Engineering Master Motivation Letter',
    category: 'Admission',
    verified: true,
    fileType: 'PDF',
    size: '1.2 MB',
    stats: { read: '5 min read', views: '1.2k views', desc: '400 downloads' }
  },
  {
    id: 2,
    title: 'German Style Lebenslauf Template (Tech)',
    category: 'Career',
    verified: true,
    fileType: 'Word',
    size: '45 KB',
    stats: { read: '3 min read', views: '3.4k views', desc: '1.2k downloads' }
  },
  {
    id: 3,
    title: 'Machine Learning Flight Delay Prediction',
    category: 'Academic',
    verified: false,
    fileType: 'PDF',
    size: '3.4 MB',
    stats: { read: '12 min read', views: '800 views', desc: '120 downloads' }
  },
  {
    id: 4,
    title: 'TestDaF TDN 4/5 Complete Cheatsheet',
    category: 'Academic',
    verified: true,
    fileType: 'PDF',
    size: '800 KB',
    stats: { read: '8 min read', views: '4.1k views', desc: '2k downloads' }
  },
  {
    id: 5,
    title: 'Student Visa Blocked Account Proof Template',
    category: 'Visa',
    verified: true,
    fileType: 'PDF',
    size: '120 KB',
    stats: { read: '2 min read', views: '1.5k views', desc: '600 downloads' }
  },
  {
    id: 6,
    title: 'RWTH Aachen Mechanical Eng. Essay',
    category: 'Admission',
    verified: false,
    fileType: 'PDF',
    size: '2.1 MB',
    stats: { read: '10 min read', views: '500 views', desc: '80 downloads' }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 250, damping: 24 } }
};

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<DocFilter>('All');

  const filteredDocs = DOCUMENTS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-white transition-colors relative overflow-hidden font-sans mb-32">

        {/* Soft Organic Mesh Gradient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[140px] pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000" />
        <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-100/40 dark:bg-orange-900/20 blur-[140px] pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000" />

        {/* Main Content Container */}
        <div className="max-w-screen-xl mx-auto px-6 pt-52 pb-24 relative z-10">

          {/* === HERO & COMMAND SEARCH === */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-28 animate-fade-in-up">

            <motion.h1
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[4rem] font-bold text-[#1A2B4C] dark:text-white tracking-tighter leading-tight mb-6"
            >
              The Duck’s <span className="text-[#FFCC00]">Archive</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-500 dark:text-slate-400 text-lg md:text-xl tracking-tight mb-14 max-w-xl"
            >
              A curated intelligence database for the VGU diaspora.
            </motion.p>

            {/* Command-Palette Search */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-2xl relative group"
            >
              <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)] dark:shadow-none pointer-events-none" />
              <div className="relative flex items-center px-5 py-4 border border-slate-200/80 dark:border-slate-700 rounded-3xl bg-white/60 dark:bg-slate-900/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] focus-within:ring-4 focus-within:ring-[#1A2B4C]/5 focus-within:border-[#1A2B4C]/20 transition-all">
                <Search size={22} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search architecture templates, TUM essays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-[#1A2B4C] dark:text-slate-100 text-[16px] placeholder-slate-400 font-medium"
                />
                <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400 shadow-sm">
                  <Command size={14} /> K
                </div>
              </div>
            </motion.div>

            {/* Hint Hashtags */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-5 mt-8 text-[14px] font-semibold text-slate-400"
            >
              <button onClick={() => setSearchQuery('TUM')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#TUM</button>
              <button onClick={() => setSearchQuery('Motivation')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#MotivationLetter</button>
              <button onClick={() => setSearchQuery('RWTH')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#RWTH</button>
            </motion.div>
          </div>

          {/* === BENTO GRID (TOP PATHWAYS) === */}
          <div className="mb-32">
            <h2 className="text-2xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" /> Resource Pathways
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[180px]">
              {BENTO_CATEGORIES.map((cat) => (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative p-6 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-slate-300 dark:hover:border-slate-700 transition-all group overflow-hidden flex flex-col justify-between ${cat.colSpan}`}
                >
                  {cat.isLarge && (
                    <div className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.03] dark:opacity-10 text-slate-900 pointer-events-none transform translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700 ease-out">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.5 3c-1.38 0-2.5 1.12-2.5 2.5 0 .39.09.76.25 1.08C9.37 7.23 8 8.64 8 10.5c0 1.07.41 2.07 1.12 2.81-.39 1.17-.41 2.45-.63 3.69-.17.98-.94 1.76-1.92 1.95-1.47.28-1.57 2.05-1.57 2.05s1.28.32 2.54.49c1.67.22 3.3.49 5.46.49 4.34 0 7.82-1.96 8.79-4.83.6-1.76.59-4.04-.6-6.19-1.38-2.48-4.22-4.08-6.19-4.73C14.77 5.75 14.86 5.39 14.86 5 14.86 3.62 13.88 3 12.5 3z" />
                      </svg>
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-transparent shadow-sm ${cat.isLarge ? 'bg-[#1A2B4C] text-white dark:bg-white dark:text-[#1A2B4C]' : cat.color}`}>
                      {cat.icon}
                    </div>
                    {cat.isLarge && (
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={18} className="text-slate-400" />
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className={`font-bold text-[#1A2B4C] dark:text-white tracking-tighter ${cat.isLarge ? 'text-3xl mb-3' : 'text-xl mb-2'}`}>
                      {cat.title}
                    </h3>
                    <p className={`font-medium ${cat.isLarge ? 'text-slate-500 max-w-sm text-base leading-relaxed' : 'text-slate-400 text-sm line-clamp-2 leading-relaxed'}`}>
                      {cat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* === RESOURCE GRID === */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <h2 className="text-2xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Documents Library
              </h2>

              {/* Ghost Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`relative px-5 py-2.5 rounded-full text-[14px] font-bold tracking-tight transition-all duration-300 ${isActive
                          ? 'text-white border-transparent'
                          : 'text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="pillIndicator"
                          className="absolute inset-0 bg-[#1A2B4C] dark:bg-slate-800 rounded-full -z-10 shadow-md shadow-black/10"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Documents List */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {filteredDocs.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {filteredDocs.map((doc) => (
                      <motion.div
                        key={doc.id}
                        layout
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Soft Hover Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-50/50 dark:from-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="relative z-10">
                          {/* Metadata Top Row */}
                          <div className="flex items-start justify-between mb-6">
                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A2B4C] dark:text-slate-300">
                              {doc.category === 'Admission' ? <Key size={16} className="text-amber-400" /> : doc.category === 'Career' ? <Route size={16} className="text-blue-500" /> : <Shield size={16} className="text-emerald-500" />}
                              {doc.category}
                            </span>
                            {doc.verified && (
                              <div className="flex items-center gap-1.5 text-[#FFCC00] bg-orange-50/80 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-100/80 dark:border-orange-800/50 shadow-sm">
                                <ShieldCheck size={14} strokeWidth={2.5} />
                                <span className="text-[10px] font-extrabold uppercase tracking-widest">Verified Target</span>
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter leading-snug mb-4 pr-4 group-hover:text-[#FFCC00] transition-colors duration-300">
                            {doc.title}
                          </h3>
                        </div>

                        {/* Bottom Stats & Hover Action */}
                        <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3 text-[12px] font-bold tracking-tight text-slate-400">
                              <span>{doc.stats.read}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                              <span>{doc.stats.views}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Sparkline />
                              <span className="text-[11px] font-semibold text-slate-400">{doc.stats.desc}</span>
                            </div>
                          </div>

                          {/* Quick Preview Hover Button */}
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute right-0 bottom-1 opacity-0 group-hover:opacity-100 group-hover:y-0 flex items-center gap-2 bg-[#1A2B4C] dark:bg-white text-white dark:text-[#1A2B4C] px-4 py-2.5 rounded-xl text-xs font-bold shadow-xl shadow-black/10 transition-all duration-300"
                          >
                            <Eye size={14} strokeWidth={2.5} /> Preview
                          </motion.button>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                      <Search size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A2B4C] dark:text-white mb-3 tracking-tighter">
                      No exact matches found
                    </h3>
                    <p className="text-base font-medium text-slate-500 max-w-sm mb-8 leading-relaxed">
                      Adjust your filters or try a different search term to surface resources.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                      className="px-6 py-3 bg-[#1A2B4C] dark:bg-white text-white dark:text-[#1A2B4C] text-sm font-bold tracking-tight rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-black/10"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LibraryPage;
