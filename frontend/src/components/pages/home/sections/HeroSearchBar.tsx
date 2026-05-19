import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { useUniversity } from '../../../../contexts/UniversityContext';
import type { LocationState } from '../../../../types';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const } },
};

// ── HERO SEARCH BAR ────────────────────────────────────────────────────────
interface SearchBarProps {
    onNavigate: (path: string) => void;
}

/**
 * Oval-pill search bar for the hero section.
 * - Outer container: white background, rounded-full (pill shape)
 * - Placeholder: "What intrigues you?" in grey
 * - CTA button: rounded-full, amber (#FFCC00) background, black text
 */
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
        <motion.div variants={fadeUp} className="relative w-full max-w-2xl" ref={dropdownRef}>
            {/* ── Pill-shaped search form ── */}
            <form
                onSubmit={e => { e.preventDefault(); setShowDropdown(false); onNavigate('/university'); }}
                className="flex w-full items-center bg-white rounded-full shadow-2xl border border-white/20 overflow-hidden transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_rgba(255,204,0,0.35)]"
            >
                {/* Search icon */}
                <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
                    <Search size={20} />
                </div>

                {/* Text input */}
                <input
                    type="text"
                    value={query}
                    onChange={e => { setQuery(e.target.value); if (e.target.value.trim().length >= 3) setShowDropdown(true); }}
                    onFocus={() => { if (query.trim().length >= 3) setShowDropdown(true); }}
                    placeholder="What intrigues you?"
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none py-4 text-base"
                />

                {/* Loading spinner */}
                {isLoading && (
                    <div className="flex items-center pr-4 text-gray-400 flex-shrink-0">
                        <Loader2 size={18} className="animate-spin" />
                    </div>
                )}

                {/* CTA button — oval, amber */}
                <button
                    type="submit"
                    className="flex-shrink-0 m-1.5 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-bold text-sm hover:brightness-105 active:scale-95 transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap"
                >
                    Start Exploring
                </button>
            </form>

            {/* ── Autocomplete dropdown ── */}
            <AnimatePresence>
                {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-3 w-full rounded-2xl shadow-2xl border border-black/10 bg-white overflow-hidden z-50 text-left"
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
                                            className="w-full text-left px-5 py-3 text-gray-800 transition-colors duration-200 flex items-center gap-3 hover:bg-amber-50"
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
                                            className="w-full text-left px-5 py-3 text-gray-800 transition-colors duration-200 flex items-center gap-3 hover:bg-amber-50"
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
    );
};