// This script will fetch and display all guides and regions from Sanity
// to help with testing the new pages

import { fetchAllGuides, fetchAllRegions, fetchAttractionsForMap } from '@/lib/sanity';

async function testSanityData() {
  try {
    console.log('Fetching all guides...');
    const guides = await fetchAllGuides();
    console.log(`Found ${guides.length} guides:`);
    guides.forEach(guide => {
      console.log(`- Guide: "${guide.title}" - URL: /guides/${guide.slug}`);
      if (guide.region) {
        console.log(`  Associated with region: ${guide.region.name} (${guide.region.slug})`);
      }
    });

    console.log('\nFetching all regions...');
    const regions = await fetchAllRegions();
    console.log(`Found ${regions.length} regions:`);
    regions.forEach(region => {
      console.log(`- Region: "${region.name}" - URL: /regions/${region.slug}`);
    });

    console.log('\nFetching all attractions...');
    const attractions = await fetchAttractionsForMap();
    console.log(`Found ${attractions.length} attractions:`);
    
    // Group attractions by region for easier testing
    const attractionsByRegion = {};
    attractions.forEach(attraction => {
      if (attraction.region) {
        const regionSlug = attraction.region.slug.current || attraction.region.slug;
        if (!attractionsByRegion[regionSlug]) {
          attractionsByRegion[regionSlug] = [];
        }
        attractionsByRegion[regionSlug].push(attraction);
      }
    });

    console.log('\nAttractions grouped by region:');
    for (const [regionSlug, regionAttractions] of Object.entries(attractionsByRegion)) {
      const regionName = regionAttractions[0]?.region?.name || 'Unknown Region';
      console.log(`\nRegion: ${regionName} (${regionSlug})`);
      regionAttractions.forEach(attraction => {
        console.log(`- Attraction: "${attraction.name}" - URL: /attractions/${attraction.slug.current}`);
      });
    }

    console.log('\nTest URL Summary:');
    console.log('================');
    console.log('Guide Pages:');
    console.log('- Main Guides Page: /guides');
    guides.forEach(guide => {
      console.log(`- Guide Detail: /guides/${guide.slug}`);
    });
    
    console.log('\nRegion Pages:');
    console.log('- Main Regions Page: /regions');
    regions.forEach(region => {
      console.log(`- Region Detail: /regions/${region.slug}`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Execute the test
testSanityData();