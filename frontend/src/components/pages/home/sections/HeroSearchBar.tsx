import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { useUniversity } from '../../../../contexts/UniversityContext';
import type { LocationState } from '../../../../types';

// ── DESIGN TOKENS ───────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const AMBER = '#FFCC00';
const AMBER_DIM = '#e6b800';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const } },
};
const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

// ── HERO SEARCH BAR ────────────────────────────────────────────────────────
interface SearchBarProps {
    onNavigate: (path: string) => void;
}

export const HeroSearchBar: React.FC<SearchBarProps> = ({ onNavigate }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<{ cities: any[]; universities: any[] }>({ cities: [], universities: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { setSelectedLocation } = useUniversity();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (query.trim().length < 3) { setSuggestions({ cities: [], universities: [] }); return; }
        const t = setTimeout(async () => {
            setIsLoading(true); setShowDropdown(true);
            try {
                const res = await fetch(`/api/cities/search?q=${encodeURIComponent(query)}`);
                const result = await res.json();
                if (result.status === 'success' && result.data) {
                    setSuggestions({ cities: result.data.cities || [], universities: result.data.universities || [] });
                } else if (Array.isArray(result)) {
                    setSuggestions({ cities: result, universities: [] });
                }
            } catch { /* silently fail */ }
            finally { setIsLoading(false); }
        }, 300);
        return () => clearTimeout(t);
    }, [query]);

    const handleSelect = (item: any, type: 'city' | 'university') => {
        const loc: LocationState = { id: item.id || item.city_id || item.uni_id, name: item.name || item.city_name || item.uni_name, type };
        setSelectedLocation(loc);
        setShowDropdown(false);
        setQuery('');
        onNavigate('/university');
    };

    return (
        // Full-screen overlay — sits over the hero section background
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="absolute inset-0 z-10 flex flex-col justify-center"
            style={{ padding: '5vh clamp(3rem, 8vw, 9rem) 5vh clamp(3rem, 8vw, 9rem)' }}
        >
            {/* ── UPPER ROW: Stamp+Title left | Duck right ── */}
            <motion.div
                variants={fadeUp}
                className="flex items-end justify-between w-full mb-16"
            >
                {/* LEFT: Stamp badge + Title + Subtitle */}
                <div className="flex flex-col items-start max-w-[55%]">

                    {/* Stamp badge */}
                    <div
                        className="inline-block mb-3 px-3 py-1 rounded-sm border-2 border-[#FFCC00]/60 -rotate-2 bg-[#1A2B4C]/80"
                    >
                        <span className="text-[25px] sm:text-[20px] font-bold uppercase tracking-[0.1em] text-[#FFCC00]/80">
                            Your Trip
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="flex flex-col items-start font-bold drop-shadow-xl text-[clamp(2.8rem,7vw,6.5rem)] tracking-[-0.04em]"
                    >
                        <span className="text-white">Notes from</span>
                        <span className="text-[#FFCC00] -mt-[0.6em]">
                            die Ente
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-white/75 italic tracking-tight text-[clamp(0.95rem,1.6vw,1.5rem)] max-w-[38ch] -mt-[0.6em] mb-[4em]"
                    >
                        Curiosity is your best guide - follow it to get to the bottom of things.
                    </p>
                </div>

                {/* RIGHT: Duck GIF */}
                <div className="sm:block absolute bottom-[40vh] md:bottom-[35vh] right-4 md:right-10 pointer-events-none z-10">
                    <motion.img
                        src="/duck_walking.gif"
                        alt="Duck walking"
                        className="select-none w-[clamp(160px,25vw,600px)] max-h-[50vh] h-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>

            {/* ── LOWER ROW: Search bar ── */}
            <motion.div variants={fadeUp} className="relative w-full" ref={dropdownRef}>
                <form
                    onSubmit={e => { e.preventDefault(); setShowDropdown(false); onNavigate('/university'); }}
                    className="flex w-full items-center overflow-hidden transition-all duration-300"
                    style={{
                        background: 'rgba(128,128,128,0.12)',
                        border: '2px solid rgba(255,255,255,0.55)',
                        borderRadius: '14px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    }}
                >
                    <div className="flex items-center pl-5 text-white/60">
                        <Search size={22} />
                    </div>

                    <input
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); if (e.target.value.trim().length >= 3) setShowDropdown(true); }}
                        onFocus={() => { if (query.trim().length >= 3) setShowDropdown(true); }}
                        placeholder="Los geht's! Möchten Sie den Dingen auf den Grund gehen?"
                        className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                        style={{
                            padding: 'clamp(0.9rem, 2vw, 1.4rem) 1.25rem',
                            fontSize: 'clamp(0.95rem, 1.5vw, 1.3rem)',
                        }}
                    />

                    {isLoading && (
                        <div className="flex items-center pr-4 text-white/50">
                            <Loader2 size={20} className="animate-spin" />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="font-bold whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 rounded-xl"
                        style={{
                            margin: '0.4rem',
                            padding: 'clamp(0.6rem, 1.2vw, 1rem) clamp(1.2rem, 3vw, 2.5rem)',
                            fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)',
                            backgroundColor: AMBER,
                            color: MIDNIGHT,
                            boxShadow: '0 4px 16px rgba(255,204,0,0.35)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER_DIM; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER; }}
                    >
                        Start Exploring
                    </button>
                </form>

                {/* Autocomplete dropdown */}
                <AnimatePresence>
                    {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-3 w-full rounded-2xl shadow-2xl border overflow-hidden z-50 text-left"
                            style={{ background: 'white', borderColor: 'rgba(0,0,0,0.1)' }}
                        >
                            <div className="max-h-[40vh] overflow-y-auto py-3">
                                {suggestions.universities.length > 0 && (
                                    <div className="mb-2">
                                        <div className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Universities</div>
                                        {suggestions.universities.map((uni, i) => (
                                            <button
                                                key={`uni-${uni.id || i}`}
                                                type="button"
                                                onClick={() => handleSelect(uni, 'university')}
                                                className="w-full text-left px-5 py-3 text-gray-800 transition-all duration-300 flex items-center gap-3 hover:bg-amber-50"
                                            >
                                                <span className="text-xl">🎓</span>
                                                <div>
                                                    <p className="text-[14px] font-medium">{uni.name || uni.uni_name}</p>
                                                    {uni.city_name && <p className="text-xs text-gray-500 mt-0.5">{uni.city_name}, Germany</p>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {suggestions.cities.length > 0 && (
                                    <div>
                                        <div className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Cities</div>
                                        {suggestions.cities.map((city, i) => (
                                            <button
                                                key={`city-${city.id || i}`}
                                                type="button"
                                                onClick={() => handleSelect(city, 'city')}
                                                className="w-full text-left px-5 py-3 text-gray-800 transition-all duration-300 flex items-center gap-3 hover:bg-amber-50"
                                            >
                                                <span className="text-xl">📍</span>
                                                <p className="text-[14px] font-medium">
                                                    {city.name || city.city_name}{city.state ? `, ${city.state}` : ''}, Germany
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};