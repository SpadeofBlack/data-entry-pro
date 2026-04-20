import React from 'react';

export default function AssignmentsPage() {
  // We can eventually move this data to a separate file or a database!
  const missions = [
    { id: 1, title: "Historical Archives", difficulty: "Easy", type: "Text Only", status: "Available" },
    { id: 2, title: "Alpha-Numeric Sprint", difficulty: "Medium", type: "Mixed Data", status: "Locked" },
    { id: 3, title: "Financial Ledger Entry", difficulty: "Hard", type: "Numbers Only", status: "Locked" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Available Missions</h1>
          <p className="text-slate-600 text-lg">Select an assignment to begin your training session.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <div 
              key={mission.id} 
              className={`p-6 rounded-2xl border transition-all ${
                mission.status === "Available" 
                ? "bg-white border-slate-200 shadow-sm hover:shadow-md cursor-pointer" 
                : "bg-slate-100 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  mission.difficulty === "Easy" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {mission.difficulty}
                </span>
                {mission.status === "Locked" && <span>🔒</span>}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2">{mission.title}</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Type: {mission.type}</p>
              
              <button 
                disabled={mission.status === "Locked"}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  mission.status === "Available" 
                  ? "bg-blue-800 text-white hover:bg-blue-900" 
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                {mission.status === "Available" ? "Accept Mission" : "LOCKED"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}