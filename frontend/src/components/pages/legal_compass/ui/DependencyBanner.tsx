import React from 'react';
import { NAVY, GOLD } from './colors';
import { ArrowRight } from 'lucide-react';
import type { Article } from '../../../../types/legal_compass';

/* ─── Prerequisite Banner ─────────────────────────────────────── */
const DependencyBanner: React.FC<{ dependsOn: string; articles: Article[]; requiresLabel: string; onJump: (id: string) => void }> = ({
    dependsOn, articles, requiresLabel, onJump,
}) => {
    const dep = articles.find(a => a.id === dependsOn);
    if (!dep) return null;
    return (
        <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium mb-4"
            style={{ background: `${GOLD}18`, borderLeft: `3px solid ${GOLD}` }}
        >
            <ArrowRight size={12} style={{ color: GOLD, flexShrink: 0 }} />
            <span style={{ color: NAVY }}>
                {requiresLabel}{' '}
                <button
                    onClick={() => onJump(dep.id)}
                    className="font-bold underline underline-offset-2 hover:opacity-75 transition-opacity"
                    style={{ color: NAVY }}
                >
                    {dep.germanAnchor}
                </button>
            </span>
        </div>
    );
};

export default DependencyBanner;