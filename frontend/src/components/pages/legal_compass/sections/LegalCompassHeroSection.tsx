import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Search
} from 'lucide-react';
import { BORDER, GOLD, NAVY } from '../ui/colors';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useLegalCompass } from '../../../../contexts/LegalCompassContext';

const LegalCompassHeroSection: React.FC = () => {
    const { tr } = useLanguage();
    const { searchQuery, setSearchQuery } = useLegalCompass();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="text-center mb-12">
            <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5 border"
                style={{ background: `${NAVY}08`, borderColor: `${NAVY}18`, color: NAVY }}
            >
                <Shield size={12} style={{ color: GOLD }} strokeWidth={2.5} />
                {tr('legalCompass', 'badge')}
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-4" style={{ color: NAVY }}>
                {tr('legalCompass', 'titleMain')}{' '}
                <span style={{ color: GOLD }}>{tr('legalCompass', 'titleHighlight')}</span>
            </h1>

            <p className="text-[16px] text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                {tr('legalCompass', 'subtitle')}
            </p>

            {/* Search */}
            <div className="mt-7 max-w-md mx-auto">
                <div className="flex items-center px-5 py-3.5 rounded-2xl border bg-white shadow-sm focus-within:shadow-md transition-all"
                    style={{ borderColor: BORDER }}>
                    <Search size={16} className="text-slate-400 flex-shrink-0 mr-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={tr('legalCompass', 'searchPlaceholder')}
                        className="flex-1 bg-transparent text-[14px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 transition-colors ml-2 text-[13px]">✕</button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LegalCompassHeroSection;