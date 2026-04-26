import Link from "next/link";
import { Search, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Find your dream job <br className="hidden md:block" />
          <span className="text-blue-600">in seconds</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Search thousands of job listings from top companies and startups. 
          Discover opportunities that match your skills and apply today.
        </p>

        {/* Search Bar */}
        <form action="/search" method="GET" className="max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              name="q"
              placeholder="Job title, keywords, or company" 
              className="bg-transparent w-full text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div className="flex-1 flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              name="location"
              placeholder="City, state, or 'Remote'" 
              className="bg-transparent w-full text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-md">
            Search Jobs
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-sm text-gray-500 mt-1">Popular:</span>
          {["Remote", "Software Engineer", "Marketing", "Product Manager", "Design"].map(tag => (
            <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
