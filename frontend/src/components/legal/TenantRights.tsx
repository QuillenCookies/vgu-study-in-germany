import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Gavel, Scale, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../lib/translations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const TenantRights: React.FC = () => {
  const { lang } = useLanguage();

  const issues = [
    {
      id: 'deposit',
      title: t('legalCompass', 'trIssue1', lang),
      context: t('legalCompass', 'trContext1', lang),
      action: t('legalCompass', 'trAction1', lang),
      icon: <Gavel size={22} className="text-emerald-500" />
    },
    {
      id: 'rent',
      title: t('legalCompass', 'trIssue2', lang),
      context: t('legalCompass', 'trContext2', lang),
      action: t('legalCompass', 'trAction2', lang),
      icon: <Scale size={22} className="text-blue-600" />
    },
    {
      id: 'noise',
      title: t('legalCompass', 'trIssue3', lang),
      context: t('legalCompass', 'trContext3', lang),
      action: t('legalCompass', 'trAction3', lang),
      icon: <Gavel size={22} className="text-emerald-500" />
    }
  ];

  const redFlags = [
    t('legalCompass', 'trRf1', lang),
    t('legalCompass', 'trRf2', lang),
    t('legalCompass', 'trRf3', lang),
  ];

  return (
    <section className="mt-28 pt-20 border-t border-slate-100/60 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {t('legalCompass', 'card1Title', lang)}
          </h2>
          <p className="text-slate-500 font-medium">
            {t('legalCompass', 'trTitle1', lang)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-12">
        {/* Issues List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {issues.map(issue => (
            <motion.div
              key={issue.id}
              variants={itemVariants}
              className="group relative bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-sm">
                  {issue.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight mt-1 group-hover:text-emerald-700 transition-colors">
                    {issue.title}
                  </h3>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-6 flex-grow relative z-10">
                {issue.context}
              </p>
              
              {/* Action Button that fades in / slides up on hover */}
              <div className="relative z-10 mt-auto overflow-hidden rounded-xl pt-2">
                <div className="flex items-center text-[12.5px] font-bold text-slate-400 group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 pt-2 px-1">
                  Hover to view action →
                </div>
                <button className="w-full flex items-center justify-between bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-orange-500/20">
                  <span className="truncate pr-2">{issue.action}</span>
                  <ArrowRight size={16} className="flex-shrink-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Red Flag Checklist */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 bg-white/50 backdrop-blur-sm rounded-[32px] p-8 border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm shadow-red-500/10">
              <AlertTriangle size={22} className="stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('legalCompass', 'trRedFlagTitle', lang)}</h3>
              <p className="text-[13px] font-medium text-slate-500 mt-0.5">{t('legalCompass', 'trRedFlagDesc', lang)}</p>
            </div>
          </div>
          
          <ul className="space-y-5 flex-grow">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-3.5 group">
                <CheckCircle2 size={18} className="text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[14px] text-slate-600 font-semibold leading-relaxed group-hover:text-slate-900 transition-colors">
                  {flag}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default TenantRights;
