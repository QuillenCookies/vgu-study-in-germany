import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../../../components/ui/animation';
import { STATS } from '../knowledge/data';

const Stats: React.FC = () => {
    return (
        <section className="relative z-20 px-4 -mt-12 pb-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    {STATS.map((s) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-black/5 border border-slate-100 dark:border-gray-800 p-6 text-center"
                        >
                            <div className="text-3xl sm:text-4xl font-black text-[#0a2463] dark:text-white mb-1">
                                {s.value}
                            </div>
                            <div className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Stats;