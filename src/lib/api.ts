export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  remote: boolean;
  url: string;
  tags: string[];
  description?: string;
  created_at: number;
}

// Fetch jobs from Arbeitnow and Remotive (Free APIs)
export async function fetchJobs(query?: string): Promise<Job[]> {
  try {
    const urls = [
      'https://arbeitnow.com/api/job-board-api',
    ];

    // If query exists, we can use Remotive's native search
    if (query) {
      urls.push(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`);
    } else {
      urls.push(`https://remotive.com/api/remote-jobs?limit=50`);
    }

    const responses = await Promise.all(
      urls.map(url => fetch(url, { next: { revalidate: 3600 } }).catch(() => null))
    );

    let allJobs: Job[] = [];

    // Parse Arbeitnow Response
    if (responses[0] && responses[0].ok) {
      const json = await responses[0].json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arbeitnowJobs: Job[] = json.data.map((job: any) => ({
        id: `arbeitnow-${job.slug}`,
        title: job.title,
        company_name: job.company_name,
        location: job.location,
        remote: job.remote,
        url: job.url,
        tags: job.tags || [],
        description: job.description,
        created_at: job.created_at,
      }));
      allJobs = [...allJobs, ...arbeitnowJobs];
    }

    // Parse Remotive Response
    if (responses[1] && responses[1].ok) {
      const json = await responses[1].json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const remotiveJobs: Job[] = (json.jobs || []).map((job: any) => ({
        id: `remotive-${job.id}`,
        title: job.title,
        company_name: job.company_name,
        location: job.candidate_required_location || 'Remote',
        remote: true, // Remotive is mostly remote
        url: job.url,
        tags: job.tags || [job.category],
        description: job.description,
        // Convert to Unix timestamp
        created_at: Math.floor(new Date(job.publication_date).getTime() / 1000),
      }));
      allJobs = [...allJobs, ...remotiveJobs];
    }

    // Client-side filtering (handles Arbeitnow filtering, and additional strict filtering)
    if (query) {
      const q = query.toLowerCase();
      allJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(q) || 
        job.company_name.toLowerCase().includes(q) ||
        job.tags.some(t => t?.toLowerCase().includes(q))
      );
    }

    // Sort by newest first
    allJobs.sort((a, b) => b.created_at - a.created_at);

    return allJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  const jobs = await fetchJobs(); // Fetch all recent + any query if we stored it, but here we just fetch default
  
  // Try to find the job in the default fetch list
  const found = jobs.find(job => job.id === id);
  
  // If not found in default list and it's a remotive job, we can fetch it via search
  // Remotive API doesn't have a single job endpoint, but usually it's in the list
  // Note: For a real app, storing them in D1 is best for direct ID lookup
  
  return found || null;
}
