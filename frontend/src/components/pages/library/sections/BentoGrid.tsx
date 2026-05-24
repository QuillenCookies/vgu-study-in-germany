import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { BENTO_CATEGORIES } from '../knowledge/data';

const BentoGrid: React.FC = () => {
    return (
        <div className="mb-32">
            <h2 className="text-2xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00]" /> Resource Pathways
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[180px]">
                {BENTO_CATEGORIES.map((cat) => (
                    <motion.div
                        key={cat.id}
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`relative p-6 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-slate-300 dark:hover:border-slate-700 transition-all group overflow-hidden flex flex-col justify-between ${cat.colSpan}`}
                    >
                        {cat.isLarge && (
                            <div className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.03] dark:opacity-10 text-slate-900 pointer-events-none transform translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700 ease-out">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.5 3c-1.38 0-2.5 1.12-2.5 2.5 0 .39.09.76.25 1.08C9.37 7.23 8 8.64 8 10.5c0 1.07.41 2.07 1.12 2.81-.39 1.17-.41 2.45-.63 3.69-.17.98-.94 1.76-1.92 1.95-1.47.28-1.57 2.05-1.57 2.05s1.28.32 2.54.49c1.67.22 3.3.49 5.46.49 4.34 0 7.82-1.96 8.79-4.83.6-1.76.59-4.04-.6-6.19-1.38-2.48-4.22-4.08-6.19-4.73C14.77 5.75 14.86 5.39 14.86 5 14.86 3.62 13.88 3 12.5 3z" />
                                </svg>
                            </div>
                        )}

                        <div className="relative z-10 flex items-start justify-between">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-transparent shadow-sm ${cat.isLarge ? 'bg-[#1A2B4C] text-white dark:bg-white dark:text-[#1A2B4C]' : cat.color}`}>
                                {cat.icon}
                            </div>
                            {cat.isLarge && (
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={18} className="text-slate-400" />
                                </span>
                            )}
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className={`font-bold text-[#1A2B4C] dark:text-white tracking-tighter ${cat.isLarge ? 'text-3xl mb-3' : 'text-xl mb-2'}`}>
                                {cat.title}
                            </h3>
                            <p className={`font-medium ${cat.isLarge ? 'text-slate-500 max-w-sm text-base leading-relaxed' : 'text-slate-400 text-sm line-clamp-2 leading-relaxed'}`}>
                                {cat.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BentoGrid;