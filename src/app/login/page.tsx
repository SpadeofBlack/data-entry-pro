"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; // Ensure you have the Navbar imported

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [accountType, setAccountType] = useState("student");
  
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    confirm: ""
  });

  const handleAuth = () => {
    if (activeTab === "register" && regData.password !== regData.confirm) {
      alert("Passwords do not match!");
      return;
    }
    window.location.href = accountType === "student" ? "/dashboard" : "/admin";
  };

  return (
    // Added dark:bg-zinc-950 to handle the full screen background
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-32 p-4 font-sans">
        <div className="w-full max-w-md p-8 border rounded-[2rem] shadow-xl transition-all duration-500
          /* Light Mode */
          bg-white border-slate-200 shadow-slate-200/50
          /* Dark Mode Fix */
          dark:bg-zinc-900 dark:border-white/5 dark:shadow-black/50">
          
          {/* Tabs */}
          <div className="flex p-1 mb-8 rounded-xl bg-slate-100 dark:bg-black/40">
            <button 
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === "login" 
                ? "bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-yellow-500" 
                : "text-slate-500 dark:text-zinc-500"
              }`}
            >
              LOGIN
            </button>
            <button 
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === "register" 
                ? "bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-yellow-500" 
                : "text-slate-500 dark:text-zinc-500"
              }`}
            >
              REGISTER
            </button>
          </div>

          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Institutional Email" 
              // Added dark:text-white and dark:placeholder:text-zinc-600
              className="w-full p-4 rounded-xl outline-none transition-all border
                bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                dark:bg-black/20 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-600
                focus:border-blue-500 dark:focus:border-yellow-500"
              onChange={(e) => setRegData({...regData, email: e.target.value})}
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-4 rounded-xl outline-none transition-all border
                bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                dark:bg-black/20 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-600
                focus:border-blue-500 dark:focus:border-yellow-500"
              onChange={(e) => setRegData({...regData, password: e.target.value})}
            />

            {activeTab === "register" && (
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className={`w-full p-4 rounded-xl outline-none transition-all border
                  bg-slate-50 text-slate-900 placeholder:text-slate-400
                  dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-600
                  ${regData.password !== regData.confirm && regData.confirm !== "" 
                    ? "border-red-400 dark:border-red-500/50" 
                    : "border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-yellow-500"}`}
                onChange={(e) => setRegData({...regData, confirm: e.target.value})}
              />
            )}

            {/* Account Type Labels - Text colors fixed for Dark Mode */}
            <div className="flex gap-4 py-2 justify-center">
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-yellow-500">
                <input type="radio" name="type" checked={accountType === "student"} onChange={() => setAccountType("student")} className="accent-blue-600 dark:accent-yellow-500 h-4 w-4" />
                STUDENT
              </label>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-yellow-500">
                <input type="radio" name="type" checked={accountType === "admin"} onChange={() => setAccountType("admin")} className="accent-blue-600 dark:accent-yellow-500 h-4 w-4" />
                ADMIN
              </label>
            </div>

            <button 
              onClick={handleAuth}
              className="w-full font-bold p-4 rounded-xl mt-4 transition-all shadow-lg active:scale-95
                bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100
                dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-black dark:shadow-yellow-900/20"
            >
              {activeTab === "login" ? "INITIALIZE SESSION" : "CREATE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}