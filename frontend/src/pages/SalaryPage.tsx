import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Wallet, ArrowRight, CheckCircle, Database, Code, Cloud, Terminal, GraduationCap, Building2, Mail } from 'lucide-react';
import Layout from '../components/Layout';

const SalaryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeRegion, setActiveRegion] = useState<'high' | 'medium' | 'low'>('high');

  type RegionInfo = { title: string; cities: string; range: string; color: string; note?: string };
  const regionData: Record<'high' | 'medium' | 'low', RegionInfo> = {
    high: { title: 'High-Cost Zones', cities: 'Munich, Stuttgart', range: '16.00€ - 22.00€', color: 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50' },
    medium: { title: 'Medium-Cost & Sweet Spots', cities: 'Aachen, Berlin, Frankfurt', range: '14.50€ - 18.50€', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50', note: 'Best balance of salary & rent!' },
    low: { title: 'Low-Cost Zones', cities: 'Dresden, Leipzig', range: '13.00€ - 15.50€', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' },
  };

  const currentRegion = regionData[activeRegion];

  return (
    <Layout>
      <div className="min-h-screen relative font-sans selection:bg-orange-500/30 overflow-hidden bg-white dark:bg-gray-950">
        
        {/* Faint Golden/Amber mesh gradient (2% opacity) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
            <div className="absolute inset-0 bg-amber-500 opacity-[0.02] mix-blend-multiply" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_70%)] mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.04),transparent_70%)] mix-blend-multiply" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center pt-32 pb-32 px-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white tracking-tighter leading-tight mb-6 w-full">
              Salary & <span className="text-[#F97316]">Finance</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto mb-20 text-balance">
              From hourly rates to tax returns—master your finances as a student in Germany.
            </p>
          </motion.div>

          {/* Bento Grid Container */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

            {/* 1. Interactive Salary Heatmap */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-gray-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                  <MapPin size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">The Regional Guide</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-left leading-relaxed">Toggle to explore the average hourly rates based on the German region.</p>

              {/* Toggles */}
              <div className="flex w-full bg-slate-100 dark:bg-gray-800 p-1.5 rounded-2xl mb-8">
                {(['high', 'medium', 'low'] as const).map(region => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 capitalize ${
                      activeRegion === region 
                        ? 'bg-white dark:bg-gray-700 text-slate-800 dark:text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRegion}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 ${currentRegion.color}`}>
                      {currentRegion.title}
                    </div>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">{currentRegion.range}</div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                       <Building2 size={16} /> {currentRegion.cities}
                    </div>
                    {currentRegion.note && (
                      <div className="mt-4 px-4 py-2 bg-amber-100 text-amber-700 text-xs font-bold rounded-xl flex items-center gap-2">
                        🌟 {currentRegion.note}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 2. Technical Role Benchmarks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-gray-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">The CS Special</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-left leading-relaxed">Typical hourly benchmarks for working student (Werkstudent) IT positions.</p>
              
              <div className="space-y-4 w-full">
                {/* Data Analyst / AI */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl group hover:bg-white dark:hover:bg-gray-750 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Database size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base">Data Analyst / AI</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">16.00€ – 21.00€+</span>
                </div>

                {/* DevOps */}
                <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl group hover:bg-white dark:hover:bg-indigo-950/50 hover:shadow-md hover:border-indigo-200 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-bl-lg">High Demand</div>
                  <div className="flex items-center gap-3">
                    <Cloud size={20} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm md:text-base">DevOps Engineer</span>
                  </div>
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 leading-none">16.50€ – 22.00€</span>
                </div>

                {/* Software Dev */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl group hover:bg-white dark:hover:bg-gray-750 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Terminal size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base">Software Dev</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">15.50€ – 19.50€</span>
                </div>

                {/* Web Dev */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl group hover:bg-white dark:hover:bg-gray-750 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Code size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base">Web Dev</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">14.50€ – 18.00€</span>
                </div>
              </div>
            </motion.div>

            {/* 3. The "Gross vs. Net" Logic */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-gray-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                  <Wallet size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Financial Transparency</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-left leading-relaxed">Understand the deduction logic to know exactly what hits your bank account.</p>

              {/* Money Flow Diagram */}
              <div className="flex-1 flex flex-col gap-3 relative justify-center">
                
                {/* Minijob Limit */}
                <div className="flex items-center p-5 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-gray-600 mr-4">
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">≤538€</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Minijob Limit</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">0% Tax. Can opt-out of pension. You keep exactly what you earn.</p>
                  </div>
                </div>

                <div className="flex justify-center -my-1 relative z-10 w-12 ml-6 text-slate-300">
                  <ArrowRight className="rotate-90" size={20} />
                </div>

                {/* Tax-Free Threshold */}
                <div className="flex items-center p-5 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl">
                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-gray-600 mr-4">
                     <span className="font-bold text-slate-700 text-xs text-center leading-tight">11.6k€<br/>/yr</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Tax-free Threshold (Grundfreibetrag)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Earn up to 11,604€/year completely free of income tax (Lohnsteuer).</p>
                  </div>
                </div>

                <div className="flex justify-center -my-1 relative z-10 w-12 ml-6 text-slate-300">
                  <ArrowRight className="rotate-90" size={20} />
                </div>

                {/* Pension Insurance */}
                <div className="flex items-center p-5 bg-orange-50/50 border border-orange-100 rounded-2xl">
                  <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-100 mr-4 text-orange-500">
                     <span className="font-bold text-sm">9.3%</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-orange-900 text-sm">Pension Insurance (Rentenversicherung)</h4>
                    <p className="text-xs text-orange-700/80 mt-1">If earning &gt;538€, you usually pay 9.3% in pension. The rest is yours.</p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* 4. Negotiation & Rights Playbook */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-gray-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-fuchsia-100 rounded-2xl text-fuchsia-600">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Rights Playbook</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-left leading-relaxed">As a student worker, you possess identical labor protections as full-time employees.</p>

              {/* Rights List */}
              <div className="space-y-6 flex-1 w-full text-left">
                
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5"><CheckCircle size={20} className="text-emerald-500 flex-shrink-0" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Paid Vacation (Urlaubsanspruch)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">By law, min 20 days/year for a 5-day week. Pro-rated for part-time (e.g. 2 days/week = 8 days paid off).</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-0.5"><CheckCircle size={20} className="text-emerald-500 flex-shrink-0" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Paid Sick Leave (Lohnfortzahlung)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">If sick on your scheduled workday, you still get paid. Just submit your AU (Doctor's Note) in time.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-0.5"><CheckCircle size={20} className="text-emerald-500 flex-shrink-0" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Home Office Bonus</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Often negotiable. Many startups provide hardware and a monthly internet/electricity stipend.</p>
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <button className="mt-8 w-full py-4 px-6 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-slate-800/20 group">
                <Mail size={18} className="text-slate-300 group-hover:text-white transition-colors" />
                Get Raise Request Template
              </button>
            </motion.div>

          </div>
        </main>
      </div>
    </Layout>
  );
};

export default SalaryPage;
