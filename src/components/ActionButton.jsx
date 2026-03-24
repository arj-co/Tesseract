import React from 'react';

export default function ActionButton({ label, type }) {
  const isSpeak = type === 'speak';
  return (
    <button className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all ${
      isSpeak 
        ? 'bg-medicalBlue text-white hover:bg-deepNavy shadow-[0_8px_20px_rgba(26,115,232,0.3)] hover:shadow-[0_12px_24px_rgba(26,115,232,0.4)] md:py-8 text-2xl border border-medicalBlue/50' 
        : 'border-2 border-gray-200 text-textMuted bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-subtle text-xl'
    }`}>
      {label}
    </button>
  );
}
