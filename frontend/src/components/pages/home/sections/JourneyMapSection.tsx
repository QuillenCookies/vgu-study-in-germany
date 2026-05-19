import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, stagger, CHARCOAL, CREAM, SLATE_BODY, GermanFlagDuckSVG, FootprintSVG } from '../ui/design_tokens';
import { useLanguage } from '../../../../contexts/LanguageContext';

// ── S-CURVE LAYOUT: unified px coordinate space ──────────────────────────────
// The design canvas is JM_CW × JM_CH px. Both the SVG element and the HTML node
// cards use these same pixel values, so they are ALWAYS perfectly aligned.
const JM_CW = 700;              // design canvas width (px)
const JM_CENTER_X = 350;        // horizontal midpoint
const JM_AMP = 210;             // ± sinusoidal oscillation (px)
const JM_Y_STEP = 82;           // equal vertical gap between each node (px)

export interface StepDef {
    id: string;
    kind: 'step' | 'section';
    num?: number;
    roman?: string;
    label: string;
    sub: string;
    href?: string;
}

export const ALL_STEPS: StepDef[] = [
    { kind: 'section', id: 'sec-I', roman: 'I', label: 'Preparing the Wings', sub: 'Documents & applications' },
    { kind: 'step', id: 'edu', num: 1, label: 'Education', sub: 'Knowledge Lake', href: '/university' },
    { kind: 'step', id: 'legal', num: 2, label: 'Legal Compass', sub: 'Orientation Compass', href: '/explore/legal' },
    { kind: 'step', id: 'lib', num: 3, label: 'Library', sub: 'The Archive', href: '/explore/library' },
    { kind: 'section', id: 'sec-II', roman: 'II', label: 'Building the Nest', sub: 'Setting up your home' },
    { kind: 'step', id: 'hous', num: 4, label: 'Housing', sub: 'Shelter Burrow', href: '/housing' },
    { kind: 'step', id: 'health', num: 5, label: 'Health', sub: 'Recovery Station', href: '/explore/health' },
    { kind: 'section', id: 'sec-III', roman: 'III', label: 'Daily Survival', sub: 'Life in Germany' },
    { kind: 'step', id: 'food', num: 6, label: 'Food', sub: 'The Grocery Store', href: '/food' },
    { kind: 'step', id: 'trans', num: 7, label: 'Transport', sub: 'Migration Tracks', href: '/bahn' },
    { kind: 'step', id: 'ent', num: 8, label: 'Entertainment', sub: 'The Dance Club', href: '/entertainment' },
    { kind: 'section', id: 'sec-IV', roman: 'IV', label: 'Flying Further', sub: 'Career & finances' },
    { kind: 'step', id: 'career', num: 9, label: 'Career', sub: 'Takeoff Strip', href: '/explore/career' },
    { kind: 'step', id: 'salary', num: 10, label: 'Salary', sub: "The Duck's Purse", href: '/explore/salary' },
];

type Pt = { x: number; y: number };

// All 14 nodes — equal vertical spacing, sinusoidal horizontal S-curve
const JM_NODE_POS: Pt[] = ALL_STEPS.map((_, i) => ({
    x: JM_CENTER_X + JM_AMP * Math.sin(i * 0.88 - 0.4),
    y: 52 + i * JM_Y_STEP,
}));
const JM_CH = 52 + (ALL_STEPS.length - 1) * JM_Y_STEP + 64;

// ── Catmull-Rom → cubic-bezier segments (for smooth footprint placement) ─────
interface BezSeg { p1: Pt; cp1: Pt; cp2: Pt; p2: Pt; }
function buildBezSegs(pts: Pt[], tension = 0.36): BezSeg[] {
    const p = [pts[0], ...pts, pts[pts.length - 1]];
    return pts.slice(0, -1).map((_, i) => ({
        p1: p[i + 1],
        cp1: { x: p[i + 1].x + (p[i + 2].x - p[i].x) * tension, y: p[i + 1].y + (p[i + 2].y - p[i].y) * tension },
        cp2: { x: p[i + 2].x - (p[i + 3].x - p[i + 1].x) * tension, y: p[i + 2].y - (p[i + 3].y - p[i + 1].y) * tension },
        p2: p[i + 2],
    }));
}
function bezPt(s: BezSeg, t: number): Pt {
    const u = 1 - t;
    return {
        x: u * u * u * s.p1.x + 3 * u * u * t * s.cp1.x + 3 * u * t * t * s.cp2.x + t * t * t * s.p2.x,
        y: u * u * u * s.p1.y + 3 * u * u * t * s.cp1.y + 3 * u * t * t * s.cp2.y + t * t * t * s.p2.y,
    };
}
function bezTan(s: BezSeg, t: number): Pt {
    const u = 1 - t;
    return {
        x: 3 * u * u * (s.cp1.x - s.p1.x) + 6 * u * t * (s.cp2.x - s.cp1.x) + 3 * t * t * (s.p2.x - s.cp2.x),
        y: 3 * u * u * (s.cp1.y - s.p1.y) + 6 * u * t * (s.cp2.y - s.cp1.y) + 3 * t * t * (s.p2.y - s.cp2.y),
    };
}
const JM_BEZ_SEGS = buildBezSegs(JM_NODE_POS);

