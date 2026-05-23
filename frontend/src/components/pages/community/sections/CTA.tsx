import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, PenLine
} from 'lucide-react';
import { fadeUp, stagger } from '../../../../components/ui/animation';

const CTA: React.FC = () => {
    return (
        <section id="leave-note" className="bg-gray-50 dark:bg-[#0B1220] py-24 px-4 relative overflow-hidden">
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-screen-lg mx-auto"
            >
                {/* Bento-style Contributor Card */}
                <motion.div
                    variants={fadeUp}
                    className="relative p-10 sm:p-14 rounded-[2rem] border border-amber-400/30 bg-gradient-to-br from-amber-400/30 via-amber-400/30 to-transparent dark:from-amber-400/30 dark:via-amber-400/30 dark:to-transparent bg-white dark:bg-gray-900 shadow-xl dark:shadow-2xl overflow-hidden group flex flex-col md:flex-row items-center md:items-start justify-between gap-10"
                >
                    {/* Ghost duck icon in background */}
                    <div className="absolute -bottom-16 -right-10 text-[250px] opacity-[0.03] select-none text-[#FFCC00] group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none">
                        🦆
                    </div>

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#FFCC00]/20 text-[#FFCC00] text-[12px] font-bold uppercase tracking-widest border border-amber-400/20">
                            <PenLine size={13} /> The Pathfinder Initiative
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                            From Resident to <span className="text-[#FFCC00]">Pathfinder.</span>
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-lg mb-8 max-w-xl leading-relaxed">
                            Your struggle yesterday is someone else's guide today. Share your notes and get recognized in the Wall of Pathfinders.
                        </p>

                        <Link
                            to="/community/contributor"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                          bg-[#FFCC00] hover:bg-[#e6b800] text-white font-bold text-[16px]
                          shadow-lg shadow-amber-400/30 transition-all duration-300
                          hover:scale-105 hover:-translate-y-1 active:scale-95"
                        >
                            Start Contributing <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CTA;