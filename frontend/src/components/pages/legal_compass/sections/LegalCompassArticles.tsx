import React from "react";
import { motion } from 'framer-motion';
import { stagger } from '../../../../components/ui/animation';
import { useLegalCompassArticles } from "../../../../hooks/legal_compass/useLegalCompassArticles";
import { useLegalCompass } from "../../../../contexts/LegalCompassContext";
import ArticleCard from '../ui/ArticleCard';
import { useLanguage } from "../../../../contexts/LanguageContext";
import { BORDER, NAVY } from '../ui/colors';

const LegalCompassArticles: React.FC = () => {
    const { tr } = useLanguage();
    const {
        activeCategory, setActiveCategory,
        activeSubTag, setActiveSubTag,
        searchQuery, setSearchQuery
    } = useLegalCompass();
    const { allArticles, filteredArticles } = useLegalCompassArticles();

    // Handle sub-tag jump (from dependency banner)
    const handleJumpTo = (id: string) => {
        const target = allArticles.find(a => a.id === id);
        if (target) {
            setActiveCategory(target.tag);
            setActiveSubTag(id);
            setTimeout(() => {
                document.getElementById(`article-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    };

    return (
        <div>
            {
                filteredArticles.length > 0 ? (
                    <motion.div key={`${activeCategory}-${activeSubTag}-${searchQuery}`}
                        variants={stagger} initial="hidden" animate="visible"
                        className="space-y-3">
                        {filteredArticles.map(article => (
                            <div key={article.id} id={`article-${article.id}`}>
                                <ArticleCard
                                    article={article}
                                    allArticles={allArticles}
                                    onJumpTo={handleJumpTo}
                                />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-slate-500 font-medium">{tr('legalCompass', 'noResults')}</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory(null); setActiveSubTag(null); }}
                            className="mt-4 text-[13px] font-semibold underline"
                            style={{ color: NAVY }}
                        >
                            {tr('legalCompass', 'clearFilters')}
                        </button>
                    </motion.div>
                )
            }

            {/* ── Disclaimer ── */}
            <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="mt-14 p-5 rounded-2xl border text-center"
                style={{ borderColor: BORDER, background: `${NAVY}03` }}
            >
                <p className="text-[12.5px] text-slate-500 leading-relaxed">
                    <strong style={{ color: NAVY }}>{tr('legalCompass', 'disclaimerLabel')}</strong>{' '}
                    {tr('legalCompass', 'disclaimerText')}
                </p>
            </motion.div>
        </div>
    );
};

export default LegalCompassArticles;