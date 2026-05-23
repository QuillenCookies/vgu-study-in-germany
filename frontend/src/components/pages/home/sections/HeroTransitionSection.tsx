import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../ui/design_tokens';

const HeroTransitionSection: React.FC = () => {
    return (
        <section
            className="relative flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, #0A1525 0%, #111E35 20%, #1B304F 38%, #2B5280 56%, #6BA8D0 74%, #C8E3F2 89%, #F2F8FC 100%)',
                minHeight: '46vh',
                padding: '5rem 1.5rem 4.5rem',
                marginTop: '-1px',
            }}
        >
            {/* Ambient amber warm glow — carries the hero's accent into the transition */}
            <div
                style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(255,204,0,0.055) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.38 }}
                className="relative text-center"
                style={{ maxWidth: '680px' }}
            >
                {/* Amber thread — visual carry-over from Hero's amber accent */}
                <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, #FFCC009A)' }} />
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFCC00', opacity: 0.80 }} />
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to left, transparent, #FFCC009A)' }} />
                </motion.div>

                {/* Section index */}
                <motion.p variants={fadeUp} style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.34em',
                    color: 'rgba(255,204,0,0.82)',
                    textTransform: 'uppercase',
                    marginBottom: '1.3rem',
                }}>
                    § 01 Wildcard · A New Chapter
                </motion.p>

                {/* Main title — all caps, editorial */}
                <motion.h2 variants={fadeUp} style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.97)',
                    lineHeight: 1.12,
                    textShadow: '0 2px 16px rgba(0,0,0,0.55), 0 6px 40px rgba(0,0,0,0.35)',
                }}>
                    LET US START <br /> OUR JOURNEY
                </motion.h2>

                {/* Amber thin rule */}
                <motion.div variants={fadeUp} style={{
                    width: '52px',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, #FFCC0088, transparent)',
                    margin: '1.6rem auto',
                }} />

                {/* Subtitle */}
                <motion.p variants={fadeUp} style={{
                    fontFamily: 'monospace',
                    fontSize: '8.5px',
                    letterSpacing: '0.28em',
                    color: 'rgba(255,255,255,0.62)',
                    textTransform: 'uppercase',
                }}>
                    DIE ENTE · THE DUCK FROM VIET DUC UNIVERSITY
                </motion.p>
            </motion.div>
        </section>
    );
}
export default HeroTransitionSection;
