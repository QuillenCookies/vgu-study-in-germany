import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

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

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exploring:', query);
  };

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

        <form
          onSubmit={handleExplore}
          className="flex w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          <div className="flex items-center pl-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you exploring today?"
            className="flex-1 px-4 py-4 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
          />
          <button
            type="submit"
            className="m-2 px-7 py-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
          >
            Explore
          </button>
        </form>

        {/* Quick tags — now using router Links */}
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
