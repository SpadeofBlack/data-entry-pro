"use client"; // Must be at the top for useState to work
import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500
      /* Light Mode Styles */
      bg-white/80 border-b border-slate-200 
      /* Dark Mode Styles */
      dark:bg-zinc-950/80 dark:border-white/5 
      backdrop-blur-md flex items-center justify-between px-8 py-4">
      
      <div className="flex items-center gap-8">
        {/* Brand Name */}
        <span className="text-2xl font-black tracking-tighter uppercase italic
          text-blue-800 dark:text-yellow-500 transition-colors">
          FOKEL Academy
        </span>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 ml-4">
          <Link href="/" className="text-sm font-bold text-slate-500 dark:text-zinc-500 hover:text-blue-800 dark:hover:text-yellow-500 transition-colors">
            HOME
          </Link>
          <Link href="/assignments" className="text-sm font-bold text-slate-500 dark:text-zinc-500 hover:text-blue-800 dark:hover:text-yellow-500 transition-colors">
            ASSIGNMENTS
          </Link>
          <Link href="/dashboard" className="text-sm font-black text-blue-600 dark:text-yellow-500 bg-blue-50 dark:bg-yellow-500/10 px-3 py-1 rounded-md transition-all">
            DASHBOARD
          </Link>
        </div>
      </div>

      {/* THE TOGGLE BUTTON */}
      <button 
        onClick={toggleTheme}
        className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-yellow-500 hover:scale-110 active:scale-95 transition-all border border-slate-200 dark:border-white/10"
      >
        {isDark ? (
          <span className="text-xs font-black">SUN MODE</span>
        ) : (
          <span className="text-xs font-black">MOON MODE</span>
        )}
      </button>
    </nav>
  );
}