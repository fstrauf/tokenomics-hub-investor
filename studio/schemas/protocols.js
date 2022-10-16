export default {
  name: 'protocols',
  title: 'Protocols',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tokenUtility',
      title: 'Token Utility',
      type: 'text',
    },
    
    {
      name: 'valueCreation',
      title: 'Value Creation',
      type: 'text',
    },
    {
      name: 'valueCapture',
      title: 'Value Capture',
      type: 'text',
    },
    {
      name: 'demandDrivers',
      title: 'Demand Drivers',
      type: 'text',
    },
    {
      name: 'ourTake',
      title: 'Our Take',
      type: 'blockContent',
    },  
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },   
    {
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{type: 'resource'}],
    }, 
  ],
}
