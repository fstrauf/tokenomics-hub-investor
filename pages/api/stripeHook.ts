import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import prisma from '../../lib/prisma'
// import { clerkClient } from '@clerk/nextjs/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
    const sig = req.headers['stripe-signature']
    const buf = await buffer(req)
    let event
    try {
      event = await stripe.webhooks.constructEvent(
        buf.toString(), //try .toString()
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
      switch (event?.type) {
        
        case 'checkout.session.completed':
          const userId = event.data.object?.client_reference_id
          console.log("🚀 ~ file: stripeHook.ts:38 ~ userId:", userId)
          const checkoutSessionId = event.data.object?.id
          const customer = event.data.object?.customer // || event.data.object?.customer_details?.email
          console.log("🚀 ~ file: stripeHook.ts:40 ~ customer:", customer)
          
          // const subscriptionId = event.data.object?.subscription

          // const subscription = await stripe.subscriptions.retrieve(
          //   subscriptionId
          // );
          // const subscriptions = await stripe.subscriptions.list({
          //   status: 'active', limit: 100,
          // })
          // const customer = await stripe.customers.retrieve(
          //   subscriptions.data[0].customer
          // );
          const checkoutSession = await stripe.checkout.sessions.retrieve(
            checkoutSessionId,
            {
              expand: ['line_items'],
            }
          )
          console.log("🚀 ~ file: stripeHook.ts:59 ~ checkoutSession:", checkoutSession)
          const productTier = String(
            checkoutSession.line_items.data[0].price.product
          )
          console.log("🚀 ~ file: stripeHook.ts:63 ~ productTier:", productTier)
          try {
            if (userId & customer) {
              await prisma.subscriptions.upsert({
                where: {
                  authorClerkId: userId,
                },
                create: {
                  authorClerkId: userId,
                  stripeCustomerId: customer,
                  tier: productTier,
                },
                update: {
                  stripeCustomerId: customer,
                  tier: productTier,
                },
              })
            }
          } catch (error) {
            console.error(error)
            res.status(400).json({ error: `Webhook Error: ${err.message}` })
          }
          // const user = await clerkClient.users.getUser(userId)
          // let publicMetadata = user.publicMetadata
          // publicMetadata.tier = productTier

          // await clerkClient.users.updateUser(userId, {
          //   publicMetadata: publicMetadata,
          // })

          res.status(200)
          //update the user publicmetadata with the new subscription data.
          break
        case 'customer.subscription.updated':
          //we should change the current subscription
          res.status(200)
          break
        case 'customer.subscription.deleted':
          //eset the user back to free.
          res.status(200)
          break
        case 'customer.subscription.paused':
          //reset to free tier
          res.status(200)
          break
        case 'customer.subscription.resumed':
          //update the tier
          res.status(200)
          break
        case 'invoice.paid':
          //update the tier
          res.status(200)
          break

        default:
          console.log(`Unhandled event type ${event?.type}`)
          res.status(200)
      }
        
      res.status(200)
    } catch (err) {
      console.error(`Error verifying Stripe webhook: ${err.message}`)
      res.status(400).json({ error: `Webhook Error: ${err.message}` })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
