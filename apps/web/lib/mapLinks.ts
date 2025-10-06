/**
 * Helper functions for generating map-related links and data
 */

/**
 * Generate a Google Maps link to a specific place
 *
 * @param lat - Latitude of the location
 * @param lng - Longitude of the location
 * @param label - Optional label for the marker
 * @returns Google Maps URL to the location
 */
export function googleMapsPlaceLink(lat: number, lng: number, label?: string): string {
  const baseUrl = 'https://www.google.com/maps/place/';
  const coordinates = `${lat},${lng}`;
  const encodedLabel = label ? `/${encodeURIComponent(label)}` : '';

  return `${baseUrl}${coordinates}${encodedLabel}`;
}

/**
 * Generate a Google Maps directions link to a specific destination
 *
 * @param lat - Latitude of the destination
 * @param lng - Longitude of the destination
 * @returns Google Maps directions URL to the location
 */
export function googleMapsDirectionsLink(lat: number, lng: number): string {
  const baseUrl = 'https://www.google.com/maps/dir//';
  const coordinates = `${lat},${lng}`;

  return `${baseUrl}${coordinates}`;
}

/**
 * Generate a minimal GPX waypoint XML string
 *
 * @param params - Object containing name, lat and lng properties
 * @returns GPX XML string representing a waypoint
 */
export function toGPXWaypoint({
  name,
  lat,
  lng,
}: {
  name: string;
  lat: number;
  lng: number;
}): string {
  return `<wpt lat="${lat}" lon="${lng}">
  <name>${escapeXml(name)}</name>
</wpt>`;
}

/**
 * Helper function to escape special XML characters
 *
 * @param unsafe - Raw string that may contain XML special characters
 * @returns String with XML special characters escaped
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
