import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../../../../components/ui/animation';

const AboutUsHeroSection: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a2463] via-[#0d1f4e] to-[#060f2e] pt-16 pb-28 px-4 flex flex-col items-center box-border">
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#FFCC00]/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#1A2B4C]/30 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-screen-lg mx-auto w-full">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[13px] font-medium transition-all border border-white/15 backdrop-blur-sm"
                    >
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
                    {/* Badge */}
                    <motion.span
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#FFCC00]/20 backdrop-blur-md border border-[#FFCC00]/30 text-[#FFCC00] text-[11px] font-bold uppercase tracking-widest"
                    >
                        <BookOpen size={12} /> Our Story
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-xl"
                    >
                        Built by Students,{' '}
                        <span className="text-[#FFCC00]">for Students</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-white/70 text-[16px] sm:text-[17px] max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a group of international students at VGU who got tired of figuring out Germany
                        alone — so we built the guide we wished we'd had from day one.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutUsHeroSection;