import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Briefcase, Scale, Users, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

const PILLARS = [
  {
    id: 'a',
    title: 'The German Application Standard',
    items: ['Tabellarischer Lebenslauf', 'Cover Letter (Anschreiben)', 'Certificates'],
    icon: <FileCheck size={28} className="text-[#F97316]" />,
  },
  {
    id: 'b',
    title: 'Student Job Types',
    items: ['Werkstudent', 'Pflichtpraktikum', 'Minijob'],
    icon: <Briefcase size={28} className="text-[#F97316]" />,
  },
  {
    id: 'c',
    title: 'The 140-Day Rule & Tax',
    items: ['140-Day Rule', 'Steuer-ID', 'Social Security'],
    icon: <Scale size={28} className="text-[#F97316]" />,
  },
  {
    id: 'd',
    title: 'Networking & Job Hunting',
    items: ['LinkedIn/Xing', 'Career Fairs', 'Referrals'],
    icon: <Users size={28} className="text-[#F97316]" />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 }
  }
};

const CareerPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen relative font-sans selection:bg-orange-500/30 overflow-hidden bg-white">
        
        {/* High-End Corporate Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
            <div className="absolute inset-0 bg-[#0F172A] opacity-[0.02] mix-blend-multiply" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.04),transparent_70%)] mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_left,rgba(241,245,249,0.05),transparent_70%)] mix-blend-multiply" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-32 pb-32 px-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tighter leading-tight mb-6 w-full">
              Career <span className="text-[#F97316]">Launchpad</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto mb-20">
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
                className="group flex flex-col justify-between bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] hover:border-orange-500/30 transition-all duration-500 h-full text-left relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50/60 rounded-bl-[120px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-0 mix-blend-multiply" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                    {pillar.icon}
                  </div>
                  
                  <h3 className="text-[22px] font-extrabold text-[#0F172A] mb-4 tracking-tight group-hover:text-[#F97316] transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <ul className="space-y-3 mb-12">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-[15px] font-medium text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3 group-hover:bg-orange-300 transition-colors" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto">
                  <button className="flex items-center gap-2 text-[15px] font-bold text-[#F97316] group-hover:translate-x-2 transition-transform duration-300">
                    Start Your Journey <ChevronRight size={18} className="stroke-[3px]" />
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
