import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalentNode - Discover Your Next Opportunity",
  description: "Search and apply for jobs globally with TalentNode.",
  icons: {
    icon: "/tn-icon.svg?v=2",
    apple: "/tn-icon.svg?v=2",
  },
};

import { Logo } from "@/components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                  <Logo />
                </Link>
                
                <nav className="hidden md:flex space-x-8">
                  <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Find Jobs</Link>
                  <Link href="/search?remote=true" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Remote Jobs</Link>
                  <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">About</Link>
                </nav>

                <div className="flex items-center gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} TalentNode. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span>Built by <a href="https://ramygharib.is-a.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Ramy Gharib</a></span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a href="https://github.com/Ramy1991" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
