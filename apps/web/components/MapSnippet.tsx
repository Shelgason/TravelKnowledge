'use client';

import { useEffect, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { mapboxConfig } from '@/lib/config';
import { ATTRACTION_MAP_ZOOM } from '@/lib/map-config';

// Define MapboxMap type for TypeScript
type MapboxMap = mapboxgl.Map;

interface MapSnippetProps {
  lat: number;
  lng: number;
  zoom?: number;
  showScale?: boolean;
  slug?: string;
}

export default function MapSnippet({
  lat,
  lng,
  zoom = ATTRACTION_MAP_ZOOM,
  showScale = false,
  slug,
}: MapSnippetProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Cleanup previous instance
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      setLoaded(false);
    }

    const token = mapboxConfig.token;
    if (!token) {
      setError('Mapbox token is missing');
      return;
    }

    // Properly type assertion for mapboxgl
    (mapboxgl as unknown as { accessToken: string }).accessToken = token;

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        interactive: false, // Disable all interactions
        attributionControl: true, // Keep attribution control
      });

      map.on('load', () => {
        setLoaded(true);

        // Add a single marker at the attraction location
        const markerEl = document.createElement('div');
        markerEl.style.width = '20px';
        markerEl.style.height = '20px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '2px solid white';
        markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        markerEl.className = 'marker-default'; // Use default marker style

        new mapboxgl.Marker({ element: markerEl }).setLngLat([lng, lat]).addTo(map);

        // Add scale control if requested
        if (showScale) {
          map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
        }
      });

      map.on('error', (e: Error) => setError(e.message));
      mapRef.current = map;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to initialize map');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setLoaded(false);
      }
    };
  }, [lat, lng, zoom, showScale]);

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-lg overflow-hidden">
      <div
        ref={mapContainer}
        className="absolute inset-0 bg-gray-200"
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      />

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-red-600">{error}</div>
        </div>
      ) : (
        !loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-500">Loading map...</div>
          </div>
        )
      )}

      {/* Open full map button (only if slug is provided) */}
      {slug && (
        <div className="absolute bottom-4 right-4">
          <Link
            href={`/map?focus=${slug}`}
            className="bg-white shadow-md px-3 py-2 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Open full map
          </Link>
        </div>
      )}
    </div>
  );
}
