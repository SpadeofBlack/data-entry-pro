"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function TestsPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    setIsClient(true);
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole ? storedRole.toLowerCase() : "student");
  }, []);

  if (!isClient) return null;

  const isTeacher = role === "teacher" || role === "admin";

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 text-slate-900 dark:text-white">
      <Navbar />

      <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter mb-2 italic uppercase">
            {isTeacher ? "Test Deployment Hub" : "Examination Center"}
          </h1>
          <p className="text-blue-600 dark:text-yellow-500 font-mono uppercase tracking-[0.3em] text-xs font-bold">
            {isTeacher ? "Faculty Authorization: Active" : "Student Training Protocol"}
          </p>
        </header>

        {/* TABS */}
        <div className="flex gap-8 border-b border-slate-200 dark:border-white/10 mb-12">
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "active" ? "border-b-2 border-blue-600 text-blue-600 dark:border-yellow-500 dark:text-yellow-500" : "text-slate-400"
            }`}
          >
            {isTeacher ? "Deployed Tests" : "Active Exams"}
          </button>
          <button
            onClick={() => setActiveTab("secondary")}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "secondary" ? "border-b-2 border-blue-600 text-blue-600 dark:border-yellow-500 dark:text-yellow-500" : "text-slate-400"
            }`}
          >
            {isTeacher ? "Submission Analytics" : "Gradebook"}
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "active" ? (
              <section className="space-y-6">
                {/* TEACHER ONLY: UPLOAD CARD */}
                {isTeacher && (
                  <div className="bg-slate-50 dark:bg-zinc-900 border-2 border-dashed border-slate-200 dark:border-white/10 p-12 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-blue-500 dark:hover:border-yellow-500 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">+</span>
                    </div>
                    <h3 className="font-black text-xl mb-2">Deploy New Examination</h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xs">
                      Upload .json or .md mission files to update the student archive.
                    </p>
                  </div>
                )}

                {/* TEST LIST (Shared/Mock data) */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 italic">Current Mission Catalog</h3>
                  <div className="space-y-4">
                    {["Standard Speed Trial", "Alpha-Numeric Mix"].map((test) => (
                      <div key={test} className="flex justify-between items-center p-6 bg-slate-50 dark:bg-black/20 rounded-3xl border border-slate-100 dark:border-white/5">
                        <span className="font-bold">{test}</span>
                        <button className="text-[10px] font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg">
                          {isTeacher ? "Edit Mission" : "Start Test"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <div className="bg-slate-50 dark:bg-zinc-900 p-12 rounded-[2.5rem] text-center border border-slate-200 dark:border-white/5">
                 <p className="text-slate-400 font-mono text-xs italic">Analytics and reporting data pending mission completion.</p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            <div className={`p-8 rounded-[2.5rem] text-white shadow-xl ${isTeacher ? "bg-slate-900 shadow-slate-900/20" : "bg-blue-600 shadow-blue-500/20"}`}>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
                {isTeacher ? "Mission Status" : "Your Readiness"}
              </h3>
              <p className="text-4xl font-black tracking-tighter">
                {isTeacher ? "2 ACTIVE" : "LEVEL 1"}
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem]">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Rules of Engagement</h3>
               <ul className="text-xs space-y-3 font-bold text-slate-500 dark:text-zinc-400">
                 <li>• All deployments are final once synced.</li>
                 <li>• Student telemetry is captured in real-time.</li>
                 <li>• Mission parameters must be C# or Unity focused.</li>
               </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}