export default function Loading() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Skeleton Search Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            <div className="flex-1 w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            <div className="w-full md:w-32 h-11 bg-blue-100 dark:bg-blue-900/30 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full px-6 mb-6 mt-6 gap-6">
        {/* Skeleton Left List */}
        <div className="w-full md:w-[320px] lg:w-[400px] flex flex-col bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 h-12 bg-slate-50/50 dark:bg-slate-800/30"></div>
          <div className="p-2 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-transparent space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Right Details */}
        <div className="hidden md:block flex-1 bg-white dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse overflow-hidden">
          <div className="p-8 lg:p-10 space-y-8">
             <div className="space-y-4">
                <div className="h-4 w-20 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
                <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="flex gap-4">
                   <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                   <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
             </div>
             <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
             <div className="space-y-4">
                <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
                <div className="space-y-2">
                   <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded w-full"></div>
                   <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded w-full"></div>
                   <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded w-4/5"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

