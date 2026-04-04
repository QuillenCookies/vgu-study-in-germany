// frontend/src/components/ui/station-autocomplete.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { searchStations } from '../../../../lib/transport-api';
import type { Location } from '../../../../lib/transport-api';

interface StationAutocompleteProps {
    placeholder: string;
    value: string;
    onChange: (value: string, station?: Location) => void;
    onPickFromMapClick?: () => void;
    isMapModeActive?: boolean;
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
    placeholder, value, onChange, onPickFromMapClick, isMapModeActive
}) => {
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (value.length < 2) { setSuggestions([]); return; }
            setLoading(true);
            try {
                const results = await searchStations(value);
                setSuggestions(results);
            } catch (error) { console.error("Autocomplete failed", error); }
            finally { setLoading(false); }
        };

        // 1000ms - longer time to prevent too many requests
        const debounceTimer = setTimeout(fetchSuggestions, 1000);
        return () => clearTimeout(debounceTimer);
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative w-full ${isOpen ? 'z-50' : 'z-10'}`} ref={wrapperRef}>
            <div className="relative flex items-center">
                <MapPin className={`absolute left-4 w-5 h-5 transition-colors ${isMapModeActive ? 'text-[#f97316]' : 'text-gray-400'}`} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent bg-white text-gray-900 shadow-sm
            ${isMapModeActive ? 'border-[#f97316] ring-2 ring-[#f97316]/20' : 'border-gray-200 hover:border-gray-300'}`}
                    value={value}
                    onChange={(e) => { onChange(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                />
                {onPickFromMapClick && (
                    <button
                        type="button"
                        onClick={onPickFromMapClick}
                        className={`absolute right-2 p-2 rounded-lg transition-all ${isMapModeActive ? 'bg-[#f97316] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                        title="Pick from map"
                    >
                        <MapPin className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isOpen && (suggestions.length > 0 || loading) && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="p-4 flex justify-center text-gray-400"><Loader2 className="w-5 h-5 animate-spin" /></div>
                    ) : (
                        suggestions.map((station) => (
                            <div
                                key={station.id}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                                onClick={() => { onChange(station.name, station); setIsOpen(false); }}
                            >
                                <p className="font-medium text-gray-700">{station.name}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};