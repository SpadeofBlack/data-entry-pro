"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from 'next/link';


export default function AssignmentsPage() {
  const [role, setRole] = useState("");
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Level 1: Basic Data Entry", type: "Speed", difficulty: "Beginner" },
    { id: 2, title: "Level 2: Error Detection", type: "Accuracy", difficulty: "Intermediate" }
  ]);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || "student";
    setRole(savedRole);
  }, []);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;

    if (titleInput.value) {
      const newAssignment = {
        id: Date.now(),
        title: titleInput.value,
        type: "Custom Mission",
        difficulty: "Teacher Assigned"
      };
      setAssignments([newAssignment, ...assignments]);
      titleInput.value = ""; 
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
        <div className="mb-6">
  <Link 
    href="/dashboard" 
    className="inline-flex items-center gap-2 text-sm font-bold transition-all
               text-slate-500 hover:text-blue-700
               dark:text-zinc-500 dark:hover:text-yellow-500 group"
  >
    {/* The Arrow */}
    <span className="transition-transform group-hover:-translate-x-1">
      ←
    </span>
    RETURN TO COMMAND CENTER
  </Link>
</div>

        <header className="mb-10">
          {/* text-foreground ensures it turns white in dark mode */}
          <h1 className="text-4xl font-black text-foreground mb-2">Mission Archive</h1>
          {/* Changed color slightly for better dark mode visibility */}
          <p className="text-blue-600 dark:text-yellow-500 font-medium">Select a task to begin your training session.</p>
        </header>

        {/* TEACHER UPLOAD SECTION */}
        {role === "teacher" && (
          <section className="mb-12 p-6 rounded-2xl border-2 border-dashed transition-all
            bg-white border-blue-200 shadow-sm
            dark:bg-zinc-900/50 dark:border-white/10 dark:shadow-black/50">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-blue-600 dark:bg-yellow-500 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-bold text-blue-800 dark:text-yellow-500 uppercase tracking-wider">Curator Tools: Upload Mission</h2>
            </div>
            <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4">
              <input 
                name="title" 
                type="text" 
                placeholder="Enter assignment title..." 
                className="flex-1 p-4 rounded-xl border outline-none transition-all
                  bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400
                  dark:bg-black/40 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-600
                  focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500/20"
                required
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400">
                Deploy to Students
              </button>
            </form>
          </section>
        )}

        {/* ASSIGNMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="group p-6 rounded-2xl border transition-all cursor-pointer
              /* Light Mode Colors */
              bg-white border-slate-200 hover:border-blue-400 hover:shadow-md
              /* Dark Mode Colors */
              dark:bg-zinc-900 dark:border-white/5 dark:hover:border-yellow-500/50 dark:hover:shadow-black">
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-black/40 text-slate-600 dark:text-zinc-400 text-xs font-bold rounded-full uppercase">
                  {assignment.type}
                </span>
                <span className="text-blue-600 dark:text-yellow-500 font-bold text-sm">{assignment.difficulty}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-yellow-400 transition-colors">
                {assignment.title}
              </h3>
              
              <button className="mt-6 w-full py-3 rounded-xl font-black transition-all opacity-0 group-hover:opacity-100
                bg-slate-900 text-white dark:bg-yellow-500 dark:text-black">
                START MISSION
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}