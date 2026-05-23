import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, PenLine, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { fadeUp, stagger } from '../../../ui/animation';
import { SURVIVAL_STATS } from '../knowledge/data';
import NetworkGraph from '../ui/NetworkGraph';

const ComunityHeroSection: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section className="relative w-full max-w-full overflow-hidden box-border bg-gradient-to-br from-[#1A2B4C] via-[#0D1F38] to-[#080f1e] min-h-[90vh] flex items-center">
            {/* Background glow blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFCC00]/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 w-full">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-all border border-white/15 backdrop-blur-sm"
                    >
                        <ArrowLeft size={15} />
                        {tr('community', 'backHome')}
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — text */}
                    <motion.div variants={stagger} initial="hidden" animate="show">
                        {/* Badge */}
                        <motion.span
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/85 text-[13px] font-medium"
                        >
                            {tr('community', 'heroBadge')}
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-xl break-words whitespace-normal max-w-full box-border"
                        >
                            {tr('community', 'heroTitle1')}{' '}
                            <span className="text-[#FFCC00] break-words whitespace-normal box-border">{tr('community', 'heroTitle2')}</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed"
                        >
                            {tr('community', 'heroDesc')}
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                            <Link
                                to="#leave-note"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#e6b800]
                    text-white font-semibold text-[15px] shadow-lg shadow-amber-400/30
                    transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <PenLine size={16} />
                                {tr('community', 'postNote')}
                            </Link>
                            <Link
                                to="#forum"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20
                    text-white font-semibold text-[15px] border border-white/20 backdrop-blur-sm
                    transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <MessageCircle size={16} />
                                {tr('community', 'browseForum')}
                            </Link>
                        </motion.div>

                        {/* Quick stats */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-10">
                            {SURVIVAL_STATS.map((stat, i) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-2xl font-extrabold text-white">{stat.emoji} {stat.value}</p>
                                    <p className="text-[12px] text-white/50 mt-0.5">
                                        {i === 0 ? tr('community', 'statDucks') : i === 1 ? tr('community', 'statNotes') : tr('community', 'statBridge')}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col items-center gap-4 w-full flex-1 box-border"
                    >
                        <div className="relative w-full max-w-[500px] mx-auto box-border overflow-hidden">
                            <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm" />
                            <div className="relative p-5 sm:p-8 box-border">
                                <NetworkGraph />
                                <p className="text-center text-white/40 text-[11px] sm:text-[12px] mt-3 font-medium tracking-wide uppercase break-words whitespace-normal max-w-full">
                                    {tr('community', 'networkCaption')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </motion.div>
        </section>
    );
}

export default ComunityHeroSection;