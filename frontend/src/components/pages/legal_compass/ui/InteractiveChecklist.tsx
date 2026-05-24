import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckSquare, Square
} from 'lucide-react';
import type { ChecklistItem } from '../../../../types/legal_compass';
import { BORDER, GOLD, NAVY } from './colors';

/* ─── Interactive Checklist ──────────────────────────────────── */
const InteractiveChecklist: React.FC<{ items: ChecklistItem[] }> = ({ items }) => {
    const [checked, setChecked] = useState<Set<string>>(new Set());
    const toggle = (id: string) =>
        setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const doneCount = checked.size;
    const progress = items.length ? (doneCount / items.length) * 100 : 0;

    return (
        <div>
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: GOLD }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>
                <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">
                    {doneCount}/{items.length}
                </span>
            </div>
            <ul className="space-y-2">
                {items.map(item => {
                    const done = checked.has(item.id);
                    return (
                        <li
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 group"
                            style={{
                                borderColor: done ? `${GOLD}60` : BORDER,
                                background: done ? `${GOLD}0C` : 'transparent',
                            }}
                        >
                            <button className="flex-shrink-0 mt-0.5 transition-transform group-active:scale-90">
                                {done
                                    ? <CheckSquare size={17} style={{ color: GOLD }} />
                                    : <Square size={17} className="text-slate-300" />}
                            </button>
                            <span
                                className="text-[13px] font-medium leading-relaxed"
                                style={{
                                    color: done ? '#9CA3AF' : '#374151',
                                    textDecoration: done ? 'line-through' : 'none',
                                    opacity: done ? 0.7 : 1,
                                }}
                            >
                                {item.label}
                                {item.germanTerm && (
                                    <span
                                        className="ml-2 text-[10.5px] font-bold px-2 py-0.5 rounded-full"
                                        style={{ background: `${NAVY}10`, color: NAVY }}
                                    >
                                        {item.germanTerm}
                                    </span>
                                )}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default InteractiveChecklist;