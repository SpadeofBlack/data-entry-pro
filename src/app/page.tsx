import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      {/* pt-40 gives plenty of room below the Navbar */}
      <div className="pt-40 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <header className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Master the Art of <br/>
            <span className="text-blue-600 dark:text-yellow-500 italic">Precision.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-zinc-400 font-medium">
            Welcome to FOKEL Academy. Whether you're a student embarking on new missions 
            or an educator managing the workspace, excellence starts with a single keystroke.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link href="/trainer" className="px-10 py-4 bg-blue-600 dark:bg-yellow-500 text-white dark:text-black font-black rounded-2xl shadow-xl transition-transform hover:scale-105">
            LAUNCH TRAINER
          </Link>
          <Link href="/assignments" className="px-10 py-4 bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white font-black rounded-2xl border border-slate-200 dark:border-white/10 transition-transform hover:scale-105">
            VIEW MISSIONS
          </Link>
        </div>

      </div>
    </main>
  );
}