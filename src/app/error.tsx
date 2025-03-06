'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#413960] mb-6">Something went wrong</h2>
        
        <p className="text-[#6C6B6B] mb-8">
          We're sorry, but we encountered an unexpected error. Our team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-[#21B573] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1a9c60] transition-colors"
          >
            Try again
          </button>
          
          <Link 
            href="/"
            className="border border-[#21B573] text-[#21B573] py-3 px-6 rounded-lg font-medium hover:bg-[#f0fff0] transition-colors"
          >
            Go Home
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-sm text-gray-500 text-left">
            <p>Error details (visible in development only):</p>
            <pre className="font-mono bg-gray-100 p-4 rounded mt-2 overflow-auto text-xs">
              {error.message}
              {error.stack && (
                <>
                  <br /><br />
                  {error.stack}
                </>
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 