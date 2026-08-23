"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("user@example.com");
  const router = useRouter();

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // دالة حذف الحساب
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        await supabase.auth.signOut();
        router.push("/");
      }
    } catch (error) {
      console.error("Delete account error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 text-slate-800 font-sans antialiased py-12 px-4 sm:px-6 lg:px-8 animate-popup">
      <main className="max-w-xl mx-auto space-y-6">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
          >
            ← Back to Dashboard
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-1.5 rounded-lg transition-colors border border-rose-200/60 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        {/* Main Profile Card Container */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-purple-100 pb-4">
            <h1 className="text-xl font-bold text-slate-900">Account Settings</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your personal name and account details.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-900 bg-white transition outline-none text-sm"
                placeholder="Enter your name"
              />
            </div>

            {/* Registered Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Registered Email
              </label>
              <input
                type="email"
                id="email"
                value={registeredEmail}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed text-sm select-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                Your email address is fixed to your account.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-xl transition shadow-sm cursor-pointer"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium text-sm rounded-xl transition cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>

      </main>
    </div>
  );
}