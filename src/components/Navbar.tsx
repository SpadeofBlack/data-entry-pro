"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  // 1. Define the state (This fixes "isDark is red")
  const [isDark, setIsDark] = useState(false);

  // 2. Define the function (This fixes "toggleTheme is red")
  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link href="/dashboard" className="text-2xl font-black italic text-blue-600 dark:text-yellow-500">
          FOKEL ACADEMY
        </Link>

        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <div className="flex gap-6 text-xs font-bold tracking-widest text-slate-500 dark:text-zinc-400">
            <Link href="/assignments" className="hover:text-blue-600 dark:hover:text-yellow-500">MISSIONS</Link>
            <Link href="/tests" className="hover:text-blue-600 dark:hover:text-yellow-500">TESTS</Link>
            <Link href="/profile" className="hover:text-blue-600 dark:hover:text-yellow-500">PROFILE</Link>
          </div>

          {/* The Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="px-4 py-2 border-2 rounded-lg font-black text-[10px] tracking-widest border-slate-200 text-slate-400 dark:border-white/10 dark:text-yellow-500"
          >
            {isDark ? "SUN MODE" : "MOON MODE"}
          </button>
        </div>

      </div>
    </nav>
  );
}