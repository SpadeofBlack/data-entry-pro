import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4 border-b border-slate-200">
      <div className="flex items-center gap-8">
        {/* Brand Name */}
        <span className="text-2xl font-bold tracking-tight text-blue-800">
          FOKEL Academy
        </span>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 ml-4">
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">
            HOME
          </Link>
          <Link href="/assignments" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">
            ASSIGNMENTS
          </Link>
          <Link href="/tests" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">
            TESTS
          </Link>
          <Link href="/profile" className="text-sm font-bold text-slate-500 hover:text-blue-800 transition-colors">
            PROFILE
          </Link>
          
          {/* We'll keep this one highlighted so it's easy to find for your teacher/admin demo */}
          <Link href="/dashboard" className="text-sm font-black text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md transition-all">
            DASHBOARD
          </Link>
        </div>
      </div>
    </nav>
  );
}