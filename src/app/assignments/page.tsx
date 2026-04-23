"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Added for the redirect
import { supabase } from "@/lib/supabase"; // Added to check session
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function AssignmentsPage() {
  const router = useRouter();
  const [role, setRole] = useState("student"); // Default to student
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Warm-up: Home Row Basics", type: "Standard Text", difficulty: "Beginner" },
    { id: 2, title: "Level 1: Standard Speed Trial", type: "Standard Text", difficulty: "Beginner" },
    { id: 3, title: "Drill: Alpha-Numeric Mix", type: "Alpha-Numeric", difficulty: "Intermediate" },
    { id: 4, title: "Level 2: Precision Challenge", type: "Alpha-Numeric", difficulty: "Intermediate" },
    { id: 5, title: "Drill: Financial Entry (10-Key)", type: "Numeric (10-Key)", difficulty: "Advanced" },
    { id: 6, title: "Level 3: Ten-Key Mastery", type: "Numeric (10-Key)", difficulty: "Advanced" },
    { id: 7, title: "Level 4: Structured Data Forms", type: "Structured Forms", difficulty: "Expert" }
  ]);

  useEffect(() => {
    const checkUser = async () => {
      // 1. Get the current session
      const { data: { session } } = await supabase.auth.getSession();

      // 2. If no session, kick them back to login
      if (!session) {
        router.push("/");
        return;
      }

      // 3. Get the role from Supabase metadata instead of localStorage
      const userRole = session.user.user_metadata?.role || "student";
      setRole(userRole);
    };

    checkUser();
  }, [router]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;

    if (titleInput.value) {
      const newAssignment = {
        id: Date.now(),
        title: titleInput.value,
        type: "Standard Text",
        difficulty: "Teacher Assigned"
      };
      setAssignments([newAssignment, ...assignments]);
      titleInput.value = "";
    }
  };

  // Rest of your return statement stays the same...
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
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            RETURN TO COMMAND CENTER
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl font-black text-foreground mb-2">Mission Archive</h1>
          <p className="text-blue-600 dark:text-yellow-500 font-medium">Select a task to begin your training session.</p>
        </header>

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
            <div key={assignment.id} className="group p-6 rounded-2xl border transition-all
              bg-white border-slate-200 hover:border-blue-400 hover:shadow-md
              dark:bg-zinc-900 dark:border-white/5 dark:hover:border-yellow-500/50 dark:hover:shadow-black">
              
              {/* Added Mission Info Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-black/40 text-slate-600 dark:text-zinc-400 text-xs font-bold rounded-full uppercase">
                  {assignment.type}
                </span>
                <span className="text-blue-600 dark:text-yellow-500 font-bold text-sm">{assignment.difficulty}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-yellow-400 transition-colors">
                {assignment.title}
              </h3>
              
              <div className="mt-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <Link href={`/trainer?mode=${assignment.type}&practice=true`}>
                  <button className="w-full py-2 rounded-xl font-bold border-2 border-slate-900 dark:border-yellow-500 text-slate-900 dark:text-yellow-500 hover:bg-slate-100 dark:hover:bg-yellow-500/10 transition-all text-sm">
                    PRACTICE (UNTIMED)
                  </button>
                </Link>
                
                <Link href={`/trainer?mode=${assignment.type}`}>
                  <button className="w-full py-3 rounded-xl font-black bg-slate-900 text-white dark:bg-yellow-500 dark:text-black hover:scale-[1.02] transition-all">
                    START TRIAL (TIMED)
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}