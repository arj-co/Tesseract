import React from 'react';

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DwellRing({ active, progress = 0, children }) {
  const strokeDash = (progress / 100) * CIRCUMFERENCE;

  return (
    <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      {children}
      {progress > 0 && (
        <svg
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 10 }}
          width={64} height={64}
        >
          <circle
            cx={32} cy={32} r={RADIUS}
            fill="none"
            stroke="#E8F0FE"
            strokeWidth={3}
          />
          <circle
            cx={32} cy={32} r={RADIUS}
            fill="none"
            stroke="#1A73E8"
            strokeWidth={3}
            strokeDasharray={`${strokeDash} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
        </svg>
      )}
    </div>
  );
}
