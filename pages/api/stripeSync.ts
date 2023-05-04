import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
// import { buffer } from 'micro'
import prisma from '../../lib/prisma'
// import { clerkClient } from '@clerk/nextjs/server'

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

  const stripeCustomers = usersAndTiers.map(
    ({ stripeCustomerId }) => stripeCustomerId
  )

  const txCalls = []
  const updateSubs = usersAndTiers.map((subscription) => {
    console.log(
      '🚀 ~ file: stripeSync.ts:41 ~ updateSubs ~ subscription:',
      subscription
    )
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

  await prisma.subscriptions.updateMany({
    where: {
      stripeCustomerId: { notIn: stripeCustomers },
    },
    data: { tier: 'inactive' },
  })

  await prisma
    .$transaction(txCalls)
    .then(() => {
      res.status(200)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}
