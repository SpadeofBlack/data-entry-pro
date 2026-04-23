"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExaminationCenter() {
  const [isClient, setIsClient] = useState(false);
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true); // Tells React we are safely on the client side
    
    async function getMissions() {
      const { data, error } = await supabase.from('missions').select('*');
      if (error) console.error("Error fetching:", error);
      if (data) setMissions(data);
    }
    
    getMissions();
  }, []);

  // Prevent rendering until the client is ready
  if (!isClient) return null;

  return (
    <main className="p-12">
      <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-12">
        Examination Center
      </h1>
      
      <div className="grid gap-6">
        {missions.map((mission) => (
          <div key={mission.id} className="p-8 border rounded-[2rem] flex justify-between items-center shadow-xl">
            <span className="font-bold text-xl">{mission.title}</span>
            <button className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-xs">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}