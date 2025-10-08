'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    logger.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-red-50 rounded text-left">
            <p className="text-xs text-red-800 font-mono break-all">{error.message}</p>
          </div>
        )}
        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="block mt-3 text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Return to homepage
        </a>
      </div>
    </div>
  );
}
