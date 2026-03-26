import React from "react";
import { auth, signInWithGoogle } from "../firebase";
import { LogIn, ShieldCheck } from "lucide-react";

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-3xl border border-neutral-200 shadow-xl max-w-md w-full text-center">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Nexus HR</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Secure HR Automation System. Please sign in to access the dashboard.
        </p>
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-indigo-200"
        >
          <LogIn size={20} />
          <span>Sign in with Google</span>
        </button>
        <p className="mt-8 text-xs text-neutral-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
