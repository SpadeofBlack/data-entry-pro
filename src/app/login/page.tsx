"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; 
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [accountType, setAccountType] = useState("student");
  
  // Capture ALL the fields from your design
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleAuth = async () => {
    if (activeTab === "register") {
      // 1. Validation
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // 2. Sign Up with Metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            first_name: firstName,
            last_name: lastName,
            student_id: studentId,
            role: accountType === "admin" ? "teacher" : "student" 
          }
        }
      });

      if (error) alert(error.message);
      else alert("Registration successful! Check your email.");

    } else {
      // 3. Login Logic
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert("Login failed: " + error.message);
      } else {
        // 4. Smart Redirect
        const role = data.user?.user_metadata?.role;
        window.location.href = role === "teacher" ? "/dashboard" : "/tests";
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32 p-4 font-sans">
        <div className="w-full max-w-md p-8 border rounded-[2rem] shadow-xl bg-white dark:bg-zinc-900 dark:border-white/5">
          
          {/* Tabs */}
          <div className="flex p-1 mb-8 rounded-xl bg-slate-100 dark:bg-black/40">
            <button onClick={() => setActiveTab("login")} className={`flex-1 py-2 rounded-lg font-bold text-sm ${activeTab === "login" ? "bg-white text-blue-600 dark:bg-zinc-800 dark:text-yellow-500" : "text-slate-500"}`}>LOGIN</button>
            <button onClick={() => setActiveTab("register")} className={`flex-1 py-2 rounded-lg font-bold text-sm ${activeTab === "register" ? "bg-white text-blue-600 dark:bg-zinc-800 dark:text-yellow-500" : "text-slate-500"}`}>REGISTER</button>
          </div>

          <div className="space-y-4">
            {/* Show extra fields only for Register */}
            {activeTab === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder="Last Name" className="p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setLastName(e.target.value)} />
              </div>
            )}

            <input type="email" placeholder="Institutional Email" className="w-full p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setPassword(e.target.value)} />

            {activeTab === "register" && (
              <>
                <input placeholder="Student ID" className="w-full p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setStudentId(e.target.value)} />
                <input type="password" placeholder="Confirm Password" className="w-full p-4 rounded-xl border dark:bg-black/20 dark:text-white" onChange={(e) => setConfirmPassword(e.target.value)} />
              </>
            )}

            {/* Role Toggle */}
            <div className="flex gap-4 justify-center">
              <label className="flex items-center gap-2 text-xs font-bold dark:text-zinc-400">
                <input type="radio" checked={accountType === "student"} onChange={() => setAccountType("student")} /> STUDENT
              </label>
              <label className="flex items-center gap-2 text-xs font-bold dark:text-zinc-400">
                <input type="radio" checked={accountType === "admin"} onChange={() => setAccountType("admin")} /> ADMIN
              </label>
            </div>

            <button onClick={handleAuth} className="w-full font-bold p-4 rounded-xl bg-blue-600 text-white dark:bg-yellow-500 dark:text-black">
              {activeTab === "login" ? "INITIALIZE SESSION" : "CREATE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}