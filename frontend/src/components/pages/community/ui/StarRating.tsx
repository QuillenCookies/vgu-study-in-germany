import React from 'react';
import { Star } from 'lucide-react';

// ── STAR RENDERER ───────────────────────────────────────────────────────────
const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={12}
                className={i < count ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
            />
        ))}
    </div>
);

export default StarRating;