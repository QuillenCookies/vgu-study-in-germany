// HeroSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { HeroSearchBar } from './HeroSearchBar';
import HeroMascot from './HeroMascot';
import HeroQuickLinks from './HeroQuickLinks';
import { HERO_BG, MIDNIGHT, AMBER } from './constants';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">

            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 hover:scale-100 transition-transform duration-[20s]"
                style={{ backgroundImage: `url(${HERO_BG})` }}
                aria-hidden="true"
            />

            {/* Dark Overlays */}
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${MIDNIGHT}CC, ${MIDNIGHT}99, ${MIDNIGHT}CC)` }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #0A1525DD 0%, transparent 45%)' }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ background: 'linear-gradient(to right, #0D1226 0%, #0D1226CC 8%, transparent 50%)' }}
                aria-hidden="true"
            />

            {/* Main content grid */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">

                {/* LEFT: Textual content container */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="flex-1 w-full max-w-2xl flex flex-col items-center lg:items-start text-white"
                >
                    {/* Passport stamp badge */}
                    <motion.div
                        variants={fadeUp}
                        className="inline-block bg-[#FFD700] text-black px-4 py-1.5 rounded-lg mb-6 shadow-lg -rotate-2"
                    >
                        <span className="text-[10px] uppercase tracking-widest font-bold block opacity-60">Passport Stamp</span>
                        <span className="font-black text-sm">Europe 2024</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                    >
                        Notes from{' '}
                        <span
                            style={{ color: AMBER }}
                            className="drop-shadow-[0_4px_12px_rgba(255,204,0,0.4)] block sm:inline"
                        >
                            Die Ente
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeUp}
                        className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-lg font-light leading-relaxed"
                    >
                        Your guide to living and learning in Germany.
                    </motion.p>

                    {/* Blockquote */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col items-center gap-3 mb-8 lg:flex-row lg:items-stretch lg:text-left text-center w-full"
                    >
                        {/* Accent line: horizontal on mobile, vertical bar on desktop */}
                        <div className="h-1 w-12 lg:h-auto lg:w-1 bg-[#FFCC00] rounded-full flex-shrink-0" />
                        <blockquote className="italic text-base sm:text-lg text-white/80 max-w-sm leading-snug">
                            "Every day in Deutschland is a new chapter. I'm writing down the map, so your journey is smooth sailing."
                        </blockquote>
                    </motion.div>

                    {/* Search bar container wrapper to handle layout sizing cleanly */}
                    <div className="w-full max-w-md">
                        <HeroSearchBar onNavigate={navigate} />
                        <HeroQuickLinks />
                    </div>
                </motion.div>

                {/* RIGHT: Duck mascot wrapper */}
                <HeroMascot />
            </div>
        </section>
    );
};

export default HeroSection;