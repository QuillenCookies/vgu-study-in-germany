import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, Users,
} from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';

import { fadeUp, stagger, GOLD, GOLD_DIM, SLATE_BODY, FROST_STROKE, CHARCOAL } from '../ui/design_tokens';

const NestSection: React.FC = () => {
    const { tr } = useLanguage();
    return (
        < section className="relative py-10 md:py-20 px-6 overflow-hidden" >

            {/* Off-white → muted cyan/sky-blue frost gradient */}
            < div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, #F9F9F7 0%, #EFF6FF 52%, #E0F2FE 100%)' }}
                aria-hidden="true" />

            {/* Thin gold divider at top */}
            < div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-px"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)` }}
                aria-hidden="true" />

            {/* Soft sky-blue ambient glow at bottom */}
            < div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
                style={{ backgroundColor: 'rgba(56,189,248,0.18)' }} aria-hidden="true" />

            {/* Subtle golden warm glow */}
            < div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[400px] h-[180px] rounded-full blur-[80px] pointer-events-none"
                style={{ backgroundColor: `${GOLD}18` }} aria-hidden="true" />

            <motion.div variants={stagger} initial="hidden" whileInView="show"
                viewport={{ once: true }}
                className="relative z-10 max-w-[640px] mx-auto text-center">

                <motion.span variants={fadeUp}
                    className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
                    style={{ background: `${GOLD}22`, color: GOLD_DIM, border: `${FROST_STROKE} solid ${GOLD}50` }}>
                    {tr('home', 'nestBadge')}
                </motion.span>

                <motion.div variants={fadeUp} className="text-4xl mb-4">🦆</motion.div>

                <motion.h2 variants={fadeUp}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
                    {tr('home', 'nestTitle')}
                </motion.h2>

                <motion.p variants={fadeUp}
                    className="text-[16px] mb-8 max-w-sm mx-auto"
                    style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
                    {tr('home', 'nestDesc')}
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">

                    {/* Primary — gold CTA, single-layer */}
                    <motion.div
                        animate={{
                            scale: [1, 1.025, 1],
                            boxShadow: [
                                `0 4px 18px ${GOLD}50`,
                                `0 6px 32px ${GOLD}80`,
                                `0 4px 18px ${GOLD}50`,
                            ],
                        }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="rounded-2xl">
                        <Link to="/community/contributor"
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-[15px] hover:brightness-105 active:scale-95 transition-all duration-200"
                            style={{
                                backgroundColor: GOLD,
                                color: CHARCOAL,
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5)`,
                            }}>
                            <Users size={17} />
                            {tr('home', 'nestBtn')}
                        </Link>
                    </motion.div>

                    {/* Secondary — frosted ghost */}
                    <Link to="/university"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-[15px] border transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                            color: CHARCOAL,
                            borderColor: 'rgba(44,51,64,0.14)',
                            background: 'rgba(255,255,255,0.55)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.borderColor = `${GOLD}70`;
                            el.style.background = `rgba(255,255,255,0.75)`;
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.borderColor = 'rgba(44,51,64,0.14)';
                            el.style.background = 'rgba(255,255,255,0.55)';
                        }}>
                        <ArrowRight size={17} />
                        {tr('home', 'nestExplore')}
                    </Link>
                </motion.div>

            </motion.div>
        </section >
    );
};

export default NestSection;