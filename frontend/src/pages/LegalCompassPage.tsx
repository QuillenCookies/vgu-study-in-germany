import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, Search, Home, Briefcase, ShieldCheck, FileText, ChevronRight, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/translations';
import Navbar from '../components/Navbar';
import TenantRights from '../components/legal/TenantRights';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 }
  }
};

const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

const LegalCompassPage: React.FC = () => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const cards = [
    {
      id: 'tenant',
      title: t('legalCompass', 'card1Title', lang),
      description: t('legalCompass', 'card1Scope', lang),
      icon: <Home size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagHighPriority', lang),
      tagClass: '',
    },
    {
      id: 'employment',
      title: t('legalCompass', 'card2Title', lang),
      description: t('legalCompass', 'card2Scope', lang),
      icon: <Briefcase size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagEssential', lang),
      tagClass: '',
    },
    {
      id: 'insurance',
      title: t('legalCompass', 'card3Title', lang),
      description: t('legalCompass', 'card3Scope', lang),
      icon: <ShieldCheck size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagMustKnow', lang),
      tagClass: '',
    },
    {
      id: 'bureaucracy',
      title: t('legalCompass', 'card4Title', lang),
      description: t('legalCompass', 'card4Scope', lang),
      icon: <FileText size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagPopular', lang),
      tagClass: '',
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#0B1220] relative font-sans">
      
      {/* Navbar Integration */}
      <Navbar transparent={false} />

      {/* High-End Background & Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[1200px] h-[1200px] -translate-x-1/4 -translate-y-1/4"
          style={{ background: 'radial-gradient(circle at top left, rgba(26,43,76,0.05), transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[1200px] h-[1200px] translate-x-1/4 translate-y-1/4"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(255,204,0,0.03), transparent 60%)' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMS41IiBjeT0iMS41IiByPSIxLjUiIGZpbGw9IiMxQTJCNEMiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] bg-[length:24px_24px]" />
      </div>

      {/* Main Structural Layout */}
      <main className="relative z-10 w-full min-h-screen flex flex-col pt-24 pb-32 px-6">
        
        {/* Minimalist Breadcrumb Back Button */}
        <div className="w-full max-w-6xl mx-auto mb-10">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold tracking-wide text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white bg-white/40 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-md transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-200/50 dark:border-gray-700/50"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform opacity-70" />
              {t('legalCompass', 'backHome', lang)}
            </Link>
          </motion.div>
        </div>

        {/* Centered Hero Section (Max Width 4xl) */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center w-full">
            
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-sm text-[11px] font-bold tracking-widest uppercase mb-8"
              style={{ background: 'rgba(26,43,76,0.08)', borderColor: `rgba(26,43,76,0.15)`, color: MIDNIGHT }}>
              <Shield size={14} strokeWidth={2} style={{ color: AMBER }} />
              {t('legalCompass', 'badge', lang)}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-semibold dark:text-white tracking-tight leading-tight mb-6 w-full"
              style={{ color: MIDNIGHT }}>
              {t('legalCompass', 'title1', lang)}{' '}
              <span style={{ color: AMBER }}>{t('legalCompass', 'title2', lang)}</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
              {t('legalCompass', 'desc', lang)}
            </p>
          </motion.div>

          {/* Centered Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-2xl mx-auto mt-10 z-20"
          >
            <div className="relative group mx-auto flex items-center bg-white dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 px-6"
              style={{ '--tw-ring-color': `${AMBER}40` } as React.CSSProperties}>
              <Search size={20} strokeWidth={1.75} className="flex-shrink-0" style={{ color: MIDNIGHT }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('legalCompass', 'searchPlaceholder', lang)}
                className="block w-full py-5 bg-transparent text-[15px] font-medium text-slate-800 dark:text-gray-200 placeholder-slate-400 focus:outline-none text-center"
              />
              <div className="w-[20px] flex-shrink-0 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Professional Bento Grid (The Guardian Look) */}
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 justify-center"
          >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              className={`group flex flex-col items-start justify-between bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-lg p-10 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-amber-300/50 transition-all duration-300 transform hover:-translate-y-1 ${card.colSpan} relative overflow-hidden`}
            >
              {/* Amber top accent on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: AMBER }} />

              <div className="relative z-10 w-full">
                {/* Icon & Tag */}
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'rgba(26,43,76,0.06)' }}>
                    {card.icon}
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-sm"
                    style={{ background: `${AMBER}15`, color: MIDNIGHT, borderColor: `${AMBER}40` }}>
                    {card.tag}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-[20px] font-semibold dark:text-white mb-3 tracking-tight transition-colors duration-300"
                  style={{ color: MIDNIGHT }}>
                  {card.title}
                </h3>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-sm" style={{ lineHeight: 1.6 }}>
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto relative z-10">
                <button className="flex items-center gap-2 text-[14px] font-semibold group-hover:translate-x-2 transition-transform duration-300"
                  style={{ color: MIDNIGHT }}>
                  {t('legalCompass', 'btnLearn', lang)} <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tenant Rights Detail Component */}
        <div className="mt-12 w-full">
          <TenantRights />
        </div>

        </div>
      </main>
    </div>
  );
};

export default LegalCompassPage;
