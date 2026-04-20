"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function AssignmentsPage() {
  const [role, setRole] = useState("");
  // Sample assignments to start with
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Level 1: Basic Data Entry", type: "Speed", difficulty: "Beginner" },
    { id: 2, title: "Level 2: Error Detection", type: "Accuracy", difficulty: "Intermediate" }
  ]);

  useEffect(() => {
    // Check who is logged in so we know whether to show the upload tool
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
      titleInput.value = ""; // Clear the box after uploading
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mission Archive</h1>
          <p className="text-slate-500 mt-2">Select a task to begin your training session.</p>
        </header>

        {/* TEACHER UPLOAD SECTION - Only visible if logged in as teacher */}
        {role === "teacher" && (
          <section className="mb-12 p-6 bg-white rounded-2xl border-2 border-dashed border-blue-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-bold text-blue-800 uppercase tracking-wider">Curator Tools: Upload Mission</h2>
            </div>
            <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4">
              <input 
                name="title" 
                type="text" 
                placeholder="Enter assignment title (e.g. Q4 Financial Audit)..." 
                className="flex-1 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                Deploy to Students
              </button>
            </form>
          </section>
        )}

        {/* ASSIGNMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">
                  {assignment.type}
                </span>
                <span className="text-blue-600 font-medium text-sm">{assignment.difficulty}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                {assignment.title}
              </h3>
              <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Start Mission
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}