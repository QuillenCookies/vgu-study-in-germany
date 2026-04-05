import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  CreditCard, Stethoscope, Dumbbell, Brain,
  Phone, Shield, CheckCircle2, Activity, HeartPulse,
} from 'lucide-react';
import { Faq5 } from '../components/ui/faq-5';
import { LifestyleHacksGrid } from '../components/pages/health/LifestyleHacksGrid';

// ── Design tokens ─────────────────────────────────────────────────────────────
const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

// ── Types ─────────────────────────────────────────────────────────────────────
type HWKey =
  | 'badge' | 'title1' | 'title2' | 'subtitle' | 'emergencyBar'
  | 'expand' | 'collapse'
  | 'c1Title' | 'c1Sub' | 'c1P1' | 'c1P2' | 'c1P3' | 'c1P4' | 'c1P5' | 'c1Tip'
  | 'c2Title' | 'c2Sub' | 'c2P1' | 'c2P2' | 'c2P3' | 'c2P4' | 'c2P5' | 'c2Tip'
  | 'c3Title' | 'c3Sub' | 'c3P1' | 'c3P2' | 'c3P3' | 'c3P4' | 'c3Tip'
  | 'c4Title' | 'c4Sub' | 'c4P1' | 'c4P2' | 'c4P3' | 'c4P4' | 'c4Tip'
  | 'c5Title' | 'c5Sub' | 'c5Tip'
  | 'qaTitle'
  | 'qa1q' | 'qa1a' | 'qa2q' | 'qa2a' | 'qa3q' | 'qa3a'
  | 'qa4q' | 'qa4a' | 'qa5q' | 'qa5a';

const QA_KEYS: [HWKey, HWKey][] = [
  ['qa1q','qa1a'], ['qa2q','qa2a'], ['qa3q','qa3a'],
  ['qa4q','qa4a'], ['qa5q','qa5a'],
];

// ── Card base — clean white, no blur ─────────────────────────────────────────
const CARD = `
  relative rounded-2xl overflow-hidden h-full flex flex-col
  bg-white dark:bg-[#111827]
  border border-[#E5E7EB] dark:border-gray-800
  shadow-sm transition-all duration-200
`.replace(/\s+/g, ' ').trim();

// ── Component ─────────────────────────────────────────────────────────────────
export default function HealthWellnessPage() {
  const { tr, lang } = useLanguage();
  const hw = (key: HWKey) => tr('healthWellness', key);

  // Focus-dim hover effect
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [lang]);

  // Per-card focus motion props
  const focus = (id: string) => ({
    animate: {
      scale:   hoveredCell !== null && hoveredCell !== id ? 0.99 : 1,
      opacity: hoveredCell !== null && hoveredCell !== id ? 0.65 : 1,
    },
    transition: { duration: 0.18, ease: 'easeOut' },
    onMouseEnter: () => setHoveredCell(id),
    onMouseLeave: () => setHoveredCell(null),
    whileHover:   { scale: 1.02 },
  });

  // ── Sub-components ────────────────────────────────────────────────────────
  const BulletItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-2">
      <CheckCircle2 size={13} strokeWidth={2.5} className="shrink-0 mt-[3px]" style={{ color: AMBER }} />
      <span className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{text}</span>
    </li>
  );

  const TipBox = ({ text }: { text: string }) => (
    <div className="mt-auto pt-3">
      <div className="rounded-xl px-3 py-2.5 bg-amber-50 dark:bg-amber-900/15
        border border-amber-200/80 dark:border-amber-700/25">
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-snug">{text}</p>
      </div>
    </div>
  );

  const CardLabel = ({ text }: { text: string }) => (
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{text}</p>
  );

  const IconBox = ({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) => (
    <div className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
      style={{ background: bg, color }}>
      {children}
    </div>
  );

  return (
    <Layout>

      {/* ── Static sticky emergency bar ─────────────────────────────────── */}
      <div className="sticky top-16 z-40 w-full border-b border-white/10"
        style={{ backgroundColor: MIDNIGHT }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-2
          flex flex-wrap items-center gap-x-5 gap-y-1">

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-300 mr-1">
              Emergency
            </span>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
            </span>
            <span className="text-sm font-bold text-white">112</span>
            <span className="text-xs text-white/50">Ambulance · Fire</span>
          </div>

          <span className="text-white/25 text-xs hidden sm:block">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-orange-300">116 117</span>
            <span className="text-xs text-white/50">After-hours doctor</span>
          </div>

          <span className="text-white/25 text-xs hidden md:block">|</span>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-sm font-bold text-purple-300">0800 111 0 111</span>
            <span className="text-xs text-white/50">Mental health crisis · Free 24/7</span>
          </div>
        </div>
      </div>

      {/* ── Page wrapper ─────────────────────────────────────────────────── */}
      <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#0B1220]
        font-sans text-gray-900 dark:text-gray-100">

        {/* Lightweight background wash — no heavy blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px]
            bg-indigo-100/80 dark:bg-indigo-900/10" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]
            bg-amber-100/60 dark:bg-amber-900/8" />
        </div>

        <main className="relative z-10 w-full pt-10 pb-16 px-4 sm:px-6 lg:px-10">
          <div className="max-w-[1280px] mx-auto">

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                text-[10px] font-bold uppercase tracking-widest mb-3
                bg-white dark:bg-white/[0.07]
                border border-[#E5E7EB] dark:border-white/10"
                style={{ color: MIDNIGHT }}>
                <Shield size={10} strokeWidth={2.5} style={{ color: AMBER }} />
                {hw('badge')}
              </div>

              {/* H1 → text-3xl */}
              <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2 dark:text-white"
                style={{ color: MIDNIGHT }}>
                {hw('title1')}{' '}
                <span style={{ color: AMBER }}>{hw('title2')}</span>
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-snug">
                {hw('subtitle')}
              </p>
            </motion.div>

            {/* ════════════════════════════════════════════════════════════
                12-COLUMN BENTO GRID  gap-6
                Row 1: Insurance (8)   | Emergency (4)
                Row 2: Medical (4)     | Mental Health (4)  | Sport (4)
                Row 3: Lifestyle (12 — full width)
            ════════════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-12 gap-6">

              {/* ── ROW 1 col 1-8: Insurance ─────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0 }}
                {...focus('insurance')}
                className={`col-span-12 md:col-span-8 p-6 ${CARD}`}
                style={{ borderTop: `3px solid ${MIDNIGHT}` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardLabel text={hw('c1Sub')} />
                    {/* H2 → text-xl */}
                    <h2 className="text-xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
                      {hw('c1Title')}
                    </h2>
                  </div>
                  <IconBox bg="rgba(26,43,76,0.08)" color={MIDNIGHT}>
                    <CreditCard size={20} strokeWidth={1.75} />
                  </IconBox>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  <div className="rounded-xl p-3.5 bg-blue-50 dark:bg-blue-950/30
                    border border-blue-200/80 dark:border-blue-900/40 flex flex-col gap-2.5">
                    <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full
                      bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300
                      border border-blue-200 dark:border-blue-800">
                      TK · AOK · Barmer
                    </span>
                    <ul className="flex flex-col gap-2">
                      <BulletItem text={hw('c1P1')} />
                      <BulletItem text={hw('c1P2')} />
                      <BulletItem text={hw('c1P3')} />
                    </ul>
                  </div>
                  <div className="rounded-xl p-3.5 bg-amber-50 dark:bg-amber-900/15
                    border border-amber-200/80 dark:border-amber-800/30 flex flex-col gap-2.5">
                    <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full
                      bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300
                      border border-amber-200 dark:border-amber-800">
                      Bonus · Perks
                    </span>
                    <ul className="flex flex-col gap-2">
                      <BulletItem text={hw('c1P4')} />
                      <BulletItem text={hw('c1P5')} />
                    </ul>
                  </div>
                </div>

                <TipBox text={hw('c1Tip')} />
              </motion.div>

              {/* ── ROW 1 col 9-12: Emergency Numbers ────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                {...focus('emergency')}
                className={`col-span-12 md:col-span-4 p-6 ${CARD}`}
                style={{ borderTop: '3px solid #ef4444' }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <IconBox bg="rgba(239,68,68,0.08)" color="#dc2626">
                    <Phone size={20} strokeWidth={1.75} />
                  </IconBox>
                  <div>
                    <CardLabel text="Notfall" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                      Emergency
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center gap-2.5 rounded-xl p-3
                    bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400 leading-none">112</p>
                      <p className="text-xs text-red-500 dark:text-red-400/80 mt-0.5 leading-none">Ambulance · Fire</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl p-3
                    bg-orange-50 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-900/40">
                    <Activity size={14} className="shrink-0 text-orange-500 dark:text-orange-400" strokeWidth={2} />
                    <div>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400 leading-none">116 117</p>
                      <p className="text-xs text-orange-500 dark:text-orange-400/80 mt-0.5 leading-none">After-hours doctor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl p-3
                    bg-purple-50 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-900/35">
                    <HeartPulse size={14} className="shrink-0 text-purple-600 dark:text-purple-400" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-bold text-purple-700 dark:text-purple-300 leading-none">0800 111 0 111</p>
                      <p className="text-xs text-purple-500 dark:text-purple-400/80 mt-0.5 leading-none">Crisis · Free 24/7</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── ROW 2 col 1-4: Medical Care ──────────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                {...focus('medical')}
                className={`col-span-12 md:col-span-4 p-6 ${CARD}`}
                style={{ borderTop: '3px solid #10b981' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardLabel text={hw('c2Sub')} />
                    <h2 className="text-xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
                      {hw('c2Title')}
                    </h2>
                  </div>
                  <IconBox bg="rgba(16,185,129,0.09)" color="#059669">
                    <Stethoscope size={20} strokeWidth={1.75} />
                  </IconBox>
                </div>

                {/* Numbered steps — compact */}
                <ol className="flex flex-col gap-2.5 flex-1 mb-3">
                  {[hw('c2P1'), hw('c2P2'), hw('c2P4'), hw('c2P5')].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center
                        text-[10px] font-bold text-white mt-[2px] w-[18px] h-[18px]"
                        style={{ backgroundColor: MIDNIGHT }}>
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Rezept pills — compact 2-row */}
                <div className="flex flex-col gap-2 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Rezept</p>
                  <div className="flex gap-2">
                    <div className="flex-1 rounded-lg p-2.5 bg-pink-50 dark:bg-pink-950/25
                      border border-pink-200/80 dark:border-pink-900/35">
                      <p className="text-[10px] font-bold text-pink-600 dark:text-pink-400">● Rosa</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">Insurance pays</p>
                    </div>
                    <div className="flex-1 rounded-lg p-2.5 bg-green-50 dark:bg-green-950/25
                      border border-green-200/80 dark:border-green-900/35">
                      <p className="text-[10px] font-bold text-green-700 dark:text-green-400">● Blau</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">You pay</p>
                    </div>
                  </div>
                </div>

                <TipBox text={hw('c2Tip')} />
              </motion.div>

              {/* ── ROW 2 col 5-8: Mental Health ─────────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.15 }}
                {...focus('mental')}
                className={`col-span-12 md:col-span-4 p-6 ${CARD}`}
                style={{ borderTop: '3px solid #8b5cf6' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardLabel text={hw('c4Sub')} />
                    <h2 className="text-xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
                      {hw('c4Title')}
                    </h2>
                  </div>
                  <IconBox bg="rgba(139,92,246,0.09)" color="#7c3aed">
                    <Brain size={20} strokeWidth={1.75} />
                  </IconBox>
                </div>

                <div className="rounded-xl p-3 mb-3
                  bg-violet-50 dark:bg-violet-950/25
                  border border-violet-200/80 dark:border-violet-900/35">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">
                    Psychologische Beratungsstelle
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{hw('c4P1')}</p>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  <BulletItem text={hw('c4P2')} />
                  <BulletItem text={hw('c4P3')} />
                  <BulletItem text={hw('c4P4')} />
                </ul>

                <TipBox text={hw('c4Tip')} />
              </motion.div>

              {/* ── ROW 2 col 9-12: Sport & Fitness ──────────────────────── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                {...focus('fitness')}
                className={`col-span-12 md:col-span-4 p-6 ${CARD}`}
                style={{ borderTop: '3px solid #f59e0b' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardLabel text={hw('c3Sub')} />
                    <h2 className="text-xl font-semibold dark:text-white" style={{ color: MIDNIGHT }}>
                      {hw('c3Title')}
                    </h2>
                  </div>
                  <IconBox bg="rgba(245,158,11,0.1)" color="#b45309">
                    <Dumbbell size={20} strokeWidth={1.75} />
                  </IconBox>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold mb-4
                  bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300
                  border border-amber-300/80 dark:border-amber-700/40">
                  🏋️ Hochschulsport
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  <BulletItem text={hw('c3P1')} />
                  <BulletItem text={hw('c3P2')} />
                  <BulletItem text={hw('c3P3')} />
                  <BulletItem text={hw('c3P4')} />
                </ul>

                <TipBox text={hw('c3Tip')} />
              </motion.div>

              {/* ── ROW 3 col 1-12: Lifestyle (full width — no outer card) ─── */}
              <div className="col-span-12">
                <LifestyleHacksGrid />
              </div>

            </div>
            {/* end 12-col grid */}

            {/* ── FAQ ─────────────────────────────────────────────────────── */}
            <motion.div
              className="mt-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Faq5
                badge="FAQ"
                heading={hw('qaTitle')}
                description={hw('subtitle')}
                faqs={QA_KEYS.map(([qKey, aKey]) => ({
                  question: hw(qKey),
                  answer:   hw(aKey),
                }))}
              />
            </motion.div>

          </div>
        </main>
      </div>
    </Layout>
  );
}
