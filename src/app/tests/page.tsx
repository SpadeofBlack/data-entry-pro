"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Use the bridge we just made

export default function TestsPage() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMissions() {
      const { data, error } = await supabase
        .from('missions') // Make sure your table in Supabase is named 'missions'
        .select('*');

      if (data) setMissions(data);
      setLoading(false);
    }
    loadMissions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black italic mb-8">EXAMINATION CENTER</h1>
      
      {loading ? (
        <p className="animate-pulse font-mono">LOADING DATA ARCHIVES...</p>
      ) : (
        <div className="grid gap-4">
          {missions.map((mission) => (
            <div key={mission.id} className="p-6 bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-white/5 flex justify-between items-center">
              <div>
                <p className="font-black text-lg uppercase">{mission.title}</p>
                <p className="text-[10px] font-mono opacity-50">{mission.difficulty}</p>
              </div>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-black text-xs uppercase">
                Start Mission
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}