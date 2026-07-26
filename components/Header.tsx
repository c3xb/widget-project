'use client';
 
import { useState } from 'react';
 
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="w-full pt-4 px-4 sticky top-0 z-50 flex justify-center">
      <header className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-sm rounded-2xl flex items-center justify-between px-6 py-2.5 relative">
 
        {/* 1. LEFT: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/proofpad-logo.svg" alt="Proofpad logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">ProofPad</span>
        </div>
 
        {/* 2. CENTER: Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-purple-700 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-700 transition-colors">Resources</a>
          <a href="#" className="hover:text-purple-700 transition-colors">Pricing</a>
        </nav>
 
        {/* 3. RIGHT: Plan Indicator, Login & Mobile Hamburger */}
        <div className="flex items-center gap-3">
 
          {/* Pro Plan Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded-full">
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
            <span className="text-xs font-bold text-purple-800">Pro Plan</span>
          </div>
 
          {/* Login Button */}
          <button className="px-4 py-1.5 text-sm font-medium text-white bg-purple-600 border border-gray-200 rounded-lg hover:bg-purple-700 cursor-pointer transition-colors">
            Login
          </button>
 
          {/* Hamburger Menu Button (mobile only) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors text-gray-700 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
 
        {/* Dropdown Menu for Mobile — positioned relative to <header> */}
        {isOpen && (
          <div className="absolute top-[125%] right-4 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col md:hidden z-50">
            <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Features</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Resources</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Pricing</a>
          </div>
        )}
 
      </header>
    </div>
  );
}