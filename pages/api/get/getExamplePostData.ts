import { postStatus } from '../../../lib/helper'
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { categories, tags } = req.query
  // console.log('🚀 ~ file: getExamplePostData.ts:6 ~ handle ~ tags:', tags)
  // console.log(
  //   '🚀 ~ file: getExamplePostData.ts:6 ~ handle ~ categories:',
  //   categories
  // )

  var filterCats = []
  var filterTags = []
  if (tags === undefined) {
  } else {
    filterTags = JSON.parse(tags)
  }

  if (categories === undefined) {
  } else {
    filterCats = JSON.parse(categories)
  }

  const filterCatsQuery =
    filterCats.length > 0
      ? {
          categories: {
            some: {
              value: { in: filterCats },
            },
          },
        }
      : {}
  // console.log(
  //   '🚀 ~ file: getExamplePostData.ts:22 ~ handle ~ filterCatsQuery:',
  //   filterCatsQuery
  // )

  const filterTagsQuery =
    filterTags.length > 0
      ? {
          tags: {
            some: {
              value: { in: filterTags },
            },
          },
        }
      : {}

  // console.log(
  //   '🚀 ~ file: getExamplePostData.ts:34 ~ handle ~ filterTagsQuery:',
  //   filterTagsQuery
  // )

  const posts = await prisma.post.findMany({
    where: {
      status: postStatus.published,
      ...filterCatsQuery,
      ...filterTagsQuery,
    },
  })
  // console.log('🚀 ~ file: getExamplePostData.ts:50 ~ handle ~ posts:', posts)

  return res.status(200).send(posts)
}
