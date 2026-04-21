"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [user] = useState({
    firstName: "Idali",
    lastName: "Cooper",
    institution: "El Paso Community College",
    degree: "Associate of Science in Computer Programming",
    graduation: "May 2026",
    role: "Student / Game Developer"
  });

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6 max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8">
          <h1 className="text-5xl font-black tracking-tighter mb-2 italic">ACADEMIC DOSSIER</h1>
          <p className="text-slate-500 dark:text-zinc-500 font-mono uppercase tracking-[0.3em] text-xs font-bold">
            Identity Verification: Active
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: IDENTITY & SKILLS */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Identity Details - Now Light/Dark Responsive */}
            <section className="bg-slate-50 border border-slate-200 shadow-sm 
                                dark:bg-zinc-900 dark:border-white/5 dark:shadow-none 
                                p-8 rounded-[2rem] transition-all">
              <h2 className="text-sm font-black text-blue-600 dark:text-yellow-500 uppercase tracking-widest mb-6">
                Identity Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-zinc-500 uppercase mb-1 font-bold">First Name</label>
                  <p className="text-xl font-bold">{user.firstName}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-zinc-500 uppercase mb-1 font-bold">Last Name</label>
                  <p className="text-xl font-bold">{user.lastName}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] text-slate-500 dark:text-zinc-500 uppercase mb-1 font-bold">Current Institution</label>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-400">{user.institution}</p>
                </div>
              </div>
            </section>

            {/* Technical Stack - (Your Corrected Section) */}
            <section className="bg-slate-50 border border-slate-200 shadow-sm 
                                dark:bg-zinc-900 dark:border-white/5 dark:shadow-none 
                                p-8 rounded-[2rem] transition-all">
              <h2 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-6">
                Technical Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {["C#", "Unity Engine", "Next.js", "React", "Tailwind CSS", "Local LLMs"].map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full text-xs font-mono font-bold
                                               bg-white border border-slate-200 text-slate-700
                                               dark:bg-black/40 dark:border-white/10 dark:text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STATUS */}
          <div className="space-y-8">
            
            {/* Degree Progress - High Contrast Blue stays consistent */}
            <section className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-lg shadow-blue-500/20">
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80">Degree Progress</h2>
              <p className="text-2xl font-black leading-tight mb-4">{user.degree}</p>
              <div className="pt-4 border-t border-white/20">
                <p className="text-[10px] uppercase font-bold opacity-70">Expected Graduation</p>
                <p className="font-mono font-bold">{user.graduation}</p>
              </div>
            </section>

            {/* Development Role - Now Light/Dark Responsive */}
            <section className="bg-slate-50 border border-slate-200 shadow-sm 
                                dark:bg-zinc-900 dark:border-white/5 dark:shadow-none 
                                p-8 rounded-[2rem] transition-all">
              <h2 className="text-[10px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4">
                Development Role
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 dark:bg-yellow-500 rounded-full animate-pulse" />
                <p className="font-bold text-lg">{user.role}</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}