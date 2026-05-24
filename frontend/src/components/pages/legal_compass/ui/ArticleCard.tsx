import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { fadeUp } from '../../../../components/ui/animation';
import type { Article } from '../../../../types/legal_compass';
import { BORDER, GOLD, NAVY } from './colors';
import GermanBadge from './GermanBadge';
import UrgencyBadge from './UrgencyBadge';
import DependencyBanner from './DependencyBanner';
import InteractiveChecklist from './InteractiveChecklist';

/* ─── Article Card ────────────────────────────────────────────── */
const ArticleCard: React.FC<{
    article: Article;
    allArticles: Article[];
    onJumpTo: (id: string) => void;
}> = ({ article, allArticles, onJumpTo }) => {
    const { tr } = useLanguage();
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            variants={fadeUp}
            layout
            className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            style={{ borderColor: open ? `${GOLD}60` : BORDER }}
        >
            {/* Header */}
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full text-left px-6 py-5 flex items-start gap-4 group"
            >
                {/* Icon */}
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-105"
                    style={{ background: open ? `${GOLD}20` : `${NAVY}0A` }}
                >
                    {article.icon}
                </div>

                {/* Text block */}
                <div className="flex-1 min-w-0">
                    <GermanBadge term={article.germanAnchor} />
                    <div className="flex items-start flex-wrap gap-x-2 gap-y-1 mb-1.5">
                        {article.isUrgent && (
                            <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                        )}
                        <h3 className="text-[16px] font-bold leading-snug tracking-tight flex-1" style={{ color: NAVY }}>
                            {article.title}
                        </h3>
                    </div>
                    {article.urgencyText && (
                        <div className="mb-1.5">
                            <UrgencyBadge text={article.urgencyText} />
                        </div>
                    )}
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                        {article.summary}
                    </p>
                </div>

                {/* Chevron */}
                <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-1"
                    style={{ background: open ? `${GOLD}25` : `${NAVY}08` }}
                >
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown size={14} style={{ color: NAVY }} />
                    </motion.span>
                </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-1 border-t" style={{ borderColor: `${GOLD}30` }}>

                            {/* Dependency banner */}
                            {article.dependsOn && (
                                <div className="mt-4">
                                    <DependencyBanner
                                        dependsOn={article.dependsOn}
                                        articles={allArticles}
                                        requiresLabel={tr('legalCompass', 'requiresLabel')}
                                        onJump={onJumpTo}
                                    />
                                </div>
                            )}

                            {/* Checklist */}
                            {article.checklist && (
                                <div className="mt-4">
                                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2.5">
                                        {tr('legalCompass', 'checklistHeader')}
                                    </p>
                                    <InteractiveChecklist items={article.checklist} />
                                </div>
                            )}

                            {/* Extra content */}
                            {article.extraContent && (
                                <div className="mt-5 text-[13.5px] text-slate-600 leading-relaxed space-y-3">
                                    {article.extraContent}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ArticleCard;