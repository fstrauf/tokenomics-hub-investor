// // import sanityServerClient from '$lib/utils/sanityServerClient'
// // import algoliasearch from 'algoliasearch'
// const algoliasearch = require('algoliasearch');
// // import client, { previewClient } from './sanity'
// import { getPostsForSearch } from '../lib/api.js'

// export const algoliaInstance = algoliasearch(
//   process.env['ALGOLIA_APPLICATION_ID'],
//   process.env['ALGOLIA_ADMIN_KEY'],
// )



// export const get = async (request) => {
//   // Basic security to prevent others from hitting this API
//   // const passphrase = request.query.get('passphrase')
//   // if (passphrase !== process.env['ALGOLIA_SECRET']) {
//   //   return {
//   //     status: 401,
//   //   }
//   // }

//   const documents = await getPostsForSearch(false)

//   const index = algoliaInstance.initIndex(process.env['ALGOLIA_INDEX'])

//   try {
//     console.time(`Saving ${documents.length} documents to index:`)
//     await index.saveObjects(documents)
//     console.timeEnd(`Saving ${documents.length} documents to index:`)
//     return {
//       status: 200,
//       body: 'Success!',
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       status: 500,
//       body: error,
//     }
//   }
// }
