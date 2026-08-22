'use client'


import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {


   const [loading, setLoading] = useState(true);
   const [user, setuser] = useState<User | null>(null);  
   





  return (
    <div className="min-h-screen bg-purple-50 text-[#18181b] font-sans antialiased py-12 px-4 sm:px-6 lg:px-8 animate-popup ">
      <main className="max-w-4xl mx-auto space-y-6">
        
        {/* White Profile Container */}
        <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-purple-100">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
              A
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Anis</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  Creator
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium">anis@example.com</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mt-6 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Account Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  value="Anis" 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-sm font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  value="anis@example.com" 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-sm font-medium text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">API Key / Embed Token</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value="pk_live_9f8d7c6b5a4e3d2c" 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-sm font-mono text-gray-900 focus:outline-none"
                />
                <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* White Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Widgets</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Views</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plan Status</p>
            <p className="text-3xl font-extrabold text-purple-600 mt-2">Active</p>
          </div>
        </div>

        {/* White Sign Out Card */}
        <div className="bg-white rounded-3xl border border-purple-100 p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm font-bold text-gray-900">Sign Out</p>
            <p className="text-xs text-gray-500">Log out of your ProofPad session.</p>
          </div>
          <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer">
            Logout
          </button>
        </div>

      </main>
    </div>
  );
}