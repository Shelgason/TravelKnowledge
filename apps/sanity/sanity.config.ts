import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import attraction from './schemas/attraction';
import region from './schemas/region';
import guide from './schemas/guide';

export default defineConfig({
  name: 'default',
  title: 'TravelKnowledge Studio',

  projectId: 'oa7cdunj',
  dataset: 'production',

  server: {
    port: 3333,
  },

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [attraction, region, guide],
  },
});
