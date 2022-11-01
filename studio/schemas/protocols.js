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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [{type: 'timeline'}],
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
      validation: Rule => Rule.required(),
    },
    // {
    //   name: 'tokenUtility',
    //   title: 'Token Utility',
    //   type: 'text',
    // },
    // {
    //   name: 'valueCreation',
    //   title: 'Value Creation',
    //   type: 'text',
    // },
    // {
    //   name: 'valueCapture',
    //   title: 'Value Capture',
    //   type: 'text',
    // },
    // {
    //   name: 'demandDrivers',
    //   title: 'Demand Drivers',
    //   type: 'text',
    // },
    // {
    //   name: 'businessModel',
    //   title: 'Businessmodel',
    //   type: 'text',
    // },
    {
      name: 'tokenStrength',
      title: 'Token Strength',    
      type: 'object',
      fields: [
        {name: 'businessModel', type: 'text', title: 'Businessmodel'},
        {name: 'businessModelStrength', type: 'number', title: 'Businessmodel Strength'},
        {name: 'demandDrivers', type: 'text', title: 'Demand Drivers'},
        {name: 'demandDriversStrength', type: 'number', title: 'Demand Drivers Strength'},
        {name: 'valueCapture', type: 'text', title: 'Value Capture'},
        {name: 'valueCaptureStrength', type: 'number', title: 'Value Capture Strength'},
        {name: 'valueCreation', type: 'text', title: 'Value Creation'},
        {name: 'valueCreationStrength', type: 'number', title: 'Value Creation Strength'},
        {name: 'tokenUtility', type: 'text', title: 'Token Utility'},
        {name: 'tokenUtilityStrength', type: 'number', title: 'Token Utility Strength'},
      ]
    }, 
    {
      name: 'ourTake',
      title: 'Our Take',
      type: 'blockContent',
    },
    {
      name: 'investmentTake',
      title: 'InvestmentTake',    
      type: 'object',
      fields: [
        {name: 'threeMonthHorizon', type: 'text', title: 'Three Month Horizon'},
        {name: 'oneYearHorizon', type: 'text', title: 'One Year Horizon'},
        {name: 'upside', type: 'text', title: 'Upside'},
        {name: 'downside', type: 'text', title: 'Downside'},
        {name: 'horizon', type: 'text', title: 'Decision Horizon'},
        {name: 'metrics', type: 'text', title: 'Metrics'},
      ]
    }, 
    {
      name: 'diagram',
      title: 'Diagram',    
      type: 'url'
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
    {
      name: 'thirdPartyResources',
      title: '3rd Party Resources',
      type: 'array',
      of: [{type: 'resource'}],
    }, 
  ],
}
