import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../ui/design_tokens';

const HeroTransitionSection: React.FC = () => {
    return (
        <section
            className="flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(to bottom, #111E35 0%, #1A2B4C 18%, #243756 38%, #3D5872 58%, #8CAABE 76%, #C4D3E0 90%, #DDE6F4 100%)',
                minHeight: '46vh',
                padding: '5rem 1.5rem 4.5rem',
                marginTop: '-1px',
            }}
        >
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.38 }}
                className="text-center"
                style={{ maxWidth: '680px' }}
            >
                {/* Amber thread — visual carry-over from Hero's amber accent */}
                <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, #FFCC0066)' }} />
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFCC00', opacity: 0.55 }} />
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to left, transparent, #FFCC0066)' }} />
                </motion.div>

                {/* Section index */}
                <motion.p variants={fadeUp} style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.34em',
                    color: 'rgba(255,204,0,0.42)',
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
                    color: 'rgba(255,255,255,0.91)',
                    lineHeight: 1.12,
                    textShadow: '0 4px 28px rgba(0,0,0,0.4)',
                }}>
                    LET US START <br /> OUR JOURNEY
                </motion.h2>

                {/* Amber thin rule */}
                <motion.div variants={fadeUp} style={{
                    width: '52px',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, #FFCC0055, transparent)',
                    margin: '1.6rem auto',
                }} />

                {/* Subtitle */}
                <motion.p variants={fadeUp} style={{
                    fontFamily: 'monospace',
                    fontSize: '8.5px',
                    letterSpacing: '0.28em',
                    color: 'rgba(255,255,255,0.24)',
                    textTransform: 'uppercase',
                }}>
                    DIE ENTE · THE DUCK FROM VIET DUC UNIVERSITY
                </motion.p>
            </motion.div>
        </section >
    );
}
export default HeroTransitionSection;