import type React from 'react';
import { NAVY, GOLD } from '../ui/colors';

const SubtleBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-[900px] h-[900px] -translate-x-1/3 -translate-y-1/3"
                style={{ background: `radial-gradient(circle, ${NAVY}05, transparent 65%)` }} />
            <div className="absolute bottom-0 right-0 w-[900px] h-[900px] translate-x-1/3 translate-y-1/3"
                style={{ background: `radial-gradient(circle, ${GOLD}05, transparent 65%)` }} />
            <div className="absolute inset-0 opacity-[0.18]" style={{
                backgroundImage: `radial-gradient(circle, ${NAVY}30 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
            }} />
        </div>
    );
};

export default SubtleBackground;