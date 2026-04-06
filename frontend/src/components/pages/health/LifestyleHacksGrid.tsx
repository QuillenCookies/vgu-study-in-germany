import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X, Recycle, Coffee, Banknote, Clock, Bike, Wind, MousePointerClick,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

// ── Types ─────────────────────────────────────────────────────────────────────
type LHKey =
  | 'lhSectionTitle' | 'lhSectionSub' | 'lhClickHint' | 'lhClose'
  | 'lh1Title' | 'lh1Teaser' | 'lh1Detail'
  | 'lh2Title' | 'lh2Teaser' | 'lh2Detail'
  | 'lh3Title' | 'lh3Teaser' | 'lh3Detail'
  | 'lh4Title' | 'lh4Teaser' | 'lh4Detail'
  | 'lh5Title' | 'lh5Teaser' | 'lh5Detail'
  | 'lh6Title' | 'lh6Teaser' | 'lh6Detail';

interface HackDef {
  id: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  titleKey: LHKey;
  teaserKey: LHKey;
  detailKey: LHKey;
  duck: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const HACKS: HackDef[] = [
  {
    id: 'pfand',
    Icon: Recycle,
    iconBg: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#b45309',
    titleKey: 'lh1Title', teaserKey: 'lh1Teaser', detailKey: 'lh1Detail',
    duck: '🦆♻️',
  },
  {
    id: 'sonntag',
    Icon: Coffee,
    iconBg: 'rgba(99, 102, 241, 0.09)',
    iconColor: '#4f46e5',
    titleKey: 'lh2Title', teaserKey: 'lh2Teaser', detailKey: 'lh2Detail',
    duck: '🦆😴',
  },
  {
    id: 'bargeld',
    Icon: Banknote,
    iconBg: 'rgba(16, 185, 129, 0.09)',
    iconColor: '#059669',
    titleKey: 'lh3Title', teaserKey: 'lh3Teaser', detailKey: 'lh3Detail',
    duck: '🦆💰',
  },
  {
    id: 'punctual',
    Icon: Clock,
    iconBg: 'rgba(239, 68, 68, 0.09)',
    iconColor: '#dc2626',
    titleKey: 'lh4Title', teaserKey: 'lh4Teaser', detailKey: 'lh4Detail',
    duck: '🦆⏰',
  },
  {
    id: 'cycling',
    Icon: Bike,
    iconBg: 'rgba(6, 182, 212, 0.09)',
    iconColor: '#0891b2',
    titleKey: 'lh5Title', teaserKey: 'lh5Teaser', detailKey: 'lh5Detail',
    duck: '🦆🚲',
  },
  {
    id: 'luften',
    Icon: Wind,
    iconBg: 'rgba(20, 184, 166, 0.09)',
    iconColor: '#0d9488',
    titleKey: 'lh6Title', teaserKey: 'lh6Teaser', detailKey: 'lh6Detail',
    duck: '🦆🪟',
  },
];

// ── Animation constants ───────────────────────────────────────────────────────

const CARD_TWEEN = { type: 'tween', ease: 'easeOut', duration: 0.2 } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
} satisfies Variants;

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.18 },
  },
  exit: {
    opacity: 0,
    scale: 1,
    transition: { type: 'tween' as const, ease: 'easeIn' as const, duration: 0.12 },
  },
} satisfies Variants;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.10, ease: 'easeIn' as const } },
} satisfies Variants;

// ── Component ─────────────────────────────────────────────────────────────────
export function LifestyleHacksGrid() {
  const { tr } = useLanguage();
  const lh = (key: LHKey) => tr('healthWellness', key as any);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isGridHovered, setIsGridHovered] = useState(false);

  const selectedHack = HACKS.find(h => h.id === selectedId) ?? null;
  const close = () => setSelectedId(null);

  return (
    <section className="w-full">

      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold text-[#1A2B4C] dark:text-white leading-tight">
            {lh('lhSectionTitle')}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground dark:text-gray-400 max-w-lg leading-relaxed">
            {lh('lhSectionSub')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 22 }}
          className="shrink-0 hidden sm:inline-flex items-center gap-2
            px-3 py-1.5 rounded-full
            bg-slate-800 dark:bg-white/10
            select-none"
          style={{ willChange: 'transform' }}
        >
          <span className="text-sm leading-none" aria-hidden>🦆</span>
          <motion.div
            animate={isGridHovered
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }
            }
            transition={isGridHovered
              ? { duration: 0.12 }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{ willChange: 'transform, opacity' }}
          >
            <MousePointerClick size={14} strokeWidth={2} className="text-slate-300 dark:text-gray-300" />
          </motion.div>
          <span className="text-sm font-medium text-slate-100 dark:text-gray-200 whitespace-nowrap">
            {lh('lhClickHint')}
          </span>
        </motion.div>
      </div>

      {/* ── 3-column stagger grid ────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        onMouseEnter={() => setIsGridHovered(true)}
        onMouseLeave={() => setIsGridHovered(false)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {HACKS.map((hack) => (
          <motion.div
            key={hack.id}
            variants={cardVariants}
            layout={false}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={CARD_TWEEN}
            onClick={() => setSelectedId(hack.id)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedId(hack.id)}
            style={{
              willChange: 'transform',
              touchAction: 'manipulation',
              userSelect: 'none',
            }}
            className="group relative rounded-xl border cursor-pointer p-5 flex flex-col gap-3
              border-[#E5E7EB] dark:border-gray-800
              bg-white dark:bg-[#111827]
              hover:bg-[#FAFAFA] dark:hover:bg-white/[0.025]
              transition-colors duration-[200ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2B4C]
              dark:focus-visible:ring-white/50 focus-visible:ring-offset-2"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                transition-transform duration-300 ease-out group-hover:-translate-y-1"
              style={{ background: hack.iconBg, pointerEvents: 'none' }}
            >
              <hack.Icon size={24} strokeWidth={1.75} style={{ color: hack.iconColor }} />
            </div>

            <div className="flex flex-col gap-1" style={{ pointerEvents: 'none' }}>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                {lh(hack.titleKey)}
              </h3>
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed line-clamp-3">
                {lh(hack.teaserKey)}
              </p>
            </div>

            <div
              className="mt-auto flex items-center gap-1 text-gray-300 dark:text-gray-600"
              style={{ pointerEvents: 'none' }}
            >
              <span className="w-4 h-px bg-current" />
              <MousePointerClick size={11} strokeWidth={2} className="text-current" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Expanded modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && selectedHack && (
          <>
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/55"
              onClick={close}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                key={selectedId}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative rounded-2xl border border-[#E5E7EB] dark:border-gray-700
                  bg-white dark:bg-[#111827]
                  w-full max-w-lg pointer-events-auto overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="p-7 sm:p-9">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: selectedHack.iconBg }}
                      >
                        <selectedHack.Icon
                          size={24}
                          strokeWidth={1.75}
                          style={{ color: selectedHack.iconColor }}
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                        {lh(selectedHack.titleKey)}
                      </h2>
                    </div>

                    <motion.button
                      onClick={close}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={CARD_TWEEN}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                        bg-gray-100 dark:bg-white/10
                        text-gray-500 dark:text-gray-300
                        hover:bg-gray-200 dark:hover:bg-white/20
                        transition-colors duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2B4C]"
                      style={{ willChange: 'transform', touchAction: 'manipulation' }}
                      aria-label={lh('lhClose')}
                    >
                      <X size={14} strokeWidth={2.5} />
                    </motion.button>
                  </div>

                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 italic leading-snug">
                    "{lh(selectedHack.teaserKey)}"
                  </p>

                  <div className="w-10 h-[2px] rounded-full mb-4 bg-gray-200 dark:bg-gray-700" />

                  <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                    {lh(selectedHack.detailKey)}
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10
                    flex items-center gap-2">
                    <span className="text-base select-none" aria-hidden>
                      {selectedHack.duck}
                    </span>
                    <span className="text-xs text-muted-foreground dark:text-gray-500 italic">
                      Die Ente — Your guide to surviving Germany.
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}