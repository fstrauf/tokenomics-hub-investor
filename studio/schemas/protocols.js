import ComputedField from 'sanity-plugin-computed-field'

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
      type: 'text',
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
      of: [{ type: 'timeline' }],
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
    {
      name: 'tokenStrength',
      title: 'Token Strength',
      type: 'object',
      fields: [
        { name: 'tokenUtility', type: 'text', title: 'Token Utility' },
        { name: 'tokenUtilityStrength', type: 'number', title: 'Token Utility Strength' },
        { name: 'businessModel', type: 'text', title: 'Businessmodel' },
        { name: 'businessModelStrength', type: 'number', title: 'Businessmodel Strength' },
        { name: 'valueCreation', type: 'text', title: 'Value Creation' },
        { name: 'valueCreationStrength', type: 'number', title: 'Value Creation Strength' },
        { name: 'valueCapture', type: 'text', title: 'Value Capture' },
        { name: 'valueCaptureStrength', type: 'number', title: 'Value Capture Strength' },
        { name: 'demandDrivers', type: 'text', title: 'Demand Drivers' },
        { name: 'demandDriversStrength', type: 'number', title: 'Demand Drivers Strength' },
        {
          name: 'tokenStrength',
          type: 'number',
          title: 'Token Strength',
          inputComponent: ComputedField,
          options: {
            editable: false,
            buttonText: "Regenerate",
            documentQuerySelection: `            
              "tokenStrength": (tokenStrength.businessModelStrength + 
              tokenStrength.demandDriversStrength +
              tokenStrength.tokenUtilityStrength +
              tokenStrength.valueCaptureStrength +
              tokenStrength.valueCreationStrength)/5          
            `,
            reduceQueryResult: (resultOfQuery) => {
              return resultOfQuery.tokenStrength
            }
          }
        },
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
        { name: 'threeMonthHorizon', type: 'text', title: 'Three Month Horizon' },
        { name: 'oneYearHorizon', type: 'text', title: 'One Year Horizon' },
        { name: 'upside', type: 'text', title: 'Upside' },
        { name: 'downside', type: 'text', title: 'Downside' },
        { name: 'horizon', type: 'text', title: 'Decision Horizon' },
        { name: 'metrics', type: 'text', title: 'Metrics' },
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
      of: [{ type: 'resource' }],
    },
    {
      name: 'thirdPartyResources',
      title: '3rd Party Resources',
      type: 'array',
      of: [{ type: 'resource' }],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
  ],
}