// ── NODE CARD ─────────────────────────────────────────────────────────────────
const JM_ICON = 50;   // icon button size (px)
const JM_CARD = 168;  // label card width (px)
const JM_STUB = 12;   // gap between icon and card (px)

const JMNode: React.FC<{ step: StepDef; pos: Pt }> = ({ step, pos }) => {
    const navigate = useNavigate();
    const isSection = step.kind === 'section';
    // Cards extend AWAY from the center
    const onRight = pos.x >= JM_CENTER_X;

    const handleClick = () => {
        if (step.href) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            navigate(step.href);
        }
    };

    // Icon sits centered on pos; card extends left or right
    const iconLeft = pos.x - JM_ICON / 2;
    const cardLeft = onRight
        ? iconLeft + JM_ICON + JM_STUB        // card to the right
        : iconLeft - JM_STUB - JM_CARD;       // card to the left

    return (
        <>
            {/* ── Icon button ── */}
            <div style={{ position: 'absolute', left: iconLeft, top: pos.y - JM_ICON / 2, zIndex: 4 }}>
                {isSection ? (
                    <div style={{
                        width: JM_ICON, height: JM_ICON, borderRadius: '14px',
                        background: '#fff5f0',
                        border: '2px dashed #fca5a5',
                        boxShadow: '0 4px 12px rgba(239,68,68,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: '22px' }}>🚩</span>
                    </div>
                ) : (
                    <button
                        onClick={handleClick}
                        className="transition-all duration-150 active:translate-y-[1px] hover:brightness-105 touch-manipulation"
                        style={{
                            width: JM_ICON, height: JM_ICON, borderRadius: '13px',
                            background: 'linear-gradient(135deg,#fdf6ec,#faebd5)',
                            border: '2px dashed #c9985d',
                            borderBottom: '4px solid #b07840',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.10)',
                            fontFamily: 'inherit', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        aria-label={step.label}
                    >
                        <span style={{ fontSize: '19px', fontWeight: 900, color: '#7a5430', fontFamily: "'Courier New', monospace" }}>
                            {step.num}
                        </span>
                    </button>
                )}
            </div>

            {/* ── Label card ── */}
            <div style={{
                position: 'absolute',
                left: cardLeft,
                top: pos.y - JM_ICON / 2,
                width: JM_CARD,
                zIndex: 4,
                borderRadius: '13px',
                background: isSection ? 'rgba(255,248,246,0.97)' : 'rgba(253,250,242,0.97)',
                border: `1.5px solid ${isSection ? '#fecaca' : '#e8d4a8'}`,
                padding: '8px 12px',
                boxShadow: '0 3px 14px rgba(0,0,0,0.07)',
            }}>
                <div style={{
                    fontSize: '11px', fontWeight: 800, lineHeight: 1.3, marginBottom: '3px',
                    color: isSection ? '#b91c1c' : '#1e3a5f',
                    fontFamily: "'Courier New', monospace",
                }}>
                    {isSection ? `§${step.roman} — ${step.label}` : step.label}
                </div>
                <div style={{
                    fontSize: '9px', color: isSection ? '#dc2626' : '#4a6fa5',
                    fontFamily: "'Courier New', monospace", opacity: 0.75, fontStyle: 'italic',
                }}>
                    {step.sub}
                </div>
            </div>
        </>
    );
};

const JourneyMap: React.FC = () => (
    <div
        className="w-full rounded-3xl overflow-hidden"
        style={{
            background: 'linear-gradient(160deg,#fdf9f3 0%,#f7f2e8 45%,#f0edf8 100%)',
            border: '2px dashed #d4b896',
            position: 'relative',
            padding: '20px 12px 28px',
        }}
    >
        {/* Faint graph-paper watermark */}
        <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
            backgroundImage:
                'repeating-linear-gradient(0deg,#6b5a44 0px,#6b5a44 1px,transparent 1px,transparent 34px),' +
                'repeating-linear-gradient(90deg,#6b5a44 0px,#6b5a44 1px,transparent 1px,transparent 34px)',
        }} />

        {/* ── Canvas: SAME px coordinate space for SVG footprints + HTML cards ── */}
        <div style={{ overflowX: 'auto' }}>
            <div style={{
                position: 'relative',
                width: JM_CW,
                height: JM_CH,
                margin: '0 auto',
            }}>
                {/* SVG layer: duck footprints only (NO stroke line), drawn on actual bezier curve */}
                <svg
                    width={JM_CW}
                    height={JM_CH}
                    viewBox={`0 0 ${JM_CW} ${JM_CH}`}
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
                >
                    {JM_BEZ_SEGS.flatMap((seg, si) =>
                        ([0.22, 0.50, 0.78] as const).map((t, j) => {
                            const pt = bezPt(seg, t);
                            const tan = bezTan(seg, t);
                            const angle = Math.atan2(tan.y, tan.x) * (180 / Math.PI);
                            const side = j % 2 === 0 ? 1 : -1;
                            const perpRad = (angle + 90) * (Math.PI / 180);
                            const px = pt.x + Math.cos(perpRad) * 7 * side;
                            const py = pt.y + Math.sin(perpRad) * 7 * side;
                            const rot = angle + 90 + (side < 0 ? 180 : 0);
                            return (
                                <image
                                    key={`fp-${si}-${j}`}
                                    href="/duck_fp.png"
                                    x={px - 8} y={py - 8}
                                    width="16" height="16"
                                    opacity="0.44"
                                    transform={`rotate(${rot.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})`}
                                />
                            );
                        })
                    )}
                </svg>

                {/* HTML layer: icon buttons + label cards — same px positions as SVG footprints */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                    {ALL_STEPS.map((step, i) => (
                        <JMNode key={step.id} step={step} pos={JM_NODE_POS[i]} />
                    ))}
                </div>
            </div>
        </div>

        {/* Legend */}
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '18px',
            marginTop: '18px', paddingTop: '14px',
            borderTop: '1.5px dashed #d4b896',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ fontSize: '16px' }}>🚩</span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#6b5a44', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Section</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <img src="/duck_fp.png" alt="" style={{ width: 14, height: 14, opacity: 0.48 }} />
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#6b5a44', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Duck Path</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '22px', height: '15px', borderRadius: '5px', background: 'linear-gradient(135deg,#fdf6ec,#faebd5)', border: '1.5px dashed #c9985d' }} />
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#6b5a44', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Checkpoint</span>
            </div>
        </div>
    </div>
);

