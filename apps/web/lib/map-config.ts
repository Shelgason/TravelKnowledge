/**
 * Configuration constants for map-related features
 */

/**
 * Default map configuration for Iceland
 * These coordinates center the map on Iceland with appropriate bounds
 */
export const ICELAND_MAP_CONFIG = {
  // Default center point (approximately center of Iceland)
  defaultCenter: [-19.0, 64.5] as [number, number],

  // Default zoom level for country view
  defaultZoom: 5.2,

  // Minimum zoom level (prevent zooming out too far)
  minZoom: 5.2,

  // Maximum bounds to keep map focused on Iceland
  // Format: [[west, south], [east, north]]
  bounds: [
    [-25.0, 63.2], // Southwest corner
    [-12.0, 66.8], // Northeast corner
  ] as [[number, number], [number, number]],
} as const;

/**
 * Default zoom level for individual attraction map snippets
 */
export const ATTRACTION_MAP_ZOOM = 12;

/**
 * Cache revalidation time in seconds (1 hour)
 */
export const CACHE_REVALIDATE_TIME = 3600;
