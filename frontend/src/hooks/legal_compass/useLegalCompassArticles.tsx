// hooks/useLegalArticles.ts
import { useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLegalCompass } from '../../contexts/LegalCompassContext';
import { ARTICLE_DATA } from '../../components/pages/legal_compass/knowledge/data';

export const useLegalCompassArticles = () => {
    const { lang } = useLanguage();
    const { searchQuery, activeCategory, activeSubTag } = useLegalCompass();

    return useMemo(() => {
        // 1. Map/Transform the localized articles
        const allArticles = ARTICLE_DATA.map(a => ({
            id: a.id,
            tag: a.tag,
            title: a.title[lang],
            germanAnchor: a.germanAnchor,
            icon: a.icon,
            isUrgent: a.isUrgent,
            urgencyText: a.urgencyText?.[lang],
            summary: a.summary[lang],
            checklist: a.checklist?.map(c => ({ id: c.id, label: c.label[lang], germanTerm: c.germanTerm })),
            dependsOn: a.dependsOn,
            extraContent: a.extraContent?.(lang),
        }));

        // 2. Filter based on state
        const filteredArticles = allArticles.filter(a => {
            const matchCat = !activeCategory || a.tag === activeCategory;
            const matchSub = !activeSubTag || a.id === activeSubTag;
            const q = searchQuery.toLowerCase();
            const matchSearch = !q
                || a.title.toLowerCase().includes(q)
                || a.germanAnchor.toLowerCase().includes(q)
                || a.summary.toLowerCase().includes(q);
            return matchCat && matchSub && matchSearch;
        });

        return {
            allArticles: allArticles,
            filteredArticles: filteredArticles
        }
    }, [lang, searchQuery, activeCategory, activeSubTag]); // Only re-runs when these change
};