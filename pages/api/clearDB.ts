// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../lib/prisma'

// type Data = {
//   name: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { rewardRound } = req.body

//   const dbs = []
//   // dbs.push(prisma.content.deleteMany())
//   // dbs.push(prisma.contentAuthor.deleteMany())
//   // dbs.push(prisma.vote.deleteMany())
//   // dbs.push(prisma.payout.deleteMany())
//   // dbs.push(prisma.rewardRound.deleteMany())

//   dbs.push(prisma.post.deleteMany({}))

//   const result = await prisma.$transaction(dbs)

//   res.status(200).json(result)
// }
