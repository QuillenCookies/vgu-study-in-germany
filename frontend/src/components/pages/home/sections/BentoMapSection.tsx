import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import {
    fadeUp, stagger, MAP_STAGES, DIFFICULTY,
    CREAM, GOLD, GOLD_DIM, SLATE_BODY, FROST_STROKE, CHARCOAL,
    FROST_BG, FROST_BLUR, FROST_BORDER, FROST_SHADOW,
    STAGE_ACCENTS, SLATE_MUTED,
} from '../ui/design_tokens';

const BentoMapSection: React.FC = () => {
    const { tr } = useLanguage();
    return (
        < section className="py-10 md:py-20 px-6" style={{ backgroundColor: CREAM }}>

            {/* Section divider */}
            < div className="max-w-[1200px] mx-auto mb-8" >
                <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}35, transparent)` }} />
            </div >

            <motion.div variants={stagger} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-[1200px] mx-auto">

                {/* Header */}
                <motion.div variants={fadeUp} className="text-center mb-7">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
                        style={{ background: `${GOLD}1A`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}44` }}>
                        {tr('home', 'mapBadge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
                        {tr('home', 'mapTitle')}
                    </h2>
                    <p className="text-[15px] max-w-md mx-auto" style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
                        {tr('home', 'mapDesc')}
                    </p>
                </motion.div>

                {/* Migration path — visual axis, centred */}
                <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8 select-none">
                    {(['I', 'II', 'III', 'IV'] as const).map((n, i) => (
                        <React.Fragment key={n}>
                            <span className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                                style={{ background: `${GOLD}22`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}55` }}>
                                {n}
                            </span>
                            {i < 3 && (
                                <div className="flex gap-1.5 items-center">
                                    {[0, 1, 2, 3, 4].map(d => (
                                        <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${GOLD}40` }} />
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* Bento grid — equal-height rows, gap-8 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    style={{ gridAutoRows: '1fr' }}>
                    {MAP_STAGES.map((stage, si) => {
                        const diff = DIFFICULTY[stage.difficulty];
                        const accent = STAGE_ACCENTS[si];
                        return (
                            <motion.div key={stage.roman} variants={fadeUp}
                                className={`group relative rounded-3xl p-8 cursor-default overflow-hidden transition-all duration-300 ${stage.colClass}`}
                                style={{
                                    background: FROST_BG,
                                    backdropFilter: FROST_BLUR,
                                    WebkitBackdropFilter: FROST_BLUR,
                                    boxShadow: FROST_SHADOW,
                                    border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                                }}
                                whileHover={{
                                    y: -6,
                                    boxShadow: `0 24px 56px rgba(250,204,21,0.12), 0 6px 18px rgba(0,0,0,0.06), 0 0 0 ${FROST_STROKE} rgba(250,204,21,0.50)`,
                                }}
                                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}>

                                {/* Golden left accent bar */}
                                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
                                    style={{ backgroundColor: accent.leftBar, opacity: 0.55 }} />

                                {/* Hover fill wash */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                                    style={{ background: accent.cardHover }} />

                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Stage header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0"
                                                style={{ background: accent.iconBg, color: accent.iconColor }}>
                                                {stage.roman}
                                            </span>
                                            <p className="text-[14px] font-semibold leading-tight" style={{ color: CHARCOAL }}>
                                                {stage.emoji} {tr('home', stage.trStageLabel)}
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full"
                                            style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}>
                                            {diff.label}
                                        </span>
                                    </div>

                                    {/* Items — flex-grow fills equal height */}
                                    <ul className="flex flex-col gap-4 flex-1">
                                        {stage.items.map(item => (
                                            <li key={item.href}>
                                                <Link to={item.href} className="flex items-start gap-3 group/item">
                                                    <span className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                                                        style={{ background: accent.iconBg, color: accent.iconColor }}>
                                                        {item.icon}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-semibold transition-colors duration-200 group-hover/item:underline underline-offset-2"
                                                            style={{ color: CHARCOAL }}>
                                                            {tr('home', item.trName)}
                                                        </p>
                                                        <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: SLATE_MUTED }}>
                                                            {tr('home', item.trDesc)}
                                                        </p>
                                                    </div>
                                                    <ArrowRight size={12} className="mt-1 shrink-0 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200"
                                                        style={{ color: accent.iconColor }} />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section >
    );
};

export default BentoMapSection;