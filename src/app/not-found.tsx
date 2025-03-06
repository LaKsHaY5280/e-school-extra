'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-[#21B573] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-[#413960] mb-6">Page Not Found</h2>
        
        <p className="text-[#6C6B6B] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="bg-[#21B573] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1a9c60] transition-colors"
          >
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="border border-[#21B573] text-[#21B573] py-3 px-6 rounded-lg font-medium hover:bg-[#f0fff0] transition-colors"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Technical information for debugging:</p>
          <p className="font-mono bg-gray-100 p-2 rounded mt-2 overflow-auto">
            {`URL: ${typeof window !== 'undefined' ? window.location.href : 'Server-rendered'}`}
          </p>
        </div>
      </div>
    </div>
  );
} 