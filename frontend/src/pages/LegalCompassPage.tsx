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

const LegalCompassPage: React.FC = () => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cards = [
    {
      id: 'tenant',
      title: t('legalCompass', 'card1Title', lang),
      description: t('legalCompass', 'card1Scope', lang),
      icon: <Home size={28} className="text-emerald-500" />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagHighPriority', lang),
      tagClass: 'text-emerald-700 bg-emerald-50/80 border-emerald-200/50',
      hoverBg: 'bg-emerald-50/60',
    },
    {
      id: 'employment',
      title: t('legalCompass', 'card2Title', lang),
      description: t('legalCompass', 'card2Scope', lang),
      icon: <Briefcase size={28} className="text-[#0F172A]" />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagEssential', lang),
      tagClass: 'text-slate-700 bg-slate-50 border-slate-200/60',
      hoverBg: 'bg-slate-50/50',
    },
    {
      id: 'insurance',
      title: t('legalCompass', 'card3Title', lang),
      description: t('legalCompass', 'card3Scope', lang),
      icon: <ShieldCheck size={28} className="text-emerald-500" />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagMustKnow', lang),
      tagClass: 'text-emerald-700 bg-emerald-50/80 border-emerald-200/50',
      hoverBg: 'bg-emerald-50/60',
    },
    {
      id: 'bureaucracy',
      title: t('legalCompass', 'card4Title', lang),
      description: t('legalCompass', 'card4Scope', lang),
      icon: <FileText size={28} className="text-[#0F172A]" />,
      colSpan: 'md:col-span-2 lg:col-span-1',
      tag: t('legalCompass', 'tagPopular', lang),
      tagClass: 'text-slate-700 bg-slate-50 border-slate-200/60',
      hoverBg: 'bg-slate-50/50',
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 relative font-sans selection:bg-emerald-500/30">
      
      {/* Navbar Integration */}
      <Navbar transparent={false} />

      {/* High-End Background & Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Silk Mesh Gradient */}
        <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.05),transparent_60%)] -translate-x-1/4 -translate-y-1/4 mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.05),transparent_60%)] translate-x-1/4 translate-y-1/4 mix-blend-multiply" />
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMS41IiBjeT0iMS41IiByPSIxLjUiIGZpbGw9IiMwRjE3MkEiIGZpbGwtb3BhY2l0eT0iMC4wNCIvPjwvc3ZnPg==')] bg-[length:24px_24px] mix-blend-multiply" />
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
            
            {/* Glassy Shield Badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-slate-200/80 dark:border-gray-700/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[11px] font-extrabold tracking-widest text-[#0F172A] dark:text-white uppercase mb-8">
              <Shield size={14} className="text-emerald-500 stroke-[2.5px]" />
              {t('legalCompass', 'badge', lang)}
            </span>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white tracking-tighter leading-tight mb-6 w-full">
              {t('legalCompass', 'title1', lang)}{' '}
              <span className="text-[#F97316]">{t('legalCompass', 'title2', lang)}</span>
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
            <div className="relative group mx-auto flex items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-gray-700/60 rounded-[28px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all focus-within:ring-[3px] focus-within:ring-emerald-500/10 focus-within:border-emerald-500/30 px-6">
              <Search size={22} className="text-slate-400 group-focus-within:text-[#F97316] transition-colors flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('legalCompass', 'searchPlaceholder', lang)}
                className="block w-full py-5 bg-transparent text-[15px] font-medium text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-center"
              />
              {/* Invisible spacer to perfectly center the text mathematically with the icon on the left */}
              <div className="w-[22px] flex-shrink-0 pointer-events-none" />
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
              className={`group flex flex-col items-start justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.1)] hover:border-emerald-500/40 transition-all duration-500 transform hover:-translate-y-2 ${card.colSpan} relative overflow-hidden`}
            >
              {/* Soft corner gradient on hover */}
              <div className={`absolute top-0 right-0 w-56 h-56 ${card.hoverBg} rounded-bl-[160px] opacity-0 group-hover:opacity-100 transition-all duration-700 z-0 mix-blend-multiply`} />

              <div className="relative z-10 w-full">
                {/* Icon & Tag */}
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-[22px] bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {card.icon}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${card.tagClass}`}>
                    {card.tag}
                  </span>
                </div>
                
                {/* Title & Desc */}
                <h3 className="text-[22px] font-extrabold text-[#0F172A] dark:text-white mb-3 tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-sm">
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto relative z-10">
                <button className="flex items-center gap-2 text-[14px] font-bold text-[#F97316] group-hover:translate-x-2 transition-transform duration-300">
                  {t('legalCompass', 'btnLearn', lang)} <ChevronRight size={16} className="stroke-[3px]" />
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
