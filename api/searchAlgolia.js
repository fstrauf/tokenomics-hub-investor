import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import indexer, { flattenBlocks } from 'sanity-algolia';
import { getPostsForSearch } from '../lib/api'

const algolia = algoliasearch(  
    process.env['ALGOLIA_APPLICATION_ID'],
    process.env['ALGOLIA_ADMIN_KEY'],
);
// const sanity = sanityClient(...);
// const documents = await getPostsForSearch(false)

const sanity = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    // If your dataset is private you need to add a read token.
    // You can mint one at https://manage.sanity.io,
    token: 'skllQ8pgErJSTTBpdqCX2OqmJRbAtuWuJdC3PgpYLCpHrgqmNlgArVHJoGYifxWBzSLHPOCDrEyHovET4BFdFEi0Q7jngXnIpwWFpSkUMXXSr80C739spWPtgzm2LBD7TEgYAViNlcLllz3Fp04DYTR4ZfXwHVcVlIGfCvlt23nQ9tn2DlKQ',
    apiVersion: '2021-03-25',
    useCdn: false,
  })

export default function handler(req, res) {
  const sanityAlgolia = indexer(
    {
      protocols: {
        index: algolia.initIndex(process.env['ALGOLIA_INDEX']),
        projection: `{
            title,
            "path": slug.current,
            "body": pt::text(body)
          }`,
      },
    },
    document => {
      switch (document._type) {
        case 'protocols':
          return {
            title: document.title,
            path: document.slug.current,
            publishedAt: document.publishedAt,
            // excerpt: flattenBlocks(document.excerpt),
          };
        default:
          throw new Error(`Unknown type: ${document.type}`);
      }
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send('ok'));
}