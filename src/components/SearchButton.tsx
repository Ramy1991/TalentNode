"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Search } from "lucide-react";

interface SearchButtonProps {
  text?: string;
  className?: string;
  showIcon?: boolean;
}

export function SearchButton({ 
  text = "Search Jobs", 
  className = "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70",
  showIcon = false
}: SearchButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`${className} flex items-center justify-center gap-2 min-w-[120px]`}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Searching...</span>
        </>
      ) : (
        <>
          {showIcon && <Search className="w-4 h-4" />}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
