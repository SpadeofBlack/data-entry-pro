"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function TestsPage() {
  const [role, setRole] = useState("");
  const [activeTab, setActiveTab] = useState("exams"); // Toggle between 'exams' and 'grades'
  
  // Simulated Data
  const [tests] = useState([
    { id: 101, title: "Midterm: Medical Terminology", timeLimit: "5:00", passingCpm: 45 },
  ]);

  const [studentGrades] = useState([
    { id: 1, test: "Level 1 Practice", score: "52 CPM", date: "2026-04-15", status: "PASS" },
    { id: 2, test: "Speed Drills", score: "38 CPM", date: "2026-04-18", status: "FAIL" },
  ]);

  const [teacherGradebook] = useState([
    { id: 1, student: "Idali Cooper", test: "Midterm", score: "55 CPM", status: "PASS" },
    { id: 2, student: "John Doe", test: "Midterm", score: "42 CPM", status: "FAIL" },
  ]);

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || "student");
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab("exams")}
            className={`pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'exams' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}
          >
            ACTIVE EXAMS
          </button>
          <button 
            onClick={() => setActiveTab("grades")}
            className={`pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'grades' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}
          >
            GRADEBOOK
          </button>
        </div>

        {activeTab === "exams" ? (
          <section>
            <h1 className="text-3xl font-black text-slate-900 mb-6">Examination Center</h1>
            {/* ... (Insert your Test List code here) ... */}
          </section>
        ) : (
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">
                {role === "teacher" ? "Class Performance Overview" : "Your Progress Report"}
              </h2>
            </div>

            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-black">
                <tr>
                  {role === "teacher" && <th className="p-4">Student</th>}
                  <th className="p-4">Assessment</th>
                  <th className="p-4">Result</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(role === "teacher" ? teacherGradebook : studentGrades).map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    {role === "teacher" && <td className="p-4 font-bold text-blue-800">{(entry as any).student}</td>}
                    <td className="p-4 text-slate-700">{entry.test}</td>
                    <td className="p-4 font-mono font-bold">{entry.score}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black ${entry.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </main>
  );
}