import prisma from '../../../../lib/prisma'
import { postStatus } from '../../../../lib/helper'

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true, status: postStatus.published },
  })
  res.json(post)
}
