"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState("student"); // This tracks the dropdown
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the choice to localStorage so other pages can check it
    localStorage.setItem('userRole', accountType);

    if (accountType === "teacher") {
      router.push("/dashboard"); // Teachers go to the Workspace
    } else {
      router.push("/"); // Students go to the Landing Page/Trainer
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        
        {/* Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-full mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition ${isLogin ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition ${!isLogin ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500'}`}
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-slate-500 text-sm mb-6">Access the FOKELGate Archive.</p>

        <form onSubmit={handleAuth} className="space-y-4">
          {/* THE DROPDOWN (Inside the form now!) */}
          <select 
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm font-medium text-slate-700"
          >
            <option value="student">Logging in as Student</option>
            <option value="teacher">Logging in as Teacher (Curator)</option>
          </select>

          <input 
            type="email" 
            placeholder="School Email" 
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required 
          />
          
          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition">
            {isLogin ? "Enter Archive" : "Complete Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}