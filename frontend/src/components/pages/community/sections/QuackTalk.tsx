import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../../../components/ui/animation';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FORUM_CATEGORIES } from '../knowledge/data';
import { ArrowRight } from 'lucide-react';

const QuackTalk: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section id="forum" className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-screen-lg mx-auto"
            >
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[12px] font-bold uppercase tracking-widest mb-3">
                        {tr('community', 'sec3Badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        {tr('community', 'sec3Title')}
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        {tr('community', 'sec3Desc')}
                    </p>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FORUM_CATEGORIES.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={fadeUp}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`relative group p-6 rounded-2xl border ${cat.border} bg-white dark:bg-gray-800/60
                  shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50
                  overflow-hidden cursor-pointer transition-shadow duration-200`}
                        >
                            {/* Gradient bg on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <span
                                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-200 group-hover:scale-110"
                                        style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                                    >
                                        {cat.icon}
                                    </span>
                                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                                        {cat.posts} {tr('common', 'posts')}
                                    </span>
                                </div>

                                <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1">
                                    {cat.title}
                                </h3>
                                <p className="text-[12px] font-medium mb-2" style={{ color: cat.color }}>
                                    {cat.subtitle}
                                </p>
                                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                                    {cat.desc}
                                </p>

                                <div
                                    className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5"
                                    style={{ color: cat.color }}
                                >
                                    {tr('community', 'enterDiscussion')}
                                    <ArrowRight size={13} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default QuackTalk;