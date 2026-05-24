import React from 'react';
import { Clock } from 'lucide-react';

/* ─── Urgency Badge ───────────────────────────────────────────── */
const UrgencyBadge: React.FC<{ text: string }> = ({ text }) => (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-500">
        <Clock size={12} className="text-amber-500 flex-shrink-0" />
        {text}
    </span>
);

export default UrgencyBadge;