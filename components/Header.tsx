'use client';
 
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
 
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setuser] = useState<User | null>(null);  
  const [loading, setLoading] = useState(true)
 
useEffect(() => { const fetchUser = async () => {
 const {data : {user}} =   await supabase.auth.getUser();

   if(user){
    setuser(user)

   } else{
      setuser(null)
  }
  setLoading(false);
   };

   fetchUser()
  }

 ,[]);

const scrollToSection = (id: string) => {
  // If you are on the homepage:
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // If you are on another page (like /profile), go to home first:
    window.location.href = `/#${id}`;
  }
};

  return (
    <div className="w-full pt-4 px-4 sticky top-0 z-50 flex justify-center animate-popup">
      <header className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-sm rounded-2xl flex items-center justify-between px-6 py-2.5 relative">
 
        {/* 1. LEFT: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/proofpad-logo.svg" alt="Proofpad logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">ProofPad</span>
        </div>
 
        {/* 2. CENTER: Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
<<<<<<< HEAD
          <a href="#features" className="hover:text-purple-700 transition-colors">Features</a>
          <a href="#features" className="hover:text-purple-700 transition-colors">Resources</a>
          <a href="#features" className="hover:text-purple-700 transition-colors">Pricing</a>
=======
          <a onClick={() => scrollToSection('features')} className="hover:text-purple-700 transition-colors hover: cursor-pointer">Features</a>
          <a onClick={() => scrollToSection('editor')} className="hover:text-purple-700 transition-colors hover: cursor-pointer">Widget Editor</a>
          <a className="hover:text-purple-700 transition-colors hover: cursor-pointer">Pricing</a>
>>>>>>> a2ed180c973a52c55edeab2885d77e031595c5aa
        </nav>
 
        {/* 3. RIGHT: Plan Indicator, Login & Mobile Hamburger */}
        <div className="flex items-center gap-3">
 
          {/* Pro Plan Badge */}
          
 
          {/* Login Button */}
         
          {loading ? (
  /* 1. Loading State: Skeleton placeholder while checking session */
  <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg" />
) : user ? (
  /* 2. Logged In State: Show Profile/Dashboard link */
  <Link href="/profile" >
    <button className="px-4 py-1.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition hover: cursor-pointer">
      Profile
    </button>
  </Link>
) : (
  /* 3. Logged Out State: Show Login link */
  <Link href="/login">
    <button className=" text-white bg-purple-600 px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-purple-500 transition hover: cursor-pointer ">
      Login
    </button>
  </Link>
)}
 
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
            <a onClick={() => scrollToSection('features')} className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors hover: cursor-pointer">Features</a>
            <a onClick={() => scrollToSection('features')} className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors hover: cursor-pointer">Widget Editor</a>
            <a className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors hover: cursor-pointer">Pricing</a>
          </div>
        )}
 
      </header>
    </div>
  );
}