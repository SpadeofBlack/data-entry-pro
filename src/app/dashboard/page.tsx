"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function TeacherDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mock student telemetry data
  const [students] = useState([
    { id: 1, name: "Idali Cooper", status: "Active", avgWPM: 72, accuracy: "98%" },
    { id: 2, name: "Alex Curator", status: "Offline", avgWPM: 65, accuracy: "94%" },
  ]);

  useEffect(() => {
    setIsClient(true);
    const storedRole = localStorage.getItem('userRole');
    const userRole = storedRole ? storedRole.toLowerCase() : null;

    if (userRole === 'teacher' || userRole === 'admin') {
      setIsAuthorized(true);
    } else {
      router.push("/"); 
    }
  }, [router]);

  if (!isClient) return null;

  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-blue-600 dark:text-yellow-500 font-mono font-bold animate-pulse uppercase tracking-widest">
          Verifying Faculty Credentials...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 text-slate-900 dark:text-white">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2 italic">CURATOR WORKSPACE</h1>
            <p className="text-blue-600 dark:text-yellow-500 font-mono uppercase tracking-[0.3em] text-xs font-bold">
              Faculty Command Center // Authorized
            </p>
          </div>
          <Link href="/missions">
            <button className="bg-slate-900 dark:bg-yellow-500 text-white dark:text-black px-8 py-4 rounded-2xl font-black text-xs hover:scale-105 transition-all uppercase tracking-widest shadow-lg">
              Manage Missions →
            </button>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CLASSROOM ROSTER */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem]">
              <h2 className="text-sm font-black uppercase tracking-widest mb-8 text-slate-400">Classroom Roster</h2>
              
              <div className="space-y-4">
                {students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-5 bg-white dark:bg-black/20 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-yellow-500/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${student.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                      <div>
                        <p className="font-black text-lg group-hover:text-blue-600 dark:group-hover:text-yellow-500">{student.name}</p>
                        <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">{student.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black italic">{student.avgWPM} <span className="text-[10px] not-italic opacity-50">WPM</span></p>
                      <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">Accuracy: {student.accuracy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* TELEMETRY SIDEBAR */}
          <div className="space-y-8">
            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-80 italic">Global Average</h3>
              <p className="text-6xl font-black leading-none tracking-tighter">68.4</p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Class Readiness</p>
                <p className="font-mono text-lg font-bold">STABLE</p>
              </div>
            </div>

            <section className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem]">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-white dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 text-[10px] font-black hover:bg-blue-50 dark:hover:bg-yellow-500/10 transition-all uppercase">
                  Export Gradebook
                </button>
                <button className="w-full text-left p-4 bg-white dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 text-[10px] font-black hover:bg-blue-50 dark:hover:bg-yellow-500/10 transition-all uppercase">
                  Reset Assignment Timers
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}