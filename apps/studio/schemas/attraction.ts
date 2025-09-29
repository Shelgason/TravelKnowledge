export default {
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coords',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Waterfall', value: 'waterfall' },
          { title: 'Hot Spring', value: 'hotspring' },
          { title: 'Glacier', value: 'glacier' },
          { title: 'Beach', value: 'beach' },
          { title: 'Mountain', value: 'mountain' },
          { title: 'Cave', value: 'cave' },
          { title: 'Museum', value: 'museum' },
          { title: 'Spa', value: 'spa' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'visitDurationMin',
      title: 'Minimum Visit Duration (hours)',
      type: 'number',
    },
    {
      name: 'visitDurationMax',
      title: 'Maximum Visit Duration (hours)',
      type: 'number',
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
          { title: 'Gift Shop', value: 'giftshop' },
          { title: 'Visitor Center', value: 'visitorcenter' },
          { title: 'Wheelchair Accessible', value: 'wheelchair' },
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
      validation: (Rule: any) => Rule.required(),
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
    {
      name: 'region',
      title: 'Region',
      type: 'reference',
      to: [{ type: 'region' }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
};
