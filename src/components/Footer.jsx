import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <span className="font-serif font-bold text-2xl text-deepNavy">Eyra</span>
        </div>
        
        <div className="flex items-center space-x-6 mb-6 md:mb-0 text-sm font-medium text-textMuted">
          <Link to="/how-it-works" className="hover:text-deepNavy transition-colors">How It Works</Link>
          <Link to="/about" className="hover:text-deepNavy transition-colors">About</Link>
          <Link to="/app" className="hover:text-deepNavy transition-colors">Launch App</Link>
        </div>

        <div className="text-textMuted text-sm text-right">
          Built at Tesseract '26 · VIT Pune
        </div>
      </div>
    </footer>
  );
}
