import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSearchBar } from './HeroSearchBar';
import { MIDNIGHT } from '../ui/design_tokens';

// Frankfurt's New Old Town (Masood Aslami)
export const HERO_BG =
    'https://images.pexels.com/photos/20101886/pexels-photo-20101886.jpeg';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: `url(${HERO_BG})` }}
                aria-hidden="true"
            />
            {/* Midnight Blue overlays */}
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to bottom, ${MIDNIGHT}CC, ${MIDNIGHT}99, ${MIDNIGHT}CC)`
            }} aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />

            {/* Horizontal dark-blue gradient (left edge) */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    background: 'linear-gradient(to right, #0D1226 0%, #0D1226CC 8%, transparent 40%)',
                }}
                aria-hidden="true"
            />

            {/* HeroSearchBar fills the entire hero section */}
            <HeroSearchBar onNavigate={navigate} />
        </section>
    );
};

export default HeroSection;