import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

import { useLanguage } from '../../../../contexts/LanguageContext';
import {
    fadeUp, stagger,
    CREAM, GOLD, GOLD_DIM, SLATE_BODY, FROST_STROKE, CHARCOAL, FROST_BLUR, FROST_SHADOW,
    ALPHA_DUCKS, MentorOrb,
} from '../ui/design_tokens';

const FloatingOrbMentorSection: React.FC = () => {
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
                        {tr('home', 'mentorsBadge')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif", color: CHARCOAL }}>
                        {tr('home', 'mentorsTitle')}
                    </h2>
                    <p className="text-[15px] max-w-lg mx-auto" style={{ color: SLATE_BODY, lineHeight: 1.8 }}>
                        {tr('home', 'mentorsSlogan')}
                    </p>
                </motion.div>

                {/* White frost matrix */}
                <motion.div variants={fadeUp}
                    className="rounded-[2rem] p-6 sm:p-8"
                    style={{
                        background: 'rgba(255,255,255,0.62)',
                        backdropFilter: FROST_BLUR,
                        WebkitBackdropFilter: FROST_BLUR,
                        border: `${FROST_STROKE} solid rgba(250,204,21,0.22)`,
                        boxShadow: FROST_SHADOW,
                    }}>
                    <motion.div variants={stagger}
                        className="flex flex-wrap items-end justify-center gap-14 md:gap-20">
                        {ALPHA_DUCKS.map((duck, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <MentorOrb duck={duck} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="text-center mt-6">
                    <Link to="/community/contributor"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-[13px] transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{ color: CHARCOAL, border: `${FROST_STROKE} solid ${GOLD}65`, background: `${GOLD}12` }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}22`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}12`; }}>
                        <Users size={15} />
                        {tr('home', 'mentorsCTA')}
                    </Link>
                </motion.div>
            </motion.div>
        </section >
    );
};

export default FloatingOrbMentorSection;