import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Command
} from 'lucide-react';

const LibraryHeroSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-28 animate-fade-in-up">

            <motion.h1
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[4rem] font-bold text-[#1A2B4C] dark:text-white tracking-tighter leading-tight mb-6"
            >
                The Duck’s <span className="text-[#FFCC00]">Archive</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-500 dark:text-slate-400 text-lg md:text-xl tracking-tight mb-14 max-w-xl"
            >
                A curated intelligence database for the VGU diaspora.
            </motion.p>

            {/* Command-Palette Search */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                className="w-full max-w-2xl relative group"
            >
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)] dark:shadow-none pointer-events-none" />
                <div className="relative flex items-center px-5 py-4 border border-slate-200/80 dark:border-slate-700 rounded-3xl bg-white/60 dark:bg-slate-900/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] focus-within:ring-4 focus-within:ring-[#1A2B4C]/5 focus-within:border-[#1A2B4C]/20 transition-all">
                    <Search size={22} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search architecture templates, TUM essays..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none px-4 text-[#1A2B4C] dark:text-slate-100 text-[16px] placeholder-slate-400 font-medium"
                    />
                    <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400 shadow-sm">
                        <Command size={14} /> K
                    </div>
                </div>
            </motion.div>

            {/* Hint Hashtags */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-5 mt-8 text-[14px] font-semibold text-slate-400"
            >
                <button onClick={() => setSearchQuery('TUM')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#TUM</button>
                <button onClick={() => setSearchQuery('Motivation')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#MotivationLetter</button>
                <button onClick={() => setSearchQuery('RWTH')} className="hover:text-[#FFCC00] transition-colors tracking-tight">#RWTH</button>
            </motion.div>
        </div>
    );
};

export default LibraryHeroSection;