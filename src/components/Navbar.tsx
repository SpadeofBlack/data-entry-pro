"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only update these after the component has mounted in the browser
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
      <div className="text-2xl font-black text-blue-600 italic tracking-tighter">
        FOKEL ACADEMY
      </div>
      
      <div className="flex items-center gap-8">
        {!loading && user && (
          <>
            <Link href="/dashboard" className="font-bold text-blue-600 border-b-2 border-blue-600 pb-1 text-sm">DASHBOARD</Link>
            <Link href="/assignments" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">MISSIONS</Link>
            <Link href="/tests" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">TESTS</Link>
            <Link href="/profile" className="font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 text-sm">PROFILE</Link>
          </>
        )}

        {loading && <span className="animate-pulse text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processing...</span>}
        
        {/* suppressedHydrationWarning={true} is the secret sauce here */}
        <button 
          suppressHydrationWarning={true}
          onClick={toggleTheme} 
          className="px-4 py-2 border rounded-xl font-bold text-[10px] tracking-widest uppercase transition-all border-slate-200 text-slate-600 dark:border-white/10 dark:text-zinc-400"
        >
          {!mounted ? "---" : isDark ? "☀️ SUN MODE" : "🌙 MOON MODE"}
        </button>

        {!loading && user && (
          <button onClick={handleLogout} className="text-[10px] font-black text-red-500 uppercase tracking-widest">
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
}