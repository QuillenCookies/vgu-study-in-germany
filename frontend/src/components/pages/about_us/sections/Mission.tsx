import React from 'react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
    return (
        <section className="px-4 py-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#0a2463]/10 dark:bg-blue-900/30 text-[#0a2463] dark:text-blue-300 text-[11px] font-bold uppercase tracking-widest">
                        Our Mission
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2463] dark:text-white leading-tight">
                        No student should navigate Germany alone
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-xl shadow-black/5 p-8 sm:p-10"
                >
                    <div className="flex flex-col sm:flex-row gap-8 items-center">
                        {/* Duck mascot placeholder */}
                        <div className="shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#e6b800] flex items-center justify-center text-5xl shadow-lg shadow-[#FFCC00]/30">
                            🦆
                        </div>
                        <div className="space-y-4 text-slate-600 dark:text-gray-300 text-[15px] leading-relaxed">
                            <p>
                                Moving to a new country as a student is exciting — and absolutely overwhelming.
                                Between finding housing, understanding the Bahn rules, registering at the
                                Einwohnermeldeamt, and somehow keeping up with lectures, it can feel like
                                too much.
                            </p>
                            <p>
                                <strong className="text-[#0a2463] dark:text-white">VGU Note from Die Ente</strong> started
                                as a personal notebook of survival tips. Now it's a community-driven guide covering
                                universities, transport, housing, food, entertainment and everything in between —
                                all written by students who have lived it.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Mission;