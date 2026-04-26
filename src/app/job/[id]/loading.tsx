import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading job details...</p>
      </div>
    </div>
  );
}
