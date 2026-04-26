import { getJobById } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Clock, Building2, Briefcase, ExternalLink, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

// Dynamic metadata for SEO
export async function generateMetadata(
  props: { params: Promise<{ id: string }>, searchParams: Promise<{ q?: string, location?: string, remote?: string }> }
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const resolvedSearch = await props.searchParams;
  const job = await getJobById(
    resolvedParams.id, 
    resolvedSearch.q, 
    resolvedSearch.location, 
    resolvedSearch.remote === 'true'
  );
  
  if (!job) {
    return { title: 'Job Not Found | TalentNode' };
  }

  return {
    title: `${job.title} at ${job.company_name} | TalentNode`,
    description: job.description?.substring(0, 160).replace(/<[^>]+>/g, '') || `Apply for the ${job.title} role at ${job.company_name} in ${job.location}.`,
    openGraph: {
      title: `${job.title} at ${job.company_name}`,
      description: `Apply for the ${job.title} role at ${job.company_name} in ${job.location}.`,
      type: "website",
    }
  };
}

export default async function JobDetailsPage(
  props: { params: Promise<{ id: string }>, searchParams: Promise<{ q?: string, location?: string, remote?: string }> }
) {
  const resolvedParams = await props.params;
  const resolvedSearch = await props.searchParams;
  const job = await getJobById(
    resolvedParams.id, 
    resolvedSearch.q, 
    resolvedSearch.location, 
    resolvedSearch.remote === 'true'
  );

  if (!job) {
    notFound();
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 pb-24 lg:pb-12 pt-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link / Breadcrumb */}
        <div className="mb-6">
          <Link href="/search" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to search results
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Job Content */}
          <div className="flex-1">
            {/* Job Header */}
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm transition-colors duration-300">
              <div className="flex gap-5 items-start">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-500">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{job.company_name}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400" /> {job.remote ? 'Remote' : 'On-site'}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> Posted {formatDistanceToNow(job.created_at * 1000, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Content */}
            <div className="bg-white dark:bg-gray-900 border-x border-b border-gray-200 dark:border-gray-800 rounded-b-2xl p-8 shadow-sm transition-colors duration-300">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Job Description</h2>
              
              {job.description ? (
                <div 
                  className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&_*]:bg-transparent"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No description provided for this job.</p>
              )}
            </div>
          </div>

          {/* Sticky Sidebar (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm sticky top-24 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Apply for this role</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">You will be redirected to the employer&apos;s website to complete your application.</p>
              
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Apply Now <ExternalLink className="w-5 h-5" />
              </a>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                <p><strong>Job Source:</strong> {job.id.split('-')[0].charAt(0).toUpperCase() + job.id.split('-')[0].slice(1)}</p>
                <p className="mt-2"><strong>Tags:</strong> {job.tags.slice(0, 3).join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 transition-colors duration-300">
        <a 
          href={job.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md"
        >
          Apply Now <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
