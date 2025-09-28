'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export function MapShell() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-19.020835, 64.963051], // Iceland
      zoom: 6
    })

    const markers = [
      {
        lngLat: [-21.131592, 64.255440],
        title: 'Blue Lagoon'
      },
      {
        lngLat: [-23.509254, 64.747913],
        title: 'Kirkjufell Mountain'
      }
    ]

    markers.forEach(({ lngLat, title }) => {
      new mapboxgl.Marker()
        .setLngLat(lngLat)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3>`))
        .addTo(map.current!)
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
  )
}