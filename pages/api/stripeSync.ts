import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import prisma from '../../lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  })
  const subscriptions = await stripe.subscriptions.list({
    status: 'active',
    limit: 100,
  })

  const usersAndTiers = subscriptions.data.map((s) => ({
    stripeCustomerId: s.customer,
    tier: s.items.data[0].price.product,
  }))

  const currentSubs = await prisma.subscriptions.findMany()  

  const updatedSubs = currentSubs.map((cs) => {  
    return {
      ...cs,
      tier: usersAndTiers.find(uat => uat.stripeCustomerId === cs.stripeCustomerId)?.tier || 'inactive'
    }
  });

  const txCalls = updatedSubs.map((subscription) => {

    return prisma.subscriptions
      .update({
        where: { stripeCustomerId: String(subscription.stripeCustomerId) },
        data: { tier: String(subscription.tier) },
      })
  })

  const txRes = await prisma.$transaction(txCalls).catch((error) => {
    console.log('🚀 ~ file: stripeSync.ts:62 ~ error:', error)
    // res.status(400).send(error)
  })

  console.log('🚀 ~ file: stripeSync.ts:60 ~ txRes:', txRes)

  res.status(200).json('users updated')
}
