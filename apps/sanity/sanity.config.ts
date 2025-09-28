import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import attraction from './schemas/attraction'

export default defineConfig({
  name: 'default',
  title: 'TravelKnowledge',

  projectId: 'oa7cdunj',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [attraction],
  },
})