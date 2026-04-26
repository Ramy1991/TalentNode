import Link from "next/link";
import { fetchJobs } from "@/lib/api";
import { Search, MapPin, Clock, Building2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "Search Results | TalentNode",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const jobs = await fetchJobs(query);

  return (
    <div className="flex-1 bg-gray-50 pb-12">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="flex flex-col md:flex-row gap-4" action="/search" method="GET">
            <div className="flex-1 flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                name="q"
                defaultValue={query}
                placeholder="Keywords (e.g. Frontend)" 
                className="bg-transparent w-full text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex-1 flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                name="location"
                placeholder="Location" 
                className="bg-transparent w-full text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors">
              Search Jobs
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Job Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Full-time
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Contract
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Remote
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">
                {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found {query && `for "${query}"`}
              </h1>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Link key={job.id} href={`/job/${job.id}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 text-gray-500">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h2>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="font-medium text-gray-800">{job.company_name}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location} {job.remote && '(Remote)'}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatDistanceToNow(job.created_at * 1000, { addSuffix: true })}</span>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.tags.slice(0, 4).map(tag => (
                              <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {jobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search keywords or removing filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
