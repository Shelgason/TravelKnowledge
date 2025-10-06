/**
 * Central configuration module for the application
 *
 * This module provides a single source of truth for all configuration values
 * and ensures proper validation of required environment variables.
 */

// Sanity configuration
export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID || 'oa7cdunj', // Fallback for development
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// URL configuration
export const urlConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
};

// Mapbox configuration
export const mapboxConfig = {
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
};

// Function to validate that required configs are present
export function validateConfig() {
  // Validate Sanity config
  if (!sanityConfig.projectId) {
    console.error('Missing SANITY_PROJECT_ID environment variable');
    return false;
  }

  if (!sanityConfig.dataset) {
    console.error('Missing SANITY_DATASET environment variable');
    return false;
  }

  if (!sanityConfig.apiVersion) {
    console.error('Missing SANITY_API_VERSION environment variable');
    return false;
  }

  // Validate Mapbox config
  if (!mapboxConfig.token) {
    console.error('Missing NEXT_PUBLIC_MAPBOX_TOKEN environment variable');
    return false;
  }

  return true;
}

// For development, warn about missing configs
if (process.env.NODE_ENV !== 'production') {
  const isValid = validateConfig();
  if (!isValid) {
    console.warn('⚠️ Some environment variables are missing. Check your .env.local file.');
  }
}
