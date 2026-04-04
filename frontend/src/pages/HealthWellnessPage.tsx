import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Stethoscope, CreditCard, Pill, Smile, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

export default function HealthWellnessPage() {
  const { tr, lang } = useLanguage();

  useEffect(() => { window.scrollTo(0, 0); }, [lang]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#0B1220] font-sans text-gray-900 dark:text-gray-100 relative overflow-hidden mb-32">

        {/* Subtle background */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04]"
            style={{ backgroundColor: MIDNIGHT }} />
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.03]"
            style={{ backgroundColor: AMBER }} />
        </div>

        <main className="relative z-10 w-full pt-32 pb-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-8 backdrop-blur-sm border"
              style={{ background: `rgba(26,43,76,0.08)`, borderColor: `${MIDNIGHT}20`, color: MIDNIGHT }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: AMBER }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: AMBER }} />
              </span>
              {tr('healthWellness', 'badge')}
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight dark:text-white leading-[1.1] mb-6"
              style={{ color: MIDNIGHT }}>
              {tr('healthWellness', 'title1')}{' '}
              <span style={{ color: AMBER }}>
                {tr('healthWellness', 'title2')}
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl" style={{ lineHeight: 1.6 }}>
              {tr('healthWellness', 'subtitle')}
            </p>
          </div>

          {/* BENTO GRID */}
          <div className="w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { icon: <Stethoscope size={24} strokeWidth={1.75} />, titleKey: 'bentoTitle1' as const, subKey: 'bentoSub1' as const, descKey: 'bentoDesc1' as const },
              { icon: <CreditCard size={24} strokeWidth={1.75} />, titleKey: 'bentoTitle2' as const, subKey: 'bentoSub2' as const, descKey: 'bentoDesc2' as const },
              { icon: <Pill size={24} strokeWidth={1.75} />, titleKey: 'bentoTitle3' as const, subKey: 'bentoSub3' as const, descKey: 'bentoDesc3' as const },
              { icon: <Smile size={24} strokeWidth={1.75} />, titleKey: 'bentoTitle4' as const, subKey: 'bentoSub4' as const, descKey: 'bentoDesc4' as const },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col p-8 rounded-lg bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Amber top accent on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: AMBER }} />

                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `rgba(26,43,76,0.08)`, color: MIDNIGHT }}>
                  {card.icon}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    {tr('healthWellness', card.subKey)}
                  </h3>
                  <h2 className="text-xl font-semibold dark:text-white mb-3 tracking-tight" style={{ color: MIDNIGHT }}>
                    {tr('healthWellness', card.titleKey)}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8" style={{ lineHeight: 1.6 }}>
                    {tr('healthWellness', card.descKey)}
                  </p>
                </div>

                {/* ACTION */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800/60">
                  <button className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: MIDNIGHT }}>
                    {tr('healthWellness', 'quickGuide')}
                    <ArrowRight size={16} strokeWidth={1.75} className="transform group-hover:translate-x-1 transition-transform duration-300" />
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
