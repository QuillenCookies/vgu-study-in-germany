import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../../contexts/LanguageContext';


import {
    fadeUp, stagger,
    CREAM, GOLD, GOLD_DIM, SLATE_BODY, FROST_STROKE, CHARCOAL,
    FROST_BG, FROST_BLUR, FROST_BORDER, FROST_SHADOW,
    BULLETIN_CARDS,
} from '../ui/design_tokens';

const BulletinBoardSection: React.FC = () => {
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
                        {tr('home', 'quacksBadge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
                        {tr('home', 'quacksTitle')}
                    </h2>
                </motion.div>

                {/* 3-column centred grid — each card capped at 380px, gravity centred */}
                <motion.div variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {BULLETIN_CARDS.map((card, i) => (
                        <motion.div key={i} variants={fadeUp} className="w-full max-w-[380px]"
                            style={{ transformOrigin: 'center bottom' }}>

                            {card.type === 'note' ? (

                                /* ── Frosted stationery note card ── */
                                <motion.div
                                    whileHover={{ y: -6, boxShadow: `0 24px 50px rgba(0,0,0,0.07), 0 0 0 ${FROST_STROKE} ${GOLD}55` }}
                                    transition={{ duration: 0.22 }}
                                    className="rounded-3xl p-7 h-full"
                                    style={{
                                        background: FROST_BG,
                                        backdropFilter: FROST_BLUR,
                                        WebkitBackdropFilter: FROST_BLUR,
                                        border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                                        boxShadow: FROST_SHADOW,
                                    }}>
                                    {/* macOS dots */}
                                    <div className="flex items-center gap-1.5 mb-5">
                                        {['#f87171', '#fbbf24', '#4ade80'].map(c => (
                                            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: 0.65 }} />
                                        ))}
                                    </div>
                                    <p className="font-mono text-[10px] font-bold mb-2 tracking-wider"
                                        style={{ color: (card as any).tagColor }}>
                                        {card.tag}
                                    </p>
                                    <p className="font-mono text-[18px] font-bold mb-3 leading-tight" style={{ color: CHARCOAL }}>
                                        $ {card.germanWord}
                                    </p>
                                    <p className="text-[13px] leading-relaxed" style={{ color: SLATE_BODY, lineHeight: 1.75 }}>
                                        {tr('home', card.trContent)}
                                    </p>
                                </motion.div>

                            ) : (

                                /* ── Frosted pastel sticky note — rotation preserves centre of gravity ── */
                                <motion.div
                                    whileHover={{ y: -6, rotate: 0, boxShadow: `0 24px 50px rgba(0,0,0,0.07), 0 0 0 ${FROST_STROKE} ${GOLD}50` }}
                                    transition={{ duration: 0.22 }}
                                    className="rounded-2xl p-6 h-full"
                                    style={{
                                        background: `color-mix(in srgb, ${(card as any).bg} 68%, rgba(255,255,255,0.80) 32%)`,
                                        backdropFilter: FROST_BLUR,
                                        WebkitBackdropFilter: FROST_BLUR,
                                        transform: `rotate(${(card as any).rotate ?? '0deg'})`,
                                        border: `${FROST_STROKE} solid ${FROST_BORDER}`,
                                        boxShadow: FROST_SHADOW,
                                    }}>
                                    <p className="font-mono text-[10px] font-bold mb-3 tracking-wider"
                                        style={{ color: 'rgba(44,51,64,0.45)' }}>
                                        {card.tag}
                                    </p>
                                    <p className="font-mono text-[18px] font-bold mb-2 leading-tight" style={{ color: CHARCOAL }}>
                                        {card.germanWord}
                                    </p>
                                    <p className="text-[13px] leading-relaxed" style={{ color: '#334155', lineHeight: 1.75 }}>
                                        {tr('home', card.trContent)}
                                    </p>
                                </motion.div>

                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section >
    );
};

export default BulletinBoardSection;