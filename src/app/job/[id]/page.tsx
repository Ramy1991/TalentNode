import { getJobById } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Clock, Building2, Briefcase, ExternalLink, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

// Dynamic metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await getJobById(resolvedParams.id);
  
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

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const job = await getJobById(resolvedParams.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex-1 bg-gray-50 pb-12 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link / Breadcrumb */}
        <div className="mb-6">
          <Link href="/search" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to search results
          </Link>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-t-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex gap-5">
              <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="font-semibold text-gray-900">{job.company_name}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.remote ? 'Remote' : 'On-site'}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Posted {formatDistanceToNow(job.created_at * 1000, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Apply Now <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Job Details Content */}
        <div className="bg-white border-x border-b border-gray-200 rounded-b-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Job Description</h2>
          
          {job.description ? (
            <div 
              className="prose prose-blue max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          ) : (
            <p className="text-gray-500 italic">No description provided for this job.</p>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this role?</h3>
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Apply on {job.company_name}&apos;s Site <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
