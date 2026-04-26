import { ShieldCheck, Zap, Globe, Target } from "lucide-react";

export const metadata = {
  title: "About Us | TalentNode - Revolutionizing Job Search",
  description: "Learn how TalentNode aggregates thousands of global jobs using AI-powered search across multiple premium networks.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
          Aggregating the <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            World&apos;s Opportunities
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          TalentNode was built to solve the fragmentation of the modern job market. We unify thousands of listings from premium sources into a single, high-performance interface.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <Zap className="w-10 h-10 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">High Performance</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Built on Next.js 15, we provide instantaneous search results from over 4 global job networks simultaneously.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Verified Roles</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every job listed on TalentNode is scanned for authenticity and vetted through our multi-source verification protocol.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <Globe className="w-10 h-10 text-indigo-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Global Reach</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We aggregate jobs across US, UK, Europe, India, and Australia, providing a truly international search experience.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <Target className="w-10 h-10 text-violet-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Remote First</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Our advanced filters prioritize work-from-home opportunities, making it easier to find the perfect remote balance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-slate-900 dark:bg-slate-900 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Our Mission</h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            &quot;To empower every job seeker with the fastest, cleanest, and most comprehensive tools to discover their next career milestone. No ads, no clutter—just opportunities.&quot;
          </p>
        </div>
      </section>

      {/* Creator Context */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Built with Precision</h3>
           <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
             TalentNode is a project by Ramy Gharib, designed to push the boundaries of modern web performance and user-centric design.
           </p>
           <a 
             href="https://ramygharib.is-a.dev/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-500/20"
           >
             Visit Portfolio
           </a>
        </div>
      </section>
    </div>
  );
}
