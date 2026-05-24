import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Eye, ShieldCheck, Key, Shield, Route
} from 'lucide-react';
import { type DocFilter, FILTERS, DOCUMENTS, containerVariants, itemVariants } from '../knowledge/data';

// ==========================================
// SVGs & METAPHORS
// ==========================================
const Sparkline = () => (
    <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">
        <path d="M2 14C3 12 5 8 7 8C9 8 10 12 12 12C14 12 16 6 18 6C20 6 22 10 24 10C26 10 28 4 30 4C32 4 34 8 36 8C38 8 40 4 42 2C44 0 45 4 46 6" stroke="#FFCC00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DocumentsList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<DocFilter>('All');

    const filteredDocs = DOCUMENTS.filter((doc) => {
        const matchesSearch =
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || doc.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <h2 className="text-2xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Documents Library
                </h2>

                {/* Ghost Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {FILTERS.map((filter) => {
                        const isActive = activeFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`relative px-5 py-2.5 rounded-full text-[14px] font-bold tracking-tight transition-all duration-300 ${isActive
                                    ? 'text-white border-transparent'
                                    : 'text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="pillIndicator"
                                        className="absolute inset-0 bg-[#1A2B4C] dark:bg-slate-800 rounded-full -z-10 shadow-md shadow-black/10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                {filter}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {filteredDocs.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredDocs.map((doc) => (
                                <motion.div
                                    key={doc.id}
                                    layout
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Soft Hover Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-50/50 dark:from-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="relative z-10">
                                        {/* Metadata Top Row */}
                                        <div className="flex items-start justify-between mb-6">
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A2B4C] dark:text-slate-300">
                                                {doc.category === 'Admission' ? <Key size={16} className="text-amber-400" /> : doc.category === 'Career' ? <Route size={16} className="text-blue-500" /> : <Shield size={16} className="text-emerald-500" />}
                                                {doc.category}
                                            </span>
                                            {doc.verified && (
                                                <div className="flex items-center gap-1.5 text-[#FFCC00] bg-orange-50/80 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-100/80 dark:border-orange-800/50 shadow-sm">
                                                    <ShieldCheck size={14} strokeWidth={2.5} />
                                                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Verified Target</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-[#1A2B4C] dark:text-white tracking-tighter leading-snug mb-4 pr-4 group-hover:text-[#FFCC00] transition-colors duration-300">
                                            {doc.title}
                                        </h3>
                                    </div>

                                    {/* Bottom Stats & Hover Action */}
                                    <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-3 text-[12px] font-bold tracking-tight text-slate-400">
                                                <span>{doc.stats.read}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                <span>{doc.stats.views}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Sparkline />
                                                <span className="text-[11px] font-semibold text-slate-400">{doc.stats.desc}</span>
                                            </div>
                                        </div>

                                        {/* Quick Preview Hover Button */}
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="absolute right-0 bottom-1 opacity-0 group-hover:opacity-100 group-hover:y-0 flex items-center gap-2 bg-[#1A2B4C] dark:bg-white text-white dark:text-[#1A2B4C] px-4 py-2.5 rounded-xl text-xs font-bold shadow-xl shadow-black/10 transition-all duration-300"
                                        >
                                            <Eye size={14} strokeWidth={2.5} /> Preview
                                        </motion.button>
                                    </div>

                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <Search size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A2B4C] dark:text-white mb-3 tracking-tighter">
                                No exact matches found
                            </h3>
                            <p className="text-base font-medium text-slate-500 max-w-sm mb-8 leading-relaxed">
                                Adjust your filters or try a different search term to surface resources.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                                className="px-6 py-3 bg-[#1A2B4C] dark:bg-white text-white dark:text-[#1A2B4C] text-sm font-bold tracking-tight rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-black/10"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DocumentsList;