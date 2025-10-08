'use client';

import { useState, useRef, useEffect } from 'react';
import { toGPXWaypoint, googleMapsPlaceLink } from '@/lib/mapLinks';
import { logger } from '@/lib/logger';

interface ShareDownloadProps {
  name: string;
  lat: number;
  lng: number;
  pageUrl: string;
  slug?: string;
}

export default function ShareDownload({ name, lat, lng, pageUrl, slug }: ShareDownloadProps) {
  const [copied, setCopied] = useState(false);
  const copyMessageRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<NodeJS.Timeout>();

  // Reset copy state after a delay
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  // Function to handle copying page URL
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);

      // Clear any existing timer
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }

      // Set a timer to clear the copied state after 2 seconds
      copyTimerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      logger.error('Failed to copy:', error);
    }
  };

  // Function to generate and download GPX file
  const handleDownloadGPX = () => {
    // Create GPX content
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="TravelKnowledge" xmlns="http://www.topografix.com/GPX/1/1">
  ${toGPXWaypoint({ name, lat, lng })}
</gpx>`;

    // Create blob and download
    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug || name.replace(/\s+/g, '-').toLowerCase()}.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Google Maps place link
  const mapsUrl = googleMapsPlaceLink(lat, lng, name);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Share & Download</h3>

      <div className="space-y-3">
        {/* Copy Link Button */}
        <div>
          <button
            onClick={handleCopyLink}
            aria-label="Copy page link to clipboard"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy page link
          </button>

          {/* Copy confirmation message with aria-live for screen readers */}
          <div
            ref={copyMessageRef}
            aria-live="polite"
            className={`text-center text-sm mt-2 text-green-600 transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}
          >
            Link copied to clipboard!
          </div>
        </div>

        {/* Open in Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in Google Maps`}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Open in Google Maps
        </a>

        {/* Download GPX */}
        <button
          onClick={handleDownloadGPX}
          aria-label={`Download GPX waypoint for ${name}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download GPX
        </button>
      </div>
    </div>
  );
}
