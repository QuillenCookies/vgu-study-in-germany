import React from 'react';
import { NAVY } from './colors';

const GermanBadge: React.FC<{ term: string }> = ({ term }) => (
    <span
        className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full mb-2.5"
        style={{ background: NAVY, color: '#FFFFFF' }}
    >
        {term}
    </span>
);

export default GermanBadge;