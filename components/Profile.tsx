'use client'


import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    // TODO: wire up to your auth logic
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    // TODO: wire up to your delete-account logic
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      console.log("Deleting account...");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl  bg-white rounded-2xl shadow-sm p-6">
        <a
          href="/"
          className="flex items-center gap-2 text-purple-600 font-medium text-sm mb-8 hover:text-purple-700 transition-colors w-fit"
        >
          <span aria-hidden="true">&larr;</span>
          Back to dashboard
        </a>

        <h1 className="text-4xl font-semibold text-gray-900 mb-10">Profile</h1>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-purple-600 text-white font-medium text-sm py-2.5 hover:bg-purple-700 transition-colors"
          >
            Log out
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full rounded-lg border border-red-200 text-red-600 font-medium text-sm py-2.5 hover:bg-red-50 transition-colors"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
