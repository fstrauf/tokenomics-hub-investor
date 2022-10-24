// import sanityServerClient from '$lib/utils/sanityServerClient'
// import algoliasearch from 'algoliasearch'
const algoliasearch = require('algoliasearch');
// import client, { previewClient } from './sanity'
import { getPostsForSearch } from '../lib/api.js'

export const algoliaInstance = algoliasearch(
  process.env['ALGOLIA_APPLICATION_ID'],
  process.env['ALGOLIA_ADMIN_KEY'],
)


export default async function handler(req, res) {
  const documents = await getPostsForSearch(false)
  const index = algoliaInstance.initIndex(process.env['ALGOLIA_INDEX'])

  try {
    console.log(documents)
    console.time(`Saving ${documents.length} documents to index:`)
    await index.saveObjects(documents)
    console.timeEnd(`Saving ${documents.length} documents to index:`)
    return {
      statusCode: 200,
      body: 'Success!',
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: error,
    }
  }
}
