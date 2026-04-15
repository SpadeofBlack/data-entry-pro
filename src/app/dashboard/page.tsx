"use client";

import React from 'react';
import Link from 'next/link'; // Essential for linking the pages!

export default function TeacherDashboard() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Top Navigation - Updated with Links */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tight text-blue-800">FOKEL Academy</span>
            <nav className="flex items-center gap-6 ml-4">
              <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">TRAINER</Link>
              <Link href="/profile" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">PROFILE</Link>
              <Link href="/dashboard" className="text-sm font-bold text-blue-800">DASHBOARD</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
              T
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full hidden xl:flex flex-col pt-24 w-64 bg-slate-100 border-r border-slate-200 p-4">
          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-sm">
              Dashboard Overview
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200 rounded-lg text-left">
              Resources
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 xl:ml-64 p-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <header>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
                Digital Curator's Workspace
              </h1>
              <p className="text-slate-600 text-lg">Precision management for the modern educator.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Assignment Form */}
              <section className="lg:col-span-7 bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold mb-8 text-blue-900">Create New Assignment</h3>
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500 uppercase">Assignment Title</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-800" 
                      placeholder="e.g. Advanced Comparative Literature Analysis" 
                      type="text"
                    />
                  </div>
                  <button className="w-full bg-blue-800 text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all" type="button">
                    Deploy Assignment
                  </button>
                </form>
              </section>

              {/* Stats Card */}
              <section className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-8">Schedule Timed Test</h3>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center">
                  <p className="font-bold">Duration Settings</p>
                  <span className="text-xl font-black">45 MIN</span>
                </div>
                <button className="w-full mt-12 bg-white text-slate-900 py-3 rounded-lg font-bold hover:bg-slate-100">
                  Initialize Test Engine
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}