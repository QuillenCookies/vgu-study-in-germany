import React, { useState, useEffect } from 'react';
import { EDGES, NODE_POSITIONS } from '../knowledge/data';

const NetworkGraph: React.FC = () => {
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActiveNode(n => (n + 1) % NODE_POSITIONS.length), 1200);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="relative w-full aspect-square max-w-full sm:max-w-[500px] mx-auto box-border overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-full" aria-hidden="true">
                {/* Edges */}
                {EDGES.map(([a, b], i) => (
                    <line
                        key={i}
                        x1={NODE_POSITIONS[a].cx}
                        y1={NODE_POSITIONS[a].cy}
                        x2={NODE_POSITIONS[b].cx}
                        y2={NODE_POSITIONS[b].cy}
                        stroke="rgba(249,115,22,0.25)"
                        strokeWidth="0.8"
                    />
                ))}
                {/* Nodes */}
                {NODE_POSITIONS.map((pos, i) => (
                    <g key={i}>
                        <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={i === activeNode ? 5 : 3.5}
                            fill={i === activeNode ? '#FFCC00' : 'rgba(249,115,22,0.5)'}
                            style={{ transition: 'all 0.4s ease' }}
                        />
                        {/* Duck emoji as text — tiny */}
                        <text
                            x={pos.cx}
                            y={pos.cy + 0.9}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={i === activeNode ? '5' : '3.5'}
                            style={{ userSelect: 'none', transition: 'font-size 0.4s ease' }}
                        >
                            🦆
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default NetworkGraph;