import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Briefcase } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalentNode - Discover Your Next Opportunity",
  description: "Search and apply for jobs globally with TalentNode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50 antialiased">
      <body className={`${inter.className} min-h-full flex flex-col text-gray-900`}>
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">TalentNode</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                <Link href="/search" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Find Jobs</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Post a Job</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Career Guide</Link>
              </nav>

              <div className="flex items-center gap-4">
                {/* Auth features to be added later */}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} TalentNode. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
