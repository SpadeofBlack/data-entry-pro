"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Theme Check
    setIsDark(document.documentElement.classList.contains("dark"));

    // 2. Auth Check
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false); // Stop loading once we have an answer
    };

    initializeAuth();

    // 3. Listen for changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
      <div className="text-2xl font-black text-blue-600 italic tracking-tighter">
        FOKEL ACADEMY
      </div>
      
      <div className="flex items-center gap-8">
        {/* Only show links if we are NOT loading and HAVE a user */}
        {!loading && user && (
          <>
            <Link href="/assignments" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">MISSIONS</Link>
            <Link href="/tests" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">TESTS</Link>
            <Link href="/profile" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">PROFILE</Link>
          </>
        )}

        {/* Show a small indicator if still checking session */}
        {loading && <span className="animate-pulse text-[10px] font-bold text-slate-400 uppercase">Verifying...</span>}
        
        <button onClick={toggleTheme} className="px-4 py-2 border rounded-xl font-bold text-[10px] tracking-widest uppercase dark:text-zinc-400">
          {isDark ? "☀️ SUN MODE" : "🌙 MOON MODE"}
        </button>

        {!loading && user && (
          <button onClick={handleLogout} className="text-[10px] font-black text-red-500 uppercase">
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
}