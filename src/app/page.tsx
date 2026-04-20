import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Your Landing Page Content */}
      </main>
       <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6">
              Master the Art of <span className="text-blue-800">Precision.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Welcome to FOKEL Academy. Whether you're a student embarking on 
              new missions or an educator managing the workspace, excellence 
              starts with a single keystroke.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trainer" className="px-8 py-4 bg-blue-800 text-white rounded-xl font-bold text-lg hover:bg-blue-900 transition-all text-center">
                Launch Trainer
              </Link>
              <Link href="/assignments" className="px-8 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all text-center">
                View Missions
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Curated Missions</h3>
            <p className="text-slate-600">Hand-picked data entry challenges designed to bridge the gap between student and professional.</p>
          </div>
          <div>
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Timed Assessments</h3>
            <p className="text-slate-600">Push your limits with our 3-minute high-intensity sprints to build muscle memory and speed.</p>
          </div>
          <div>
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Teacher Control</h3>
            <p className="text-slate-600">The Digital Curator's Workspace allows for real-time management and deployment of assignments.</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}