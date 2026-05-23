import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { fadeUp, stagger } from '../../../../components/ui/animation';
import { SURVIVAL_STATS } from '../knowledge/data';

const AggregatedWisdom: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section className="bg-[#1A2B4C] dark:bg-[#060f2e] py-20 px-4 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute left-0 w-72 h-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
            <div className="absolute right-0 w-72 h-72 translate-x-1/2 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative max-w-screen-lg mx-auto"
            >
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-[12px] font-bold uppercase tracking-widest mb-3">
                        {tr('community', 'sec4Badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {tr('community', 'sec4Title')}
                    </h2>
                    <p className="text-white/60 max-w-lg mx-auto">
                        {tr('community', 'sec4Desc')}
                    </p>
                </motion.div>

                {/* Stats + feature row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {SURVIVAL_STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10
                  hover:bg-white/10 transition-all duration-200 backdrop-blur-sm text-center"
                        >
                            <span className="text-4xl mb-3">{stat.emoji}</span>
                            <p className="text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                            <p className="text-[13px] text-white/50">
                                {i === 0 ? tr('community', 'statDucks') : i === 1 ? tr('community', 'statNotes') : tr('community', 'statBridge')}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Quality tagline */}
                <motion.div variants={fadeUp} className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <BarChart2 size={18} className="text-[#FFCC00]" />
                        <span className="text-white/70 text-[13px]">
                            Notes are community-scored and validated by Alumni with&nbsp;
                            <span className="text-[#FFCC00] font-semibold">Insight Score ⭐</span>
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AggregatedWisdom;