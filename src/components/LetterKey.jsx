import React from 'react';

export default function LetterKey({ letter, isDwelling }) {
  if (isDwelling) {
    return (
      <div className="relative flex items-center justify-center min-w-[52px] min-h-[52px] bg-[#E8F0FE] rounded-xl border-2 border-medicalBlue font-bold text-2xl text-medicalBlue shadow-sm transition-all scale-105 z-10">
        {letter}
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
          <circle 
            cx="50%" cy="50%" r="42%" 
            fill="none" 
            stroke="#1A73E8" 
            strokeWidth="4" 
            strokeDasharray="100 100" 
            strokeDashoffset="40" 
            className="opacity-80 transition-all duration-300"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-w-[52px] min-h-[52px] bg-white rounded-xl border border-gray-200 font-bold text-2xl text-textPrimary shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-colors">
      {letter}
    </div>
  );
}