const JourneyMapSection: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section>
            <section className="py-16 md:py-28" style={{
                background: 'linear-gradient(to bottom, #DDE6F4 0%, #E8EEF8 18%, #EEF0F5 38%, #F3EEE8 62%, #F9F3EB 82%, #FDF9F4 100%)',
            }}>
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="max-w-[960px] mx-auto px-8 md:px-12">

                    <div className="flex flex-col md:flex-row">

                        {/* ── LEFT 70% — book text column ── */}
                        <div className="flex-[7] py-8 md:pr-14 flex flex-col">

                            {/* Main heading — large italic serif */}
                            <h2 className="mb-5" style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: 'clamp(2.7rem, 5vw, 3.9rem)',
                                fontStyle: 'italic',
                                fontWeight: 700,
                                color: '#201E1A',
                                lineHeight: 1.04,
                                letterSpacing: '-0.01em',
                            }}>
                                Why "Die Ente"?
                            </h2>

                            {/* Thin rule */}
                            <div className="mb-6" style={{ height: '0.75px', background: 'rgba(0,0,0,0.12)' }} />

                            {/* Lead paragraph — slightly larger, lighter */}
                            <p className="mb-5" style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '15.5px',
                                fontWeight: 300,
                                color: '#4A4540',
                                lineHeight: 1.78,
                            }}>
                                {tr('home', 'philosophyAbove')}
                            </p>

                            {/* Body paragraphs */}
                            {(['philosophyPara1', 'philosophyPara2', 'philosophyPara3'] as const).map((key, i) => (
                                <p key={key}
                                    className={i < 2 ? 'mb-[1.45rem]' : ''}
                                    dangerouslySetInnerHTML={{ __html: tr('home', key) }}
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14.5px',
                                        lineHeight: 1.92,
                                        color: '#3A3530',
                                    }} />
                            ))}

                            {/* Folio footer */}
                            <div className="mt-8 pt-4 flex items-center gap-3"
                                style={{ borderTop: '0.75px solid rgba(0,0,0,0.1)' }}>
                                <p className="uppercase" style={{
                                    fontSize: '9.5px', letterSpacing: '0.2em',
                                    color: '#7A7468', fontFamily: 'monospace',
                                }}>
                                    EST. 2026 · GERMANY & VIETNAM
                                </p>
                                <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: '10px', lineHeight: 1 }}>·</span>
                                <p style={{
                                    fontSize: '9.5px', color: '#9A9080',
                                    fontFamily: 'monospace', letterSpacing: '0.16em',
                                }}>
                                    THE ORIGIN STORY
                                </p>
                            </div>
                        </div>

                        {/* Vertical gutter — thin book rule */}
                        <div className="hidden md:block w-px self-stretch mx-3"
                            style={{ background: 'rgba(0,0,0,0.09)' }} />

                        {/* ── RIGHT 30% — German flag duck ── */}
                        <div className="flex-[3] py-8 md:pl-12 flex flex-col items-center justify-center">

                            <motion.div
                                className="w-full max-w-[260px] flex flex-col items-center"
                                animate={{ y: [0, -9, 0] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>

                                <GermanFlagDuckSVG style={{ width: '100%', height: 'auto' }} />

                                {/* Thin separator */}
                                <div className="w-full mt-5 mb-3" style={{
                                    height: '0.75px',
                                    background: 'linear-gradient(to right, transparent, rgba(178,138,50,0.42), transparent)',
                                }} />

                                {/* DIE ENTE label */}
                                <p className="text-center font-mono uppercase"
                                    style={{ fontSize: '9.5px', letterSpacing: '0.26em', color: '#8A8070' }}>
                                    DIE ENTE
                                </p>

                                {/* Heritage oval badge */}
                                <div className="mt-3">
                                    <svg viewBox="0 0 96 40" width="86" height="36" aria-hidden="true">
                                        <ellipse cx="48" cy="20" rx="44" ry="17" stroke="#B0A080" strokeWidth="0.85" fill="none" opacity="0.48" />
                                        <ellipse cx="48" cy="20" rx="37" ry="12" stroke="#B0A080" strokeWidth="0.5" fill="none" opacity="0.28" />
                                        <circle cx="10" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                                        <circle cx="86" cy="20" r="1.4" fill="#B0A080" opacity="0.38" />
                                        <text x="48" y="16.5" textAnchor="middle" fill="#7A7060" opacity="0.78"
                                            style={{ fontSize: '6.5px', letterSpacing: '0.17em', fontFamily: 'monospace' }}>GER · VN</text>
                                        <line x1="18" y1="20" x2="36" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                                        <path d="M48 17.5 L50 20 L48 22.5 L46 20 Z" fill="#B0A080" opacity="0.36" />
                                        <line x1="60" y1="20" x2="78" y2="20" stroke="#B0A080" strokeWidth="0.5" opacity="0.44" />
                                        <text x="48" y="27" textAnchor="middle" fill="#7A7060" opacity="0.64"
                                            style={{ fontSize: '5.5px', letterSpacing: '0.14em', fontFamily: 'monospace' }}>EST. 2026</text>
                                    </svg>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section >

            <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: CREAM }}>
                {/* Nền trang trí: Dấu chân vịt mờ chạy dọc trang */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none opacity-[0.03]">
                    <FootprintSVG className="w-24 h-auto absolute top-10 left-1/4 rotate-12" />
                    <FootprintSVG className="w-20 h-auto absolute top-80 right-1/4 -rotate-12" />
                    <FootprintSVG className="w-28 h-auto absolute top-[40%] left-1/3 rotate-45" />
                    <FootprintSVG className="w-22 h-auto absolute bottom-40 right-1/3 -rotate-12" />
                </div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-6xl mx-auto px-6 relative z-10"
                >
                    {/* Section header — matches reference: pill badge + big serif title + subtitle */}
                    <div className="flex flex-col items-center mb-10 text-center">

                        {/* Pill badge */}
                        <motion.div variants={fadeUp} className="mb-4">
                            <span
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    padding: '7px 20px',
                                    borderRadius: '999px',
                                    background: '#FCF3D9',
                                    border: '1.5px solid #E8C97A',
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    letterSpacing: '0.13em',
                                    color: '#A07820',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                                }}
                            >
                                <span>🗺️</span> THE MAP
                            </span>
                        </motion.div>

                        {/* Big serif heading */}
                        <motion.h2 variants={fadeUp} style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                            color: CHARCOAL,
                            fontWeight: 800,
                            fontStyle: 'italic',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.1,
                            marginBottom: '12px',
                        }}>
                            Die Ente's Oceanic Journey
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p variants={fadeUp} style={{
                            color: SLATE_BODY,
                            fontSize: '15px',
                            lineHeight: 1.65,
                            maxWidth: '480px',
                        }}>
                            Ten checkpoints. Every pond you'll cross as an international student in Germany.
                        </motion.p>
                    </div>

                    {/* Render JourneyMap Component */}
                    <motion.div variants={fadeUp} className="w-full flex justify-center">
                        {/* Chúng ta bọc JourneyMap trong một container để kiểm soát layout bento-style nếu cần */}
                        <div className="w-full max-w-6xl bg-white/40 backdrop-blur-sm rounded-[40px] p-6 md:p-10 border border-white/60 shadow-sm">
                            <JourneyMap />
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </section>
    );
};

export default JourneyMapSection;