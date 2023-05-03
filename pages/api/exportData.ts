// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dbs = []
    dbs.push(prisma.post.findMany())
    dbs.push(prisma.category.findMany())
    dbs.push(prisma.tag.findMany())
    dbs.push(prisma.protocolTimeLine.findMany())
    dbs.push(prisma.protocolResources.findMany())
    dbs.push(prisma.comments.findMany())
    dbs.push(prisma.calculation.findMany())
    dbs.push(prisma.designElement.findMany())
    dbs.push(prisma.designPhases.findMany())
    dbs.push(prisma.calculationTimeSeries.findMany())
    dbs.push(prisma.mechanism.findMany())
    dbs.push(prisma.postUser.findMany())
    dbs.push(prisma.postAuthor.findMany())

    const [
      post,
      category,
      tag,
      protocolTimeLine,
      protocolResources,
      comments,
      calculation,
      designElement,
      designPhases,
      calculationTimeSeries,
      mechanism,
      postUser,
      postAuthor,
    ] = await prisma.$transaction(dbs)

    fs.writeFileSync(`exportedData/post.json`, JSON.stringify(post, null, 2))
    fs.writeFileSync(
      `exportedData/category.json`,
      JSON.stringify(category, null, 2)
    )
    fs.writeFileSync(`exportedData/tag.json`, JSON.stringify(tag, null, 2))
    fs.writeFileSync(
      `exportedData/protocolTimeLine.json`,
      JSON.stringify(protocolTimeLine, null, 2)
    )
    fs.writeFileSync(
      `exportedData/protocolResources.json`,
      JSON.stringify(protocolResources, null, 2)
    )
    fs.writeFileSync(
      `exportedData/comments.json`,
      JSON.stringify(comments, null, 2)
    )

    fs.writeFileSync(
      `exportedData/calculation.json`,
      JSON.stringify(calculation, null, 2)
    )

    fs.writeFileSync(
      `exportedData/designElement.json`,
      JSON.stringify(designElement, null, 2)
    )
    fs.writeFileSync(
      `exportedData/designPhases.json`,
      JSON.stringify(designPhases, null, 2)
    )
    fs.writeFileSync(
      `exportedData/calculationTimeSeries.json`,
      JSON.stringify(calculationTimeSeries, null, 2)
    )
    fs.writeFileSync(
      `exportedData/mechanism.json`,
      JSON.stringify(mechanism, null, 2)
    )
    fs.writeFileSync(
      `exportedData/postUser.json`,
      JSON.stringify(postUser, null, 2)
    )
    fs.writeFileSync(
      `exportedData/postAuthor.json`,
      JSON.stringify(postAuthor, null, 2)
    )

    return res.status(200).json({
      message: 'Data Exported Successfully',
    })
  } catch (error) {
    return res.status(400).json({
      message: 'error occured',
    })
  }
}
