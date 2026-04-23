"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function ExaminationCenter() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);

    const initializePage = async () => {
      // 1. THE BOUNCER: Check session first
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in? Boot them to login
        router.push("/");
        return;
      }

      // 2. DATA FETCH: Only happens if session exists
      const { data, error } = await supabase.from('missions').select('*');
      if (error) {
        console.error("Error fetching:", error);
      } else if (data) {
        setMissions(data);
      }
    };

    initializePage();
  }, [router]);

  // Prevent hydration errors
  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Navbar />
      
      <div className="p-12 pt-32 max-w-6xl mx-auto">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-12 dark:text-white">
          Examination Center
        </h1>
        
        <div className="grid gap-6">
          {missions.length > 0 ? (
            missions.map((mission) => (
              <div key={mission.id} className="p-8 border rounded-[2rem] flex justify-between items-center shadow-xl bg-white dark:bg-zinc-900 dark:border-white/5 dark:text-white">
                <span className="font-bold text-xl">{mission.title}</span>
                <button className="bg-blue-600 dark:bg-yellow-500 text-white dark:text-black px-8 py-3 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all">
                  Start Test
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-zinc-500 font-mono italic">No active missions found in database...</p>
          )}
        </div>
      </div>
    </main>
  );
}