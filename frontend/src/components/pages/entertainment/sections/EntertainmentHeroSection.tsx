import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { STATS } from '../knowledge/data';

const EntertainmentHeroSection: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section
            className="relative w-full flex items-center justify-center"
            style={{ minHeight: '60vh' }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80)',
                }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0533]/80 via-[#1a0533]/60 to-[#1a0533]/40" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full max-w-4xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {tr('entertainment', 'backHome')}
                </Link>

                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-500/30 text-purple-200 text-sm font-medium tracking-wide backdrop-blur-sm border border-purple-400/30">
                    {tr('entertainment', 'badge')}
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                    {tr('entertainment', 'title1')}{' '}
                    <span className="text-purple-400">{tr('entertainment', 'title2')}</span>
                </h1>

                <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl">
                    {tr('entertainment', 'desc')}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                            <div className="flex justify-center mb-1 text-purple-300">{stat.icon}</div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-white/70 mt-0.5">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default EntertainmentHeroSection;