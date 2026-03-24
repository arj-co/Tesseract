import React from 'react';
import DwellRing from './DwellRing';

export default function LetterKey({ letter, id, isDwelling, dwellProgress, disabled }) {
  return (
    <div 
      data-dwell={disabled ? null : id}
      className={`min-w-[52px] min-h-[52px] rounded-xl font-bold text-2xl transition-colors shadow-sm ${
        disabled 
          ? 'bg-gray-50 border border-gray-100 text-gray-300 opacity-50 cursor-not-allowed' 
          : 'bg-white border border-gray-200 text-textPrimary hover:bg-gray-50 cursor-pointer'
      }`}
    >
      <DwellRing active={isDwelling} progress={dwellProgress}>
        <span className="w-full h-full flex items-center justify-center">
          {letter}
        </span>
      </DwellRing>
    </div>
  );
}
