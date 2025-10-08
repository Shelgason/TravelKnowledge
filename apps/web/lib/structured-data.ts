import { FullAttraction } from './sanity';

/**
 * Generate JSON-LD structured data for a tourist attraction
 * Helps search engines understand the content better
 */
export function generateAttractionJsonLd(attraction: FullAttraction) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: attraction.coords.lat,
      longitude: attraction.coords.lng,
    },
    ...(attraction.mainImage && {
      image: attraction.mainImage,
    }),
    ...(attraction.region && {
      containedInPlace: {
        '@type': 'Place',
        name: attraction.region.name,
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for a travel guide
 */
export function generateGuideJsonLd(guide: {
  title: string;
  slug: string;
  region?: { name: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    ...(guide.region && {
      about: {
        '@type': 'Place',
        name: guide.region.name,
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for website/organization
 */
export function generateOrganizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TravelKnowledge',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Add social media links here when available
    ],
  };
}
