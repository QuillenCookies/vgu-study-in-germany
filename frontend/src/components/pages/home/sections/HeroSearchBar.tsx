import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { useUniversity } from '../../../../contexts/UniversityContext';
import type { LocationState } from '../../../../types';

// ── DESIGN TOKENS ───────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const DEEP_NAVY = '#0D1226';
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

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Debounced search
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
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full"
            style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}
        >
            {/* ── HORIZONTAL GRADIENT OVERLAY (left edge) ── */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(to right, ${DEEP_NAVY} 0%, ${DEEP_NAVY}CC 8%, transparent 22%)`,
                    borderRadius: '16px',
                    margin: '-2rem -1.5rem',
                    padding: '2rem 1.5rem',
                }}
                aria-hidden="true"
            />

            {/* ── UPPER SECTION: Title-stamp (left) + Duck GIF (right) ── */}
            <motion.div
                variants={fadeUp}
                className="relative z-10 flex items-end justify-between gap-6 mb-8"
            >
                {/* Left: Stamp */}
                <div className="flex flex-col items-start">
                    {/* Stamp badge */}
                    <div
                        className="inline-block mb-2 px-3 py-1 rounded-sm"
                        style={{
                            border: `2px solid ${AMBER}60`,
                            transform: 'rotate(-2deg)',
                            background: `${MIDNIGHT}80`,
                        }}
                    >
                        <span
                            className="text-[11px] font-bold uppercase tracking-[0.2em]"
                            style={{ color: `${AMBER}CC` }}
                        >
                            Note from die Ente
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-xl"
                        style={{ lineHeight: 1.1 }}
                    >
                        <span className="text-white">Notes from</span>
                        <br />
                        <span style={{ color: AMBER }}>die Ente</span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="mt-3 text-sm sm:text-base text-white/70 max-w-sm leading-relaxed italic"
                        style={{ lineHeight: 1.6 }}
                    >
                        Curiosity is your best guide — follow it to get to the bottom of things.
                    </p>
                </div>

                {/* Right: Duck GIF */}
                <div className="relative flex-shrink-0 hidden sm:block" style={{ marginBottom: '-0.5rem' }}>
                    <motion.img
                        src="/duck_walking.gif"
                        alt="Duck walking"
                        className="select-none"
                        style={{
                            width: '140px',
                            height: 'auto',
                            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
                        }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>

            {/* ── LOWER SECTION: Search bar ── */}
            <motion.div variants={fadeUp} className="relative z-10 w-full" ref={dropdownRef}>
                <form
                    onSubmit={e => { e.preventDefault(); setShowDropdown(false); onNavigate('/university'); }}
                    className="flex w-full items-center overflow-hidden transition-all duration-300"
                    style={{
                        background: 'rgba(128,128,128,0.10)',
                        border: '1.5px solid rgba(255,255,255,0.55)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
                    }}
                >
                    {/* Search icon */}
                    <div className="flex items-center pl-4 text-white/60">
                        <Search size={18} />
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); if (e.target.value.trim().length >= 3) setShowDropdown(true); }}
                        onFocus={() => { if (query.trim().length >= 3) setShowDropdown(true); }}
                        placeholder="Los geht's! Möchten Sie den Dingen auf den Grund gehen?"
                        className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/50 text-[15px] outline-none"
                    />

                    {/* Loader */}
                    {isLoading && (
                        <div className="flex items-center pr-3 text-white/50">
                            <Loader2 size={17} className="animate-spin" />
                        </div>
                    )}

                    {/* CTA button */}
                    <button
                        type="submit"
                        className="m-2 px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 text-[14px] whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                            backgroundColor: AMBER,
                            color: MIDNIGHT,
                            boxShadow: '0 4px 14px rgba(255,204,0,0.35)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER_DIM; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER; }}
                    >
                        Start Exploring
                    </button>
                </form>

                {/* ── Autocomplete dropdown ── */}
                <AnimatePresence>
                    {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 w-full rounded-lg shadow-2xl border overflow-hidden z-50 text-left"
                            style={{
                                background: 'white',
                                borderColor: 'rgba(0,0,0,0.08)',
                            }}
                        >
                            <div className="max-h-72 overflow-y-auto py-2">
                                {suggestions.universities.length > 0 && (
                                    <div className="mb-1">
                                        <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Universities</div>
                                        {suggestions.universities.map((uni, i) => (
                                            <button
                                                key={`uni-${uni.id || i}`}
                                                type="button"
                                                onClick={() => handleSelect(uni, 'university')}
                                                className="w-full text-left px-4 py-2.5 text-gray-800 transition-all duration-300 flex items-center gap-3 hover:bg-amber-50"
                                            >
                                                <span className="text-lg">🎓</span>
                                                <div>
                                                    <p className="text-[13px] font-medium">{uni.name || uni.uni_name}</p>
                                                    {uni.city_name && <p className="text-[11px] text-gray-400">{uni.city_name}, Germany</p>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {suggestions.cities.length > 0 && (
                                    <div>
                                        <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cities</div>
                                        {suggestions.cities.map((city, i) => (
                                            <button
                                                key={`city-${city.id || i}`}
                                                type="button"
                                                onClick={() => handleSelect(city, 'city')}
                                                className="w-full text-left px-4 py-2.5 text-gray-800 transition-all duration-300 flex items-center gap-3 hover:bg-amber-50"
                                            >
                                                <span className="text-lg">📍</span>
                                                <p className="text-[13px] font-medium">
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