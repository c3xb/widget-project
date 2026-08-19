"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // TODO: wire these up to your actual auth/session data
  const userName = "";
  const registeredEmail = "user@example.com";

  const handleLogout = async () => {
    // TODO: call your Supabase signOut() here
    // await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      // TODO: call your account deletion endpoint / Supabase function here
      // await fetch("/api/account/delete", { method: "POST" });
      router.push("/");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-purple-100 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Profile</h1>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Name
            </label>
            <div className="text-gray-900">{userName || "—"}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Registered Email
            </label>
            <div className="text-gray-900">{registeredEmail}</div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Log Out
          </button>

          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full py-2.5 px-4 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}