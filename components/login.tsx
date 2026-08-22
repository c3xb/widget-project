'use client'

import Link from "next/link";
import { useEffect, useState, } from "react";
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function Login(){

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


 const handleLogin = async(e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
  } else {
    setLoading(false);
    router.push('/');
  }
};

    
  return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4 animate-popup ">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-purple-100 p-8">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-2">Log in to your ProofPad account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className=" placeholder:text-gray-500 w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            required
            className="text-gray-500 placeholder:text-gray-500 w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
      <Link className="text-purple-600" href="/signup" replace>
       Sign up
     </Link>
      </p>
    </div>
  </div>
);

}