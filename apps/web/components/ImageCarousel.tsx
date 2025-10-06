'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity';

interface ImageCarouselProps {
  images: SanityAsset[];
  altText: string;
}

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Don't render if there are no images
  if (!images || images.length === 0) {
    return null;
  }

  // Only render the first image if there's only one
  if (images.length === 1) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-md mb-6">
        <Image
          src={urlFor(images[0])!.url()}
          alt={altText}
          width={800}
          height={400}
          className="object-cover object-center w-full h-auto"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>
    );
  }

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-md mb-6">
      {/* Current image */}
      <Image
        src={urlFor(images[currentImageIndex])!.url()}
        alt={`${altText} - Image ${currentImageIndex + 1} of ${images.length}`}
        width={800}
        height={400}
        className="object-cover object-center w-full h-auto"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={currentImageIndex === 0}
      />

      {/* Image navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
