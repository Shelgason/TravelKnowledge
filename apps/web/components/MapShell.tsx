'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface POI {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  category?: string;
}

interface MapShellProps {
  pois: POI[];
}

export default function MapShell({ pois }: MapShellProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    if (!token) {
      setError('Mapbox token is missing');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-19.020835, 64.963051], // Iceland
        zoom: 6,
      });

      mapInstance.on('load', () => setLoaded(true));

      mapInstance.on('error', (e: Error) => setError(e.message));

      map.current = mapInstance;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to initialize map');
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = undefined;
      }
    };
  }, []);

  // Add markers when map is loaded and POIs change
  useEffect(() => {
    if (!map.current || !loaded) return;

    // Remove existing popups
    const popups = document.getElementsByClassName('mapboxgl-popup');
    while (popups[0]) {
      popups[0].remove();
    }

    // Add markers for each POI
    pois.forEach(poi => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = `w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg
        ${poi.category ? `marker-${poi.category}` : ''}`;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-semibold mb-2">${poi.name}</h3>
          <a
            href="/attractions/${poi.slug}"
            class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Details
          </a>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerEl)
        .setLngLat([poi.lng, poi.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [pois, loaded]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#e5e7eb',
          borderRadius: '0.5rem',
          visibility: loaded ? 'visible' : 'hidden',
        }}
      />
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <div className="text-red-600">{error}</div>
        </div>
      ) : (
        !loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-gray-500">Loading map...</div>
          </div>
        )
      )}
    </div>
  );
}
