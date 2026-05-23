import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../../../components/ui/animation';
import { VALUES } from '../knowledge/data';

const OurValue: React.FC = () => {
    return (
        <section className="px-4 py-16 bg-slate-50 dark:bg-gray-900/50">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#FFCC00]/15 text-[#1A2B4C] dark:text-[#FFCC00] text-[11px] font-bold uppercase tracking-widest">
                        What We Stand For
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2463] dark:text-white">
                        Our Values
                    </h2>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 gap-6"
                >
                    {VALUES.map((v) => {
                        const Icon = v.Icon;
                        return (
                            <motion.div
                                key={v.title}
                                variants={fadeUp}
                                className="group flex gap-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-100 dark:border-gray-800 shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                            >
                                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${v.bg} transition-transform group-hover:scale-110 duration-300`}>
                                    <Icon size={22} className={v.color} />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#0a2463] dark:text-white mb-1">{v.title}</h3>
                                    <p className="text-slate-500 dark:text-gray-400 text-[13px] leading-relaxed">{v.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default OurValue;