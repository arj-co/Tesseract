import React from 'react';
import DwellRing from './DwellRing';

export default function LetterKey({ letter, id, isDwelling, dwellProgress, disabled, accentHoverClass }) {
  // accentHoverClass is passed from parent like 'hover:bg-[#c5d8f5] hover:text-[#1e40af]'
  // when dwelling, we swap to a solid background with white text and rounded-full
  return (
    <div 
      data-dwell={disabled ? null : id}
      className={`min-w-[52px] min-h-[52px] font-bold text-2xl transition-all duration-200 flex items-center justify-center ${
        disabled 
          ? 'bg-slate-50 border border-slate-200 text-slate-300 opacity-60 cursor-not-allowed rounded-lg' 
          : isDwelling
            ? 'bg-medicalBlue text-white rounded-full shadow-md scale-110'
            : `bg-white border text-slate-800 cursor-pointer rounded-lg hover:scale-110 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${accentHoverClass}`
      }`}
    >
      <DwellRing active={isDwelling} progress={dwellProgress} hideRing={isDwelling}>
        <span className="w-full h-full flex items-center justify-center">
          {letter}
        </span>
      </DwellRing>
    </div>
  );
}
