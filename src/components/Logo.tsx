import React from 'react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        {/* Modern Node Icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-12">
          <rect width="32" height="32" rx="8" fill="url(#logo_grad)" />
          <path d="M11 11H21V13H17V21H15V13H11V11Z" fill="white" />
          <circle cx="21" cy="11" r="2" fill="white" className="animate-pulse" />
          <defs>
            <linearGradient id="logo_grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
      
      <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors">
        Talent<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Node</span>
      </span>
    </div>
  );
}
