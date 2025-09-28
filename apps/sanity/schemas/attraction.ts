import { defineType } from 'sanity'

export default defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  // Added comment to test Git tracking
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'coords',
      title: 'Coordinates',
      type: 'geopoint',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }
  ]
})