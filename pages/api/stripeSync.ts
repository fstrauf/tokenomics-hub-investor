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
  console.log("🚀 ~ file: stripeSync.ts:22 ~ subscriptions:", subscriptions)

  const usersAndTiers = subscriptions.data.map((s) => ({
    stripeCustomerId: s.customer,
    tier: s.items.data[0].price.product,
  }))
  console.log("🚀 ~ file: stripeSync.ts:28 ~ usersAndTiers ~ usersAndTiers:", usersAndTiers)

  const stripeCustomers = usersAndTiers.map(
    ({ stripeCustomerId }) => stripeCustomerId
  )
  console.log("🚀 ~ file: stripeSync.ts:33 ~ stripeCustomers:", stripeCustomers)

  const txCalls = []
  const updateSubs = usersAndTiers.map((subscription) => {
    
    return prisma.subscriptions
      .update({
        where: { stripeCustomerId: String(subscription.stripeCustomerId) },
        data: { tier: String(subscription.tier) },
      })
      .catch((error) => {
        if (error.code !== 'P2025') {
          throw error
        }
      })
  })

  txCalls.push(updateSubs)

  const subUpdate = await prisma.subscriptions.updateMany({
    where: {
      stripeCustomerId: { notIn: stripeCustomers },
    },
    data: { tier: 'inactive' },
  })
  console.log("🚀 ~ file: stripeSync.ts:58 ~ subUpdate:", subUpdate)

  await prisma
    .$transaction(txCalls)
    .then(() => {
      res.status(200).end('users updated')
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}
