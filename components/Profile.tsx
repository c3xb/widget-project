// app/profile/page.tsx
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-purple-50 py-10 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header / Back Link */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
            Pro Member
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-purple-100">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              A
            </div>
            
            {/* User Info Header */}
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">Anis</h1>
              <p className="text-sm text-gray-500">anis@example.com</p>
              <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200">
                  ProofPad Creator
                </span>
              </div>
            </div>
          </div>

          {/* Account Details Form (Static UI) */}
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value="Anis" 
                  readOnly 
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-lg text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value="anis@example.com" 
                  readOnly 
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-lg text-sm text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">API Key / Embed Token</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value="pk_live_9f8d7c6b5a4e3d2c" 
                  readOnly 
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-lg text-sm font-mono text-purple-900 focus:outline-none"
                />
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs text-gray-500 font-medium">Active Widgets</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">3</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs text-gray-500 font-medium">Monthly Impressions</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">1,240</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm text-center">
            <p className="text-xs text-gray-500 font-medium">Plan Status</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">Active</p>
          </div>
        </div>

        {/* Settings Action Bar */}
        <div className="bg-white rounded-xl border border-purple-100 p-4 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm font-semibold text-gray-900">Sign Out of ProofPad</p>
            <p className="text-xs text-gray-500">Log out of your current browser session.</p>
          </div>
          <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm font-medium rounded-lg transition-colors">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}