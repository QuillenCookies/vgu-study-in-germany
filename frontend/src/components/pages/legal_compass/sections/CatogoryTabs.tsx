import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../../contexts/LanguageContext';
import CategoryTab from '../ui/CategoryTab';
import { CATEGORIES } from '../knowledge/data';
import type { CategoryKey } from '../../../../types/legal_compass';
import { useLegalCompass } from '../../../../contexts/LegalCompassContext';
import { BORDER, GOLD, NAVY } from '../ui/colors';
import { useLegalCompassArticles } from '../../../../hooks/legal_compass/useLegalCompassArticles';

const CatogoryTabs: React.FC = () => {
    const { tr } = useLanguage();
    const {
        activeCategory, setActiveCategory,
        activeSubTag, setActiveSubTag,
        searchQuery
    } = useLegalCompass();
    const { allArticles } = useLegalCompassArticles();

    const catDescKey = (key: CategoryKey) =>
        key === 'new' ? 'catNewDesc' : key === 'residency' ? 'catResidencyDesc' : 'catTaxDesc';
    const catLabelKey = (key: CategoryKey) =>
        key === 'new' ? 'tagNew' : key === 'residency' ? 'tagResidency' : 'tagTax';

    const handleCategoryClick = (key: CategoryKey) => {
        if (activeCategory === key) {
            setActiveCategory(null);
            setActiveSubTag(null);
        } else {
            setActiveCategory(key);
            setActiveSubTag(null);
        }
    };

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {CATEGORIES.map(cat => (
                    <CategoryTab
                        key={cat.key}
                        icon={cat.icon}
                        label={tr('legalCompass', catLabelKey(cat.key))}
                        description={tr('legalCompass', catDescKey(cat.key))}
                        count={cat.articleIds.length}
                        isActive={activeCategory === cat.key}
                        onClick={() => handleCategoryClick(cat.key)}
                    />
                ))}
            </motion.div>

            {/* ── Sub-tags (when a category is active) ── */}
            <AnimatePresence>
                {activeCategory && (
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mb-8"
                    >
                        <div className="flex flex-wrap gap-2 pt-1">
                            {/* "All" sub-pill */}
                            <button
                                onClick={() => setActiveSubTag(null)}
                                className="px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-150 select-none"
                                style={{
                                    background: !activeSubTag ? GOLD : '#FFFFFF',
                                    color: !activeSubTag ? NAVY : '#6B7280',
                                    borderColor: !activeSubTag ? GOLD : BORDER,
                                    boxShadow: !activeSubTag ? `0 2px 8px ${GOLD}50` : undefined,
                                }}
                            >
                                {tr('legalCompass', 'allInCategory')}
                            </button>

                            {/* One pill per article in this category */}
                            {CATEGORIES.find(c => c.key === activeCategory)!.articleIds.map(id => {
                                const art = allArticles.find(a => a.id === id);
                                if (!art) return null;
                                const isActive = activeSubTag === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setActiveSubTag(isActive ? null : id)}
                                        className="px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-150 select-none flex items-center gap-1.5"
                                        style={{
                                            background: isActive ? `${NAVY}` : '#FFFFFF',
                                            color: isActive ? '#FFFFFF' : '#374151',
                                            borderColor: isActive ? NAVY : BORDER,
                                        }}
                                    >
                                        {art.isUrgent && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                        )}
                                        {art.germanAnchor}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── View All link when no category active ── */}
            {!activeCategory && !searchQuery && (
                <div className="text-center mb-8">
                    <p className="text-[13px] text-slate-400">
                        {tr('legalCompass', 'viewAll')} — {allArticles.length} topics
                    </p>
                </div>
            )}
        </div>
    );
};

export default CatogoryTabs;