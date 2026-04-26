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

// Fetch jobs from Arbeitnow, Remotive, Adzuna, and Careerjet
export async function fetchJobs(query?: string, location?: string, remoteOnly?: boolean): Promise<Job[]> {
  try {
    const urls: { name: string; url: string }[] = [];

    // 1. Arbeitnow (Free) - Fetch first 2 pages
    for (let p = 1; p <= 2; p++) {
      urls.push({ name: 'arbeitnow', url: `https://arbeitnow.com/api/job-board-api?page=${p}` });
    }

    // 2. Remotive (Free) - Large single fetch
    if (query) {
      urls.push({ name: 'remotive', url: `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=150` });
    } else {
      urls.push({ name: 'remotive', url: `https://remotive.com/api/remote-jobs?limit=150` });
    }

    // Fallback to Cloudflare bindings if standard process.env is empty
    let adzunaAppId = process.env.ADZUNA_APP_ID;
    let adzunaAppKey = process.env.ADZUNA_APP_KEY;
    let careerjetAffid = process.env.CAREERJET_AFFID;

    try {
      // Dynamic import to avoid breaking local Next.js dev if not configured
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const cf = await getCloudflareContext();
      if (cf?.env) {
        adzunaAppId = adzunaAppId || (cf.env as any).ADZUNA_APP_ID;
        adzunaAppKey = adzunaAppKey || (cf.env as any).ADZUNA_APP_KEY;
        careerjetAffid = careerjetAffid || (cf.env as any).CAREERJET_AFFID;
      }
    } catch (e) {
      // Ignore errors (expected during local dev or build)
    }

    // 3. Adzuna (Premium) - Fetch limited pages/regions to avoid 429 Too Many Requests
    if (adzunaAppId && adzunaAppKey) {
      // Limit to max 3 requests for Adzuna (free tier is 25 per min)
      const regions = location ? ['us'] : ['us', 'gb', 'ca'];
      for (const region of regions) {
        // Only 1 page per region to save rate limits
        for (let p = 1; p <= 1; p++) {
          const adzunaQuery = new URLSearchParams({
            app_id: adzunaAppId,
            app_key: adzunaAppKey,
            results_per_page: '50',
          });
          if (query) adzunaQuery.append('what', query);
          if (location) adzunaQuery.append('where', location);

          urls.push({ name: 'adzuna', url: `https://api.adzuna.com/v1/api/jobs/${region}/search/${p}?${adzunaQuery.toString()}` });
        }
      }
    }

    // 4. Careerjet (Premium) - Fetch first 3 pages instead of 10 to save rate limits
    if (careerjetAffid) {
      for (let p = 1; p <= 3; p++) {
        const careerjetQuery = new URLSearchParams({
          affid: careerjetAffid,
          keywords: query || '',
          location: location || '',
          sort: 'date',
          pagesize: '50',
          page: p.toString(),
          user_ip: '0.0.0.0', // Required by Careerjet
          user_agent: 'Mozilla/5.0', // Required by Careerjet
          fragment_size: '1000' // Get much longer snippets
        });
        urls.push({ name: 'careerjet', url: `http://public.api.careerjet.net/search?locale_code=en_US&${careerjetQuery.toString()}` });
      }
    }

    const responses = await Promise.all(
      urls.map(item => {
        const headers: HeadersInit = {};
        if (item.name === 'careerjet' || item.name === 'adzuna') {
          headers['Referer'] = 'https://talentnode.example.com';
        }
        return fetch(item.url, { next: { revalidate: 3600 }, headers })
          .then(res => ({ name: item.name, res }))
          .catch(() => ({ name: item.name, res: null }));
      })
    );

    let allJobs: Job[] = [];
    const stats: Record<string, number> = { arbeitnow: 0, remotive: 0, adzuna: 0, careerjet: 0 };

    for (const { name, res } of responses) {
      if (!res) {
        console.error(`Fetch failed for ${name}`);
        continue;
      }
      if (!res.ok) {
        console.error(`API Error for ${name}: ${res.status} ${res.statusText}`);
        continue;
      }
      
      try {
        const json = await res.json();

        // Parse Arbeitnow
        if (name === 'arbeitnow' && json.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed = json.data.map((job: any) => ({
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
          allJobs = [...allJobs, ...parsed];
          stats.arbeitnow += parsed.length;
        }

        // Parse Remotive
        if (name === 'remotive' && json.jobs) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed = json.jobs.map((job: any) => ({
            id: `remotive-${job.id}`,
            title: job.title,
            company_name: job.company_name,
            location: job.candidate_required_location || 'Remote',
            remote: true, // Remotive is mostly remote
            url: job.url,
            tags: job.tags || [job.category],
            description: job.description,
            created_at: Math.floor(new Date(job.publication_date).getTime() / 1000),
          }));
          allJobs = [...allJobs, ...parsed];
          stats.remotive += parsed.length;
        }

        // Parse Adzuna
        if (name === 'adzuna' && json.results) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed = json.results.map((job: any) => {
            const locName = job.location?.display_name || 'Unknown';
            return {
              id: `adzuna-${job.id}`,
              title: job.title,
              company_name: job.company?.display_name || 'Unknown',
              location: locName,
              remote: locName.toLowerCase().includes('remote') || job.description?.toLowerCase().includes('remote work') || false,
              url: job.redirect_url,
              tags: [job.category?.label].filter(Boolean),
              description: job.description,
              created_at: Math.floor(new Date(job.created).getTime() / 1000),
            };
          });
          allJobs = [...allJobs, ...parsed];
          stats.adzuna += parsed.length;
        }

        // Parse Careerjet
        if (name === 'careerjet' && json.jobs) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed = json.jobs.map((job: any) => {
            const locName = job.locations || 'Remote';
            // Create a stable ID from the URL hash since Careerjet lacks IDs
            const str = job.url || (job.title + job.company);
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
              hash = ((hash << 5) - hash) + str.charCodeAt(i);
              hash |= 0;
            }
            const stableId = Math.abs(hash).toString(16);

            return {
              id: `careerjet-${stableId}`,
              title: job.title,
              company_name: job.company || 'Unknown',
              location: locName,
              remote: locName.toLowerCase().includes('remote') || false,
              url: job.url,
              tags: [],
              description: job.description,
              created_at: Math.floor(new Date(job.date).getTime() / 1000),
            };
          });
          allJobs = [...allJobs, ...parsed];
          stats.careerjet += parsed.length;
        }

      } catch {
        console.error(`Error parsing JSON for ${name}`);
      }
    }

    console.log(`Fetch Summary: ${allJobs.length} jobs total. Break-down:`, stats);

    // Client-side filtering
    // Only strictly filter Arbeitnow (as it doesn't support query params)
    // For others, we mostly trust the API results but still apply location/remote checks
    if (query || location || remoteOnly) {
      const q = query?.toLowerCase() || '';
      const loc = location?.toLowerCase() || '';
      
      allJobs = allJobs.filter(job => {
        const source = job.id.split('-')[0];
        
        // If it's a search-capable API, it already filtered by keyword
        const isSearchApi = ['remotive', 'adzuna', 'careerjet'].includes(source);
        
        // Keyword match
        const matchesQuery = !q || isSearchApi ||
          job.title.toLowerCase().includes(q) || 
          job.company_name.toLowerCase().includes(q) ||
          job.tags.some(t => t?.toLowerCase().includes(q));
          
        // Location match
        const matchesLocation = !loc || 
          job.location.toLowerCase().includes(loc) ||
          (loc === 'remote' && job.remote);
          
        // Remote match
        const matchesRemote = !remoteOnly || job.remote;
        
        return matchesQuery && matchesLocation && matchesRemote;
      });
    }

    // Sort by newest first
    allJobs.sort((a, b) => b.created_at - a.created_at);

    return allJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobById(id: string, query?: string, location?: string, remoteOnly?: boolean): Promise<Job | null> {
  const jobs = await fetchJobs(query, location, remoteOnly); 
  const found = jobs.find(job => job.id === id);
  return found || null;
}
