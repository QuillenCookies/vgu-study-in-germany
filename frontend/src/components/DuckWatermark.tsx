import React from 'react';

interface DuckWatermarkProps {
  className?: string;
  size?: number;
  opacity?: number;
}

const DuckWatermark: React.FC<DuckWatermarkProps> = ({
  className = '',
  size = 320,
  opacity = 0.05,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
    aria-hidden="true"
  >
    {/* Body */}
    <ellipse cx="50" cy="62" rx="30" ry="22" />
    {/* Head */}
    <circle cx="72" cy="38" r="12" />
    {/* Neck */}
    <path d="M 62 44 Q 58 52 52 56" />
    {/* Bill */}
    <path d="M 80 36 L 88 34 L 86 40 Z" />
    {/* Eye */}
    <circle cx="76" cy="35" r="1.5" fill="currentColor" stroke="none" />
    {/* Wing arc */}
    <path d="M 30 62 Q 48 52 68 60" />
    {/* Tail curl */}
    <path d="M 22 58 Q 16 54 20 48" />
    {/* Water ripple 1 */}
    <path d="M 20 86 Q 35 82 50 86 Q 65 90 80 86" />
    {/* Water ripple 2 */}
    <path d="M 25 92 Q 40 88 55 92 Q 68 96 80 92" />
  </svg>
);

export default DuckWatermark;
