import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
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
          let userId = event.data.object?.client_reference_id
          const email = event.data.object?.customer_details?.email
          let subWOSignup = false
          
          if(!userId){          
            userId = email
            subWOSignup = true
          }        
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

            productTier = String(              
              checkoutSession.line_items.data[0].price.product
            )
          } catch (error) {
            console.log('🚀 ~ file: stripeHook.ts:53 ~ error:', error)
            // Do nothing
          }

          console.log('🚀 ~ file: stripeHook.ts:54 ~ productTier:', productTier)
          
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
                subWOSignup: subWOSignup,
                customerEmail: email,
              },
              update: {
                stripeCustomerId: customer,
                tier: productTier,
              },
            })
            console.log("🚀 ~ file: stripeHook.ts:80 ~ response:", response)
          } catch (error) {
            // console.error(error)
            return res.status(400).json({ error: `Webhook Error: ${error.message}` })
          }
          return res.status(200).json({ event: event?.type })
        
        default:
          console.log(`Unhandled event type ${event?.type}`)
          return res.status(200).json({ event: event?.type })
      }
    } catch (err) {
      // console.error(`Error verifying Stripe webhook: ${err.message}`)
      return res.status(400).json({ error: `Webhook Error: ${err.message}` })
    }
  } else {
    console.log('only post allowed')
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }
}
