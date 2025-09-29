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

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    if (!token) {
      setError('Mapbox token is missing');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-19.0, 64.5],
        zoom: 5.2,
        minZoom: 5.2,
        maxBounds: [
          [-25.0, 63.2],
          [-12.0, 66.8],
        ],
        dragRotate: false,
        pitchWithRotate: false,
      });

      map.on('load', () => {
        setLoaded(true);

        // Add markers
        pois.forEach(poi => {
          const markerEl = document.createElement('div');
          markerEl.className = `w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg
            ${poi.category ? `marker-${poi.category}` : ''}`;

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

          new mapboxgl.Marker(markerEl).setLngLat([poi.lng, poi.lat]).setPopup(popup).addTo(map);
        });
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
  }, [pois]);

  return (
    <div style={{ width: '85%', height: '100%', position: 'relative', margin: '0 auto' }}>
      <div
        ref={mapContainer}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#e5e7eb',
          visibility: loaded ? 'visible' : 'hidden',
        }}
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
    </div>
  );
}
