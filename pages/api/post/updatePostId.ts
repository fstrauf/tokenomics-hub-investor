import prisma from '../../../lib/prisma'
import { postStatus } from '../../../lib/helper'
import { stringToKey } from '../../../lib/helper'

// PUT /api/publish/:id
export default async function handle(req, res) {
  const { post } = req.body
  // const postId = req.query.id
  const txCalls = []

  var newId = stringToKey(post?.title)

  txCalls.push(
    prisma.post.update({
      where: { id: post?.id },
      data: { status: postStatus.published, id: newId },
    })
  )

  txCalls.push(
    prisma.categoryToPost.updateMany({
      where: { B: post?.id },
      data: { B: newId },
    })
  )

  txCalls.push(
    prisma.postToTag.updateMany({
      where: { A: post?.id },
      data: { A: newId },
    })
  )

  txCalls.push(
    prisma.protocolTimeLine.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.protocolResources.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.comments.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.userStrengthRating.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.designElement.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.mechanism.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.postUser.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.postAuthor.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  txCalls.push(
    prisma.calculation.updateMany({
      where: { postId: post?.id },
      data: { postId: newId },
    })
  )

  try {
    const response = await prisma.$transaction(txCalls)
    res.json(response)
  } catch (error) {
    res.status(400).json({ error: `Update Error: ${error.message}` })
  }

  // prisma.post.update({
  //   where: { id: post?.id },
  //   data: { status: postStatus.published },
  // })
}
