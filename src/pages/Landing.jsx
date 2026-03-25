import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="font-sans text-[#1C1C1E] bg-[#FFFFFF] min-h-screen flex flex-col pt-20">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 min-h-[80vh]">
        <h1 className="font-serif font-bold text-[64px] leading-tight text-deepNavy mb-6">
          Your eyes are your voice.
        </h1>
        <p className="text-[18px] text-[#6B7280] max-w-[540px] mx-auto mb-10 leading-relaxed font-medium">
          Eyra is a browser-based communication tool for people living with ALS — no hardware, no installation, just a webcam.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <Link to="/app" className="bg-medicalBlue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-deepNavy transition-colors text-lg shadow-subtle">
            Launch Eyra
          </Link>
          <Link to="/how-it-works" className="border-2 border-medicalBlue text-medicalBlue px-8 py-3.5 rounded-lg font-semibold hover:bg-medicalBlue hover:text-white transition-colors text-lg shadow-subtle">
            How It Works
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="bg-blue-50 text-medicalBlue px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">SDG 3: Good Health</span>
          <span className="bg-blue-50 text-medicalBlue px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">SDG 10: Reduced Inequalities</span>
          <span className="bg-blue-50 text-medicalBlue px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">SDG 17: Partnerships</span>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#F8F9FA] w-full py-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h2 className="text-5xl font-bold text-deepNavy mb-3 font-serif">500,000+</h2>
            <p className="text-[#6B7280] text-lg font-medium">People living with ALS worldwide</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-deepNavy mb-3 font-serif">90%</h2>
            <p className="text-[#6B7280] text-lg font-medium">Lose ability to speak as disease progresses</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-deepNavy mb-3 font-serif">0</h2>
            <p className="text-[#6B7280] text-lg font-medium">Hardware required to use Eyra</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#FFFFFF] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-deepNavy mb-16 text-center font-serif">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medicalBlue flex items-center justify-center text-white text-3xl mb-6 shadow-subtle">
                👁
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Calibrate</h3>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Look at the screen corners to set up gaze tracking
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medicalBlue flex items-center justify-center text-white text-3xl mb-6 shadow-subtle">
                ⌨
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Type</h3>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Dwell your gaze on letters to spell words
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medicalBlue flex items-center justify-center text-white text-3xl mb-6 shadow-subtle">
                🔊
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Speak</h3>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Eyra expands your input into a full sentence and reads it aloud
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Impact */}
      <section className="bg-[#F8F9FA] py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-deepNavy mb-16 text-center font-serif">Built for Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-subtle border-l-8 border-[#34A853]">
              <h3 className="text-2xl font-bold text-textPrimary mb-3">SDG 3: Good Health & Wellbeing</h3>
              <p className="text-[#6B7280] text-lg">
                Ensuring accessible communication tools for patients with motor neuron diseases.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-xl shadow-subtle border-l-8 border-[#1A73E8]">
              <h3 className="text-2xl font-bold text-textPrimary mb-3">SDG 10: Reduced Inequalities</h3>
              <p className="text-[#6B7280] text-lg">
                Bridging the gap for individuals who cannot afford proprietary speech devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
