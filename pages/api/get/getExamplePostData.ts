import { postStatus } from '../../../lib/helper'
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { categories, tags } = req.query
  
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

  const posts = await prisma.post.findMany({
    where: {
      status: postStatus.published,
      ...filterCatsQuery,
      ...filterTagsQuery,
    },
  })

  return res.status(200).send(posts)

}
