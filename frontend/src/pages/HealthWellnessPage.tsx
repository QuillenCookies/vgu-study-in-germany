import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Stethoscope, CreditCard, Pill, Smile, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const COLOR_MAP = {
  emerald: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20',
  blue: 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/20',
  rose: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/20',
  amber: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20',
} as const;

export default function HealthWellnessPage() {
  const { tr, lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans text-gray-900 dark:text-gray-100 selection:bg-orange-500/30 relative overflow-hidden mb-32">

      {/* BACKGROUND: Soft absolute Mesh Gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Mint Green (Emerald) */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-[0.03] animate-pulse dark:bg-[#10b981] bg-[#10b981]" style={{ animationDuration: '8s' }} />
        {/* Soft Blue */}
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-[0.03] animate-pulse dark:bg-blue-400 bg-blue-300" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12">
        {/* PRECISION CENTERING CONTAINER */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest shadow-sm mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 dark:bg-red-500 -ml-[1px] -mt-[1px]"></span>
            </span>
            {tr('healthWellness', 'badge')}
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0a2463] dark:text-white leading-[1.1] mb-6 drop-shadow-sm">
            {tr('healthWellness', 'title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#f97316] drop-shadow-sm">
              {tr('healthWellness', 'title2')}
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {tr('healthWellness', 'subtitle')}
          </p>
          
        </div>

        {/* BENTO GRID */}
        <div className="w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            {
              icon: <Stethoscope size={24} />,
              titleKey: 'bentoTitle1' as const,
              subKey: 'bentoSub1' as const,
              descKey: 'bentoDesc1' as const,
              color: 'emerald' as const,
            },
            {
              icon: <CreditCard size={24} />,
              titleKey: 'bentoTitle2' as const,
              subKey: 'bentoSub2' as const,
              descKey: 'bentoDesc2' as const,
              color: 'blue' as const,
            },
            {
              icon: <Pill size={24} />,
              titleKey: 'bentoTitle3' as const,
              subKey: 'bentoSub3' as const,
              descKey: 'bentoDesc3' as const,
              color: 'rose' as const,
            },
            {
              icon: <Smile size={24} />,
              titleKey: 'bentoTitle4' as const,
              subKey: 'bentoSub4' as const,
              descKey: 'bentoDesc4' as const,
              color: 'amber' as const,
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col p-8 rounded-3xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all overflow-hidden"
            >
              {/* TOP ICON */}
              <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${COLOR_MAP[card.color]}`}>
                {card.icon}
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {tr('healthWellness', card.subKey)}
                </h3>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {tr('healthWellness', card.titleKey)}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {tr('healthWellness', card.descKey)}
                </p>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800/60">
                <button className="flex items-center gap-2 text-sm font-semibold text-[#f97316] hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/btn">
                  {tr('healthWellness', 'quickGuide')}
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
    </Layout>
  );
}
