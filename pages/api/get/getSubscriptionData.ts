import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { userId } = req.body
  console.log("🚀 ~ file: getSubscriptionData.ts:5 ~ handle ~ req.query:", req.query)
  console.log("🚀 ~ file: getSubscriptionData.ts:5 ~ handle ~ userId:", userId)

  const subscriptions = await prisma.subscriptions.findUnique({
    where: { authorClerkId: userId },
  })

  return res.status(200).send(subscriptions)
}
