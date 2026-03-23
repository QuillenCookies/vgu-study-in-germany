import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { useUniversity } from '../context/UniversityContext';

import type { LocationState } from '../context/UniversityContext';

const HERO_BG =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';

const quickLinks = [
  { label: '🏛 Universities', href: '/university' },
  { label: '🚆 Transport', href: '/bahn' },
  { label: '🏠 Housing', href: '/housing' },
  { label: '🍔 Food', href: '/food' },
  { label: '🎭 Entertainment', href: '/entertainment' },
];

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ cities: any[]; universities: any[] }>({ cities: [], universities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Pull selectedLocation to use in our placeholder
  const { selectedLocation, setSelectedLocation } = useUniversity();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // 2. Search engine: only trigger after 3 characters
    if (query.trim().length < 3) {
      setSuggestions({ cities: [], universities: [] });
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setShowDropdown(true);
      try {
        const res = await fetch(`/api/cities/search?q=${encodeURIComponent(query)}`);
        const result = await res.json();

        if (result.status === 'success' && result.data) {
          setSuggestions({
            cities: result.data.cities || [],
            universities: result.data.universities || []
          });
        } else if (Array.isArray(result)) {
          setSuggestions({
            cities: result || [],
            universities: []
          });
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelectLocation = (item: any, type: 'city' | 'university') => {
    const locationState: LocationState = {
      id: item.id || item.city_id || item.uni_id,
      name: item.name || item.city_name || item.uni_name,
      type
    };

    // Save to context to persist across pages
    setSelectedLocation(locationState);
    setShowDropdown(false);

    // Clear the search bar so the new placeholder takes over visually
    setQuery('');

    navigate('/university');
  };

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();

    // Close the dropdown and navigate to university
    setShowDropdown(false);
    navigate('/university');
  };

  // 4. Dynamic Hero Message based on Context
  const searchPlaceholder = selectedLocation?.name
    ? `What are you exploring today in ${selectedLocation.name}?`
    : "What are you exploring today?";

  return (
    <section className="relative w-full flex items-center justify-center" style={{ minHeight: '85vh' }}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#0a2463]/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 w-full max-w-3xl mx-auto">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-sm">
          🎓 Your Guide to Student Life in Germany
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Discover Life in{' '}
          <span className="text-[#f97316]">Germany</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-xl">
          Everything an international student needs — universities, housing, transport, food & entertainment.
        </p>

        <div className="relative w-full max-w-2xl" ref={dropdownRef}>
          <form
            onSubmit={handleExplore}
            className="flex w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="flex items-center pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                // Only show dropdown if they have typed enough
                if (e.target.value.trim().length >= 3) setShowDropdown(true);
              }}
              onFocus={() => {
                if (query.trim().length >= 3) setShowDropdown(true);
              }}
              placeholder={searchPlaceholder}
              className="flex-1 px-4 py-4 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
            />
            {isLoading && (
              <div className="flex items-center pr-4 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin text-[#f97316]" />
              </div>
            )}
            <button
              type="submit"
              className="m-2 px-7 py-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
            >
              Explore
            </button>
          </form>

          {/* Dropdown Suggestions */}
          {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
              <div className="max-h-80 overflow-y-auto py-2">

                {/* Universities */}
                {suggestions.universities.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Universities</div>
                    {suggestions.universities.map((uni, idx) => (
                      <button
                        key={`uni-${uni.id || uni.uni_id || idx}`}
                        type="button"
                        onClick={() => handleSelectLocation(uni, 'university')}
                        className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 focus:bg-orange-50 focus:outline-none transition-colors flex flex-col"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🎓</span>
                          <span className="font-medium">{uni.name || uni.uni_name}</span>
                        </div>
                        {uni.city_name && (
                          <span className="text-sm text-gray-500 ml-9">{uni.city_name}, Germany</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Cities */}
                {suggestions.cities.length > 0 && (
                  <div>
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Cities</div>
                    {suggestions.cities.map((city, idx) => (
                      <button
                        key={`city-${city.id || city.city_id || idx}`}
                        type="button"
                        onClick={() => handleSelectLocation(city, 'city')}
                        className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 focus:bg-orange-50 focus:outline-none transition-colors flex items-center gap-3"
                      >
                        <span className="text-xl">📍</span>
                        <span className="font-medium">
                          {/* Format: Frankfurt, Hesse, Germany */}
                          {city.name || city.city_name}
                          {city.state ? `, ${city.state}` : ''}, Germany
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          {quickLinks.map((tag) => (
            <Link
              key={tag.label}
              to={tag.href}
              className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;