import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("🚀 ~ file: stripeSync.ts:16 ~ req:", req)
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req);
  let event
  try {
    event = await stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    switch (event?.type) {
      case 'checkout.session.completed':
        const paymentIntentSucceeded = event.data.object
        console.log(
          '🚀 ~ file: stripeSync.ts:35 ~ paymentIntentSucceeded:',
          paymentIntentSucceeded
        )
        // Then define and call a function to handle the event payment_intent.succeeded
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event?.type}`)
    }
    res.status(200).json({ received: true })
  } catch (err) {
    console.error(`Error verifying Stripe webhook: ${err.message}`)
    res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }
}
