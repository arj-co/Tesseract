import React from 'react';
import DwellRing from './DwellRing';

export default function ActionButton({ label, type, id, isDwelling, dwellProgress }) {
  const isSpeak = type === 'speak';
  
  return (
    <div 
      data-dwell={id}
      className={`w-full rounded-xl font-bold text-center transition-all cursor-pointer ${
        isSpeak 
          ? 'bg-medicalBlue text-white hover:bg-deepNavy shadow-[0_8px_20px_rgba(26,115,232,0.3)] hover:shadow-[0_12px_24px_rgba(26,115,232,0.4)] border border-medicalBlue/50' 
          : 'border-2 border-gray-200 text-textMuted bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-subtle'
      }`}
    >
      <DwellRing active={isDwelling} progress={dwellProgress}>
        <div className={`w-full flex items-center justify-center ${isSpeak ? 'py-4 md:py-8 text-2xl' : 'py-4 px-6 text-xl'}`}>
          {label}
        </div>
      </DwellRing>
    </div>
  );
}
