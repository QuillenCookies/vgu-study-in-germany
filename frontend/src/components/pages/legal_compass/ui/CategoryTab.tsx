import React from 'react';
import { BORDER, GOLD, NAVY } from './colors';

/* ─── Category Tab ────────────────────────────────────────────── */
const CategoryTab: React.FC<{
    icon: React.ReactNode;
    label: string;
    description: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, description, count, isActive, onClick }) => (
    <button
        onClick={onClick}
        className="flex-1 flex flex-col items-start gap-3 px-5 py-4 rounded-2xl border transition-all duration-200 text-left group"
        style={{
            background: isActive ? NAVY : '#FFFFFF',
            borderColor: isActive ? NAVY : BORDER,
            boxShadow: isActive ? `0 4px 20px ${NAVY}25` : undefined,
        }}
    >
        <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: isActive ? GOLD : `${NAVY}0A` }}
        >
            <span style={{ color: isActive ? NAVY : NAVY }}>{icon}</span>
        </div>
        <div className="flex-1">
            <p className={`text-[14px] font-bold leading-tight mb-0.5 ${isActive ? 'text-white' : 'text-[#1A2B4C]'}`}>
                {label}
            </p>
            <p className={`text-[11.5px] leading-snug ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
                {description}
            </p>
        </div>
        <span
            className="text-[10.5px] font-bold px-2.5 py-1 rounded-full"
            style={{
                background: isActive ? `${GOLD}` : `${NAVY}0C`,
                color: isActive ? NAVY : NAVY,
            }}
        >
            {count}
        </span>
    </button>
);

export default CategoryTab;