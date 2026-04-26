"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Clock, Building2, Briefcase, ExternalLink, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/lib/api";

interface JobSearchClientProps {
  initialJobs: Job[];
  initialSelectedId?: string;
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  query: string;
  location: string;
}

export function JobSearchClient({
  initialJobs,
  initialSelectedId,
  totalJobs,
  currentPage,
  totalPages,
  itemsPerPage,
  query,
  location,
}: JobSearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state for instant selection
  const [selectedId, setSelectedId] = useState(initialSelectedId || (initialJobs.length > 0 ? initialJobs[0].id : ""));
  
  // Sync state with URL when jobId changes externally (e.g. browser back button)
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId && jobId !== selectedId) {
      setSelectedId(jobId);
    }
  }, [searchParams, selectedId]);

  const handleSelectJob = (id: string) => {
    setSelectedId(id);
    // Update URL shallowly without a full page reload if possible
    // In Next.js 15, we use router.push with scroll: false
    const params = new URLSearchParams(searchParams.toString());
    params.set("jobId", id);
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = initialJobs.slice(startIndex, startIndex + itemsPerPage);
  const selectedJob = initialJobs.find(j => j.id === selectedId) || (paginatedJobs.length > 0 ? paginatedJobs[0] : null);

  return (
    <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full px-6 mb-6 mt-6 gap-6 relative">
      {/* Left Side: Job List */}
      <div className={`w-full md:w-[320px] lg:w-[400px] flex flex-col bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${selectedId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <h2 className="font-bold text-[11px] text-slate-500 uppercase tracking-widest">{totalJobs.toLocaleString()} Roles</h2>
          <div className="text-[10px] font-bold text-slate-400">
             Pg {currentPage} / {totalPages}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-none">
          {paginatedJobs.length > 0 ? paginatedJobs.map((job) => {
            const isActive = selectedId === job.id;
            
            return (
              <button 
                key={job.id} 
                onClick={() => handleSelectJob(job.id)}
                className="block w-full text-left outline-none"
              >
                <div className={`p-4 rounded-xl border transition-all duration-200 ${
                  isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' 
                  : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}>
                  <div className="flex flex-col gap-1.5">
                     <h3 className={`font-bold text-[14px] leading-snug transition-colors ${
                       isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                     }`}>{job.title}</h3>
                     <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">{job.company_name}</p>
                     <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span>{formatDistanceToNow(job.created_at * 1000)} ago</span>
                     </div>
                  </div>
                </div>
              </button>
            );
          }) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
               <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">No roles found</h3>
               <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your filters or keywords</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="p-4 flex justify-center items-center gap-4">
               {currentPage > 1 && (
                  <Link href={`/search?${new URLSearchParams({ q: query, location, page: (currentPage-1).toString() }).toString()}`} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                     Previous
                  </Link>
               )}
               <div className="text-[10px] font-bold text-slate-400">{currentPage} / {totalPages}</div>
               {currentPage < totalPages && (
                  <Link href={`/search?${new URLSearchParams({ q: query, location, page: (currentPage+1).toString() }).toString()}`} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                     Next
                  </Link>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Job Details */}
      <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 overflow-y-auto bg-white dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm scrollbar-none`}>
        {selectedJob ? (
          <div key={selectedJob.id} className="p-8 lg:p-10 animate-fade-in w-full">
            {/* Mobile Back Button */}
            {selectedId && (
              <button 
                onClick={() => setSelectedId("")}
                className="inline-flex md:hidden items-center gap-2 text-xs font-bold text-blue-600 mb-6 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg"
              >
                &larr; Back to Listings
              </button>
            )}

            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                       Verified Role
                    </span>
                    {selectedJob.remote && (
                      <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                         Remote
                      </span>
                    )}
                 </div>
                 <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">{selectedJob.title}</h1>
                 <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2 text-slate-900 dark:text-white"><Building2 className="w-5 h-5 text-blue-500" /> {selectedJob.company_name}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {selectedJob.location}</span>
                    <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {formatDistanceToNow(selectedJob.created_at * 1000)} ago</span>
                 </div>
              </div>
              <div className="lg:pt-2 w-full lg:w-auto">
                <a 
                  href={selectedJob.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-10 py-4 rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 group w-full"
                >
                  Apply Now <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="space-y-10">
               <div>
                  <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-5 uppercase tracking-widest">About the Role</h2>
                  {(() => {
                    const description = selectedJob.description || '';
                    const isHtml = description.includes('<') && description.includes('>');
                    
                    if (isHtml) {
                      return (
                        <div 
                          className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:my-1 [&_*]:bg-transparent"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      );
                    }
                    
                    const formattedText = description
                      .replace(/\r\n/g, '\n')
                      .split('\n')
                      .map(line => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
                          return `<li class="ml-4">${trimmed.substring(1).trim()}</li>`;
                        }
                        return trimmed ? `<p class="mb-3">${trimmed}</p>` : '';
                      })
                      .join('');

                    return (
                      <div 
                        className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:my-1 [&_*]:bg-transparent"
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />
                    );
                  })()}
                  
                  {(selectedJob.description?.endsWith('...') || selectedJob.description?.endsWith('…')) && (
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        This is a preview. <a href={selectedJob.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click Apply</a> to read the full job description on the original source.
                      </p>
                    </div>
                  )}
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                     <h3 className="text-[11px] font-black text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> 
                        Trust & Security
                     </h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Listing verified from source. Managed by {selectedJob.id.split('-')[0]} API network.
                     </p>
                  </div>
                  {selectedJob.tags && selectedJob.tags.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                      <h3 className="text-[11px] font-black text-slate-400 mb-3 uppercase tracking-widest">Job Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.tags.slice(0, 5).map(tag => (
                          <span key={tag} className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                             {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-center p-12">
             <Briefcase className="w-10 h-10 text-slate-200 mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
