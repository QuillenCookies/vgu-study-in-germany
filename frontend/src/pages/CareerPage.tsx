import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Briefcase, Scale, Users, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

const PILLARS = [
  {
    id: 'a',
    title: 'The German Application Standard',
    items: ['Tabellarischer Lebenslauf', 'Cover Letter (Anschreiben)', 'Certificates'],
    icon: <FileCheck size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
  },
  {
    id: 'b',
    title: 'Student Job Types',
    items: ['Werkstudent', 'Pflichtpraktikum', 'Minijob'],
    icon: <Briefcase size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
  },
  {
    id: 'c',
    title: 'The 140-Day Rule & Tax',
    items: ['140-Day Rule', 'Steuer-ID', 'Social Security'],
    icon: <Scale size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
  },
  {
    id: 'd',
    title: 'Networking & Job Hunting',
    items: ['LinkedIn/Xing', 'Career Fairs', 'Referrals'],
    icon: <Users size={28} strokeWidth={1.75} style={{ color: MIDNIGHT }} />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } }
};

const CareerPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <Layout>
      <div className="min-h-screen relative font-sans overflow-hidden bg-white dark:bg-[#0B1220]">

        {/* Subtle background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px]"
            style={{ background: `radial-gradient(circle at top right, rgba(26,43,76,0.04), transparent 70%)` }} />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px]"
            style={{ background: `radial-gradient(circle at bottom left, rgba(255,204,0,0.03), transparent 70%)` }} />
        </div>

        <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-32 pb-32 px-6">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl font-semibold dark:text-white tracking-tight leading-tight mb-6 w-full"
              style={{ color: MIDNIGHT }}>
              Career <span style={{ color: AMBER }}>Launchpad</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto mb-20" style={{ lineHeight: 1.6 }}>
              From Campus to Corporate — Your ultimate guide to starting a professional career in Germany.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="group flex flex-col justify-between bg-white dark:bg-gray-900/80 rounded-lg p-10 border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300 h-full text-left relative overflow-hidden"
              >
                {/* Amber hover accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: AMBER }} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `rgba(26,43,76,0.08)` }}>
                    {pillar.icon}
                  </div>

                  <h3 className="text-[20px] font-semibold dark:text-white mb-4 tracking-tight transition-colors duration-300"
                    style={{ color: MIDNIGHT }}>
                    {pillar.title}
                  </h3>

                  <ul className="space-y-3 mb-10">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-[15px] font-medium text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"
                          style={{ backgroundColor: `${MIDNIGHT}40` }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto">
                  <button className="flex items-center gap-2 text-[14px] font-semibold group-hover:translate-x-2 transition-all duration-300"
                    style={{ color: MIDNIGHT }}>
                    Start Your Journey <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </Layout>
  );
};

export default CareerPage;
