import React from 'react';

export default function ZoneCard({ label, letters, isActive, children }) {
  return (
    <div className={`relative bg-white rounded-2xl p-6 transition-all duration-300 ease-out flex flex-col h-full ${
      isActive 
        ? 'ring-4 ring-medicalBlue/30 border-2 border-medicalBlue shadow-[0_8px_30px_rgba(26,115,232,0.15)] scale-[1.02] z-10' 
        : 'border border-gray-200 shadow-subtle opacity-80'
    }`}>
      {/* Label */}
      <div className="absolute top-4 left-5 text-xs font-bold text-textMuted uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
        {label}
      </div>

      <div className="flex-1 mt-6 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
