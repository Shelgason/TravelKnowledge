import React from 'react';

interface PhotoTipsProps {
  content?: string;
}

export default function PhotoTips({ content }: PhotoTipsProps) {
  // Don't render anything if no content is provided
  if (!content) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
      <div className="flex items-start">
        {/* Camera Icon */}
        <svg
          className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {/* Content */}
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">Photo Tips</h4>
          <p className="text-sm text-blue-700">{content}</p>
        </div>
      </div>
    </div>
  );
}
