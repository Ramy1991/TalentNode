import { Search, MapPin } from "lucide-react";
import { SearchButton } from "@/components/SearchButton";
import { fetchJobs } from "@/lib/api";
import { JobSearchClient } from "@/components/JobSearchClient";

export const metadata = {
  title: "Jobs | TalentNode",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; remote?: string; page?: string; jobId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const location = resolvedSearchParams.location || "";
  const remoteOnly = resolvedSearchParams.remote === 'true';
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
  const selectedJobId = resolvedSearchParams.jobId;
  const itemsPerPage = 20;

  const jobs = await fetchJobs(query, location, remoteOnly);
  
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Centered Search Bar - More Natural Height */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <form className="flex flex-col md:flex-row gap-3 items-center" action="/search" method="GET">
            <div className="flex-1 w-full flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/50 focus-within:border-blue-500 transition-all">
              <Search className="w-4 h-4 text-blue-500 mr-3" />
              <input 
                type="text" 
                name="q"
                defaultValue={query}
                placeholder="Job title or keywords" 
                className="bg-transparent w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>
            <div className="flex-1 w-full flex items-center bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/50 focus-within:border-blue-500 transition-all">
              <MapPin className="w-4 h-4 text-blue-500 mr-3" />
              <input 
                type="text" 
                name="location"
                defaultValue={location}
                placeholder="Location" 
                className="bg-transparent w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>
            <div className="flex items-center gap-2 px-4 whitespace-nowrap">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="remote" 
                    value="true" 
                    defaultChecked={remoteOnly}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Remote Only</span>
               </label>
            </div>
            <SearchButton 
              text="Search" 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
            />
          </form>
        </div>
      </div>

      <JobSearchClient 
        initialJobs={jobs}
        initialSelectedId={selectedJobId}
        totalJobs={totalJobs}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        query={query}
        location={location}
      />
    </div>
  );
}





