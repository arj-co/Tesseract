import React from 'react';

export default function StatusBar() {
  return (
    <div className="h-10 bg-bgAlternate border-t border-gray-200 flex items-center justify-between px-6 text-sm font-medium text-textMuted shrink-0 shadow-inner">
      {/* Left: Webcam Status */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-softGreen rounded-full animate-pulse shadow-[0_0_8px_rgba(52,168,83,0.6)]"></span>
        <span>Webcam: Connecting...</span>
      </div>

      {/* Center: Dwell Info */}
      <div className="bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm text-textPrimary">
        Dwell: 1.5s
      </div>

      {/* Right: Version and SDGs */}
      <div className="flex items-center gap-3">
        <span>Eyra v0.1</span>
        <span className="text-gray-300">|</span>
        <div className="flex gap-2">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs border border-green-200">SDG 3</span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded text-xs border border-pink-200">SDG 10</span>
        </div>
      </div>
    </div>
  );
}
