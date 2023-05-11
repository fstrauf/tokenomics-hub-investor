import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { subscription } = req.body
  console.log("🚀 ~ file: updateSubscriptionData.ts:5 ~ handle ~ subscription:", subscription)

  const subscriptions = await prisma.subscriptions.upsert({
    where: {
      authorClerkId: subscription.authorClerkId,
    },
    create: {
      authorClerkId: subscription.authorClerkId,
      stripeCustomerId: '',
      tier: 'inactive',
      exampleSectionCounter: subscription.exampleSectionCounter,
      exampleViewStart: subscription.exampleViewStart
    },
    update: {
      // stripeCustomerId: subscription.,
      // tier: productTier,
      exampleSectionCounter: subscription.exampleSectionCounter,
      exampleViewStart: subscription.exampleViewStart
    },
  })

  return res.status(200).send(subscriptions)
}
