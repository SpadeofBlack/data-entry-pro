"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Check for an existing session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for login/logout changes automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Send them back to login after logging out
  };

  return (
    <nav className="flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border-b dark:border-white/5">
      <div className="text-2xl font-black text-blue-600 italic">FOKEL ACADEMY</div>
      
      <div className="flex items-center gap-8">
        {/* ONLY show these links if "user" is NOT null */}
        {user && (
          <>
            <Link href="/assignments" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600">MISSIONS</Link>
            <Link href="/tests" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600">TESTS</Link>
            <Link href="/profile" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600">PROFILE</Link>
          </>
        )}
        
        <button className="px-4 py-2 border rounded-xl font-bold text-xs dark:border-white/10 dark:text-zinc-400">
          MOON MODE
        </button>

        {/* Show Logout button only when logged in */}
        {user && (
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 hover:underline"
          >
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
}