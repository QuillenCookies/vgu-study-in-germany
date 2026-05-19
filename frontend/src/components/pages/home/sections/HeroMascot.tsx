// HeroMascot.tsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroMascot — Animated GIF duck mascot for the hero section.
 * Hidden on viewports smaller than `lg` to preserve screen real estate.
 */
const HeroMascot: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        className="hidden lg:block relative flex-shrink-0 w-full max-w-[320px] xl:max-w-[400px]"
        aria-hidden="true"
    >
        <img
            src="/duck_walking.gif"
            alt="Walking Duck Mascot"
            className="w-full h-auto object-contain drop-shadow-2xl"
        />
    </motion.div>
);

export default HeroMascot;