import React from 'react';

export default function DwellRing({ active, progress, children }) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full rounded-xl transition-all ${
      active ? 'bg-[#E8F0FE] ring-2 ring-medicalBlue scale-[1.05] z-20 shadow-md' : ''
    }`}>
      {children}
      {active && (
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
          <circle 
            cx="50%" cy="50%" r="42%" 
            fill="none" 
            stroke="#1A73E8" 
            strokeWidth="4" 
            strokeDasharray="100 100" 
            strokeDashoffset={100 - progress} 
            className="opacity-80 transition-all duration-75"
          />
        </svg>
      )}
    </div>
  );
}
