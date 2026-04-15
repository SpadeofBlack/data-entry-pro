"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile changes saved to FOKEL Academy records!");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4 border-b border-slate-200">
        <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tight text-blue-800">FOKEL Academy</span>
            <div className="flex items-center gap-6 ml-4">
                <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-800">TRAINER</Link>
                <Link href="/profile" className="text-sm font-bold text-blue-800">PROFILE</Link>
                <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-800">DASHBOARD</Link>
            </div>
        </div>
  <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold">
    AJ
  </div>
</nav>

      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-100 flex flex-col p-4 gap-2 pt-24 border-r border-slate-200">
        <h2 className="text-xl font-extrabold text-blue-900 px-4">FOKEL Portal</h2>
        <p className="text-xs text-slate-500 font-medium px-4 mb-6">Academic Identity</p>
        <button className="flex items-center gap-3 px-4 py-3 bg-white text-blue-700 rounded-lg shadow-sm font-semibold">
          Profile Overview
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Digital Curator Profile</h1>
            <p className="mt-2 text-slate-600">Precision management of your academic and personal records.</p>
          </header>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Identity Details */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-t-4 border-blue-800">
              <h3 className="text-lg font-bold mb-6 text-blue-900">Identity Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                  <input className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-800 outline-none" type="text" defaultValue="Alexander" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                  <input className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-800 outline-none" type="text" defaultValue="Curator" />
                </div>
              </div>
            </div>

            {/* Academic Section (The new stuff she sent!) */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-l-4 border-blue-400">
              <h3 className="text-lg font-bold mb-6 text-blue-900">Academic Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institution</label>
                  <p className="font-bold text-slate-800">FOKEL Academy of Higher Learning</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teacher</label>
                  <input className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 outline-none" type="text" defaultValue="Dr. Elizabeth Sterling" />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <footer className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
              <button 
                onClick={() => router.push('/')}
                type="button" 
                className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Back to Game
              </button>
              <button 
                type="submit" 
                className="w-full sm:w-auto px-10 py-3 text-sm font-bold text-white bg-blue-800 shadow-md hover:bg-blue-900 rounded-lg"
              >
                Save Changes
              </button>
            </footer>
          </form>
        </div>
      </main>
    </div>
  );
}