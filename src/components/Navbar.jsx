import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-subtle border-b border-gray-100' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <svg className="w-8 h-8 text-medicalBlue opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="font-serif font-bold text-3xl text-deepNavy tracking-tight">Eyra</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/how-it-works" className="text-textMuted hover:text-deepNavy transition-colors font-medium">How It Works</Link>
          <Link to="/about" className="text-textMuted hover:text-deepNavy transition-colors font-medium">About</Link>
          <Link to="/app" className="bg-medicalBlue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-deepNavy transition-colors">Launch App</Link>
        </div>
      </div>
    </nav>
  );
}
