import React from 'react';

export default function TopBar() {
  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <span className="font-serif font-bold text-3xl text-deepNavy tracking-tight">Eyra</span>
        <svg className="w-8 h-8 text-medicalBlue opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>

      {/* Center: Word Buffer */}
      <div className="flex-1 flex justify-center">
        <div className="text-4xl font-mono tracking-widest font-bold text-textPrimary flex items-center">
          BAT<span className="animate-pulse opacity-50 font-sans text-medicalBlue">_</span>
        </div>
      </div>

      {/* Right: LLM Predicton */}
      <div className="flex-1 flex justify-end">
        <div className="italic text-xl text-textMuted bg-bgAlternate px-6 py-2 rounded-xl border border-gray-100 max-w-sm truncate shadow-inner">
          "I want to go to the bathroom"
        </div>
      </div>
    </div>
  );
}
