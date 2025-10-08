import { defineType, defineField, Rule } from 'sanity';

// Define a reusable coordinates type
const coordsType = {
  name: 'geopoint',
  title: 'Geographic Coordinates',
  type: 'object',
  fields: [
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude',
      validation: (Rule: any) => Rule.min(-90).max(90),
    },
    {
      name: 'lng',
      type: 'number',
      title: 'Longitude',
      validation: (Rule: any) => Rule.min(-180).max(180),
    },
  ],
};

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
      fields: coordsType.fields,
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
          { title: 'Natural Park', value: 'natural-park' },
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
      name: 'practical',
      title: 'Practical Information',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'parking',
          title: 'Parking',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            {
              name: 'sameAsAttraction',
              title: 'Same location as attraction',
              description: 'Check if parking is at the same location as the attraction',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'coords',
              title: 'Parking Coordinates',
              description: 'Only needed if different from attraction location',
              type: 'object',
              hidden: ({ parent }) => parent?.sameAsAttraction,
              fields: coordsType.fields,
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'string',
            },
          ],
        },
        {
          name: 'approach',
          title: 'Approach',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            {
              name: 'walkDistanceM',
              title: 'Walking Distance (meters)',
              type: 'number',
              validation: Rule => Rule.min(0),
            },
            {
              name: 'elevationGainM',
              title: 'Elevation Gain (meters)',
              type: 'number',
              validation: Rule => Rule.min(0),
            },
            {
              name: 'surface',
              title: 'Surface Type',
              type: 'string',
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'text',
            },
          ],
        },
        {
          name: 'safety',
          title: 'Safety Information',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            {
              name: 'windRisk',
              title: 'Wind Risk',
              type: 'string',
              options: {
                list: [
                  { title: 'Low', value: 'low' },
                  { title: 'Moderate', value: 'moderate' },
                  { title: 'High', value: 'high' },
                ],
              },
            },
            {
              name: 'iceRisk',
              title: 'Ice Risk',
              type: 'string',
              options: {
                list: [
                  { title: 'Low', value: 'low' },
                  { title: 'Moderate', value: 'moderate' },
                  { title: 'High', value: 'high' },
                ],
              },
            },
            {
              name: 'otherNotes',
              title: 'Other Safety Notes',
              type: 'text',
            },
          ],
        },
        {
          name: 'facilities',
          title: 'Facilities',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'WC', value: 'WC' },
              { title: 'Cafe', value: 'Cafe' },
              { title: 'Restaurant', value: 'restaurant' },
              { title: 'Visitor center', value: 'Visitor center' },
              { title: 'Paid parking', value: 'Paid parking' },
              { title: 'Changing rooms', value: 'Changing rooms' },
              { title: 'Gift Shop', value: 'gift-shop' },
              { title: 'Wheelchair Access', value: 'wheelchair-access' },
            ],
          },
        },
        {
          name: 'accessibility',
          title: 'Accessibility',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            {
              name: 'wheelchairFriendly',
              title: 'Wheelchair Friendly',
              type: 'boolean',
            },
            {
              name: 'steps',
              title: 'Number of Steps',
              type: 'number',
              validation: Rule => Rule.min(0),
            },
            {
              name: 'railings',
              title: 'Has Railings',
              type: 'boolean',
            },
            {
              name: 'surface',
              title: 'Surface Type',
              type: 'string',
            },
            {
              name: 'notes',
              title: 'Accessibility Notes',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'mapSnippet',
      title: 'Map Snippet Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'zoom',
          title: 'Zoom Level',
          type: 'number',
          initialValue: 12,
          validation: Rule => Rule.min(0),
        },
        {
          name: 'showScale',
          title: 'Show Scale',
          type: 'boolean',
        },
      ],
    },
    {
      name: 'photoTips',
      title: 'Photography Tips',
      type: 'text',
      description:
        'Short, practical tips (time of day, spray conditions, rainbow opportunities, etc.)',
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    },
    // Legacy facilities field removed
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
