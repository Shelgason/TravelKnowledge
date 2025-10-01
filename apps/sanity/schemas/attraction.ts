import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  description: 'Places of interest that can be shown on the map',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'coords',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'region',
      title: 'Region',
      type: 'reference',
      to: [{ type: 'region' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Waterfall', value: 'waterfall' },
          { title: 'Geothermal', value: 'geothermal' },
          { title: 'Glacier', value: 'glacier' },
          { title: 'Beach', value: 'beach' },
          { title: 'Canyon', value: 'canyon' },
          { title: 'Pool', value: 'pool' },
          { title: 'Spa', value: 'spa' },
          { title: 'Museum', value: 'museum' },
          { title: 'Hike', value: 'hike' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'visitDurationMin',
      title: 'Minimum Visit Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.min(0),
    },
    {
      name: 'visitDurationMax',
      title: 'Maximum Visit Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.min(Rule.valueOfField('visitDurationMin') || 0),
    },
    {
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Parking', value: 'parking' },
          { title: 'Restrooms', value: 'restrooms' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Gift Shop', value: 'gift-shop' },
          { title: 'Visitor Center', value: 'visitor-center' },
          { title: 'Wheelchair Access', value: 'wheelchair-access' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
});
