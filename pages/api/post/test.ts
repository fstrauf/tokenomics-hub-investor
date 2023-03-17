import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body
  // console.log("🚀 ~ file: updateAdminFields.ts:6 ~ handle ~ values", values)

  const response = await prisma.mechanism.create({
    data: {
      name: 'tes',
      summary: 'test',
    },
  })

  res.json(response)
}
