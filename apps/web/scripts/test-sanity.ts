import 'dotenv/config';
import { client, fetchAttractionsForMap } from '@/lib/sanity';

// Test script to verify Sanity connection and data fetching
async function testSanityConnection() {
  try {
    // Test basic connection
    console.log('Testing Sanity connection...');
    const result = await client.fetch('*[_type == "attraction"][0]');
    console.log('Connection successful!');

    // Test map attractions query
    console.log('\nTesting attractions query...');
    const attractions = await fetchAttractionsForMap();
    console.log(`Found ${attractions.length} attractions:`);
    attractions.forEach(a => {
      console.log(`- ${a.name} (${a.category}) in region: ${a.region?.name || 'No region'}`);
    });
  } catch (error) {
    console.error('Error testing Sanity connection:', error);
  }
}

testSanityConnection();
