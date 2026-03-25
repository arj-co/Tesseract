import React from 'react';

export default function ZoneCard({ label, id, isZoneActive, isOtherZoneActive, isDwelling, dwellProgress, children }) {
  const isDimmed = isOtherZoneActive && !isZoneActive;

  return (
    <div 
      data-dwell={isZoneActive ? null : id}
      className={`relative bg-white rounded-2xl p-6 flex flex-col h-full transition-all duration-300 ease-out overflow-hidden ${
        isZoneActive 
          ? 'ring-4 ring-medicalBlue/30 border-2 border-medicalBlue shadow-[0_8px_30px_rgba(26,115,232,0.15)] scale-[1.02] z-10' 
          : isDimmed 
            ? 'border border-gray-200 opacity-40 grayscale-[0.2]' 
            : 'border border-gray-200 shadow-subtle cursor-pointer hover:border-medicalBlue/50'
      } ${isDwelling ? 'ring-2 ring-medicalBlue/50 scale-[1.01]' : ''}`}
    >
      {isDwelling && (
        <div 
          className="absolute bottom-0 left-0 h-2 bg-medicalBlue transition-all duration-75 ease-linear"
          style={{ width: `${dwellProgress}%` }}
        ></div>
      )}
      <div className="absolute top-4 left-5 text-xs font-bold text-textMuted uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
        {label}
      </div>

      <div className="flex-1 mt-6 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}
