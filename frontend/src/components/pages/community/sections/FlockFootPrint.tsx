import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, ArrowRight, ChevronRight
} from 'lucide-react';
import { fadeUp, stagger } from '../../../../components/ui/animation';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ALUMNI_NOTES, } from '../knowledge/data';
import StarRating from '../ui/StarRating';

const FlockFootPrint: React.FC = () => {
    const { tr } = useLanguage();
    const [activeNote, setActiveNote] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActiveNote(n => (n + 1) % ALUMNI_NOTES.length), 6000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="bg-white dark:bg-[#0B1220] py-20 px-4">
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-screen-lg mx-auto"
            >
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#FFCC00] text-[12px] font-bold uppercase tracking-widest mb-3">
                        {tr('community', 'sec2Badge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white break-words">
                        {tr('community', 'sec2Title')}
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        {tr('community', 'sec2Desc')}
                    </p>
                </motion.div>

                {/* Note carousel */}
                <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-8">
                    <AnimatePresence mode="wait">
                        {ALUMNI_NOTES.map((note, i) =>
                            i === activeNote ? (
                                <motion.div
                                    key={note.city}
                                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                                    transition={{ duration: 0.4 }}
                                    className={`relative p-7 rounded-2xl border ${note.border} bg-gradient-to-br ${note.color} bg-gray-900 backdrop-blur-md`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-0.5">
                                                {note.emoji} {note.city} — Survival Log
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${note.badge}`}>
                                                    # {note.topic}
                                                </span>
                                                <StarRating count={note.stars} />
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className="text-white/80 text-[15px] leading-relaxed italic mb-5 border-l-2 border-amber-400/50 pl-4">
                                        "{note.snippet}"
                                    </blockquote>

                                    {/* Author Box replacing old simple author text */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                        <div className="flex items-center gap-3">
                                            <img src={note.authorAvatar} alt={note.author} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                                            <div>
                                                <p className="text-[14px] font-bold text-white leading-none mb-1.5">{note.author}</p>
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    {note.badges.map(b => (
                                                        <span key={b.type} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/80 font-semibold border border-white/5" title={b.type}>
                                                            {b.icon} {b.type}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#FFCC00] hover:text-orange-300 transition-colors">
                                            {tr('community', 'readFull')}
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : null
                        )}
                    </AnimatePresence>

                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                        {ALUMNI_NOTES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveNote(i)}
                                className={`rounded-full transition-all duration-300 ${i === activeNote
                                    ? 'w-6 h-2 bg-[#FFCC00]'
                                    : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400'
                                    }`}
                                aria-label={`Note ${i + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* All notes CTA */}
                <motion.div variants={fadeUp} className="text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/15
              text-gray-700 dark:text-white/70 text-[14px] font-medium hover:border-[#FFCC00] hover:text-[#FFCC00]
              transition-all duration-200 hover:scale-105">
                        <FileText size={15} />
                        {tr('community', 'browseAll')}
                        <ArrowRight size={14} />
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default FlockFootPrint;