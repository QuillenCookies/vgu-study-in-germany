// HeroMarqueeLinks.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALL_STEPS } from './JourneyMapSection';

const HeroMarqueeLinks: React.FC = () => {
    const navigate = useNavigate();
    const steps = ALL_STEPS.filter((s) => s.kind === 'step' && s.href);

    // Duplicate arrays to build a seamless illusion of an endless conveyor loop
    const duplicatedSteps = [...steps, ...steps, ...steps];

    return (
        <div className="w-full mt-6 overflow-hidden bg-sky-950/80 backdrop-blur-md rounded-xl border border-white/10 relative flex items-center h-12">
            {/* Fade overlays on edges */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-sky-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-sky-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-0 whitespace-nowrap will-change-transform"
                animate={{ x: [0, -1000] }}
                transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                }}
                whileHover={{ transition: { duration: 60 } }} // Slows down when user moves mouse cursor over links
            >
                {duplicatedSteps.map((step, idx) => (
                    <button
                        key={`${step.id}-${idx}`}
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'instant' });
                            navigate(step.href!);
                        }}
                        className="px-6 text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer border-r border-white/5 h-full"
                    >
                        {step.label}
                    </button>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroMarqueeLinks;