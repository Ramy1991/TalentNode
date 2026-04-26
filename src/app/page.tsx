import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { SearchButton } from "@/components/SearchButton";

export default function Home() {
  return (
    <div className="flex-1 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative flex flex-col justify-center">
      {/* Background Blobs for WOW factor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-10 dark:opacity-20 blur-[120px] pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-indigo-600 rounded-full"></div>
      </div>

      {/* Centered Hero Section (Reduced Height) */}
      <section className="max-w-6xl mx-auto px-6 py-6 md:py-8 relative w-full">
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Daily Job Pulse: 1,000+ New Roles
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            The next era of <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              job searching
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto font-medium">
            Discover thousands of hand-picked roles from top sources globally in one unified, high-speed interface.
          </p>

          {/* Search Bar (More Natural Size) */}
          <form action="/search" method="GET" className="max-w-4xl mx-auto bg-white dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-800/50 px-5 py-4 rounded-xl border border-slate-100 dark:border-slate-700/50 focus-within:border-blue-400 transition-all">
              <Search className="w-5 h-5 text-blue-500 mr-4" />
              <input 
                type="text" 
                name="q"
                placeholder="Job title, keywords, or company" 
                className="bg-transparent w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-bold"
              />
            </div>
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-800/50 px-5 py-4 rounded-xl border border-slate-100 dark:border-slate-700/50 focus-within:border-blue-400 transition-all">
              <MapPin className="w-5 h-5 text-blue-500 mr-4" />
              <input 
                type="text" 
                name="location"
                placeholder="Location or 'Remote'" 
                className="bg-transparent w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-bold"
              />
            </div>
            <SearchButton className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-xl transition-all text-sm shadow-lg shadow-blue-500/20 active:scale-95" />
          </form>

          {/* Focused 2-Line Search Tag Cloud - Compact */}
          <div className="mt-6 max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-3">
            {[
              "AI Engineer", "Frontend", "Backend", "DevOps", "Data Science", 
              "Marketing", "Product", "UI/UX", "Design", "Sales", "SEO", 
              "Finance", "Project Manager", "Customer Support", "Remote", "Healthcare"
            ].map(tag => (
              <Link 
                key={tag} 
                href={`/search?q=${encodeURIComponent(tag)}`} 
                className="text-[11px] font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}








