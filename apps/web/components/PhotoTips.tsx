import React from 'react';
import { CameraIcon } from './icons';

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
        <CameraIcon className="mt-0.5 mr-2 text-blue-600 flex-shrink-0" />

        {/* Content */}
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">Photo Tips</h4>
          <p className="text-sm text-blue-700">{content}</p>
        </div>
      </div>
    </div>
  );
}
