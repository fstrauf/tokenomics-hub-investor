import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import prisma from '../../lib/prisma'

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
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
      
      switch (event?.type) {
        case 'checkout.session.completed':
          const userId = event.data.object?.client_reference_id
          // console.log("🚀 ~ file: stripeHook.ts:38 ~ event.data.object:", event.data.object)
          console.log('🚀 ~ file: stripeHook.ts:38 ~ userId:', userId)
          const checkoutSessionId = event.data.object?.id
          const customer = event.data.object?.customer
          console.log('🚀 ~ file: stripeHook.ts:41 ~ customer:', customer)
          let productTier = ''
          try {
            const checkoutSession = await stripe.checkout.sessions.retrieve(
              checkoutSessionId,
              {
                expand: ['line_items'],
              }
            )

            console.log(
              '🚀 ~ file: stripeHook.ts:50 ~ checkoutSession:',
              checkoutSession
            )
            productTier = String(
              checkoutSession.line_items.data[0].price.product
            )
          } catch (error) {
            console.log('🚀 ~ file: stripeHook.ts:53 ~ error:', error)
            //do nothing
          }

          console.log('🚀 ~ file: stripeHook.ts:54 ~ productTier:', productTier)
          res.status(200)
          try {
            console.log('prisma before')
            const response = await prisma.subscriptions.upsert({
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
            console.log('🚀 ~ file: stripeHook.ts:70 ~ response:', response)
          } catch (error) {
            console.error(error)
            console.log('prisma before')
            res.status(400).json({ error: `Webhook Error: ${err.message}` })
          }
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
    console.log('only post allowed')
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
