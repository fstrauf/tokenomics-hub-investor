import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body
  // var details = values.details
  
  // if (typeof values.details === 'object') {
  //   details = JSON.stringify(values.details)
  // }

  const response = await prisma.subscriptions.upsert({
    where: { 
      authorClerkId: values.authorClerkId
    },
    update: {
      authorClerkId: values.authorClerkId,
      stripeCustomerId: values.stripeCustomerId,
      tier: values.tier,
    },
    create: {
      authorClerkId: values.authorClerkId,
      stripeCustomerId: values.stripeCustomerId,
      tier: values.tier,    },
  })
  res.json(response)
}
