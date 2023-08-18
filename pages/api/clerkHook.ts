import type { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from 'svix'
import { buffer } from 'micro'
import prisma from '../../lib/prisma'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { getPrimaryEmail } from '../../lib/helper'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = (await buffer(req)).toString()
  const headers = req.headers
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)
  let msg

  try {
    msg = wh.verify(payload, headers)
    console.log('🚀 ~ file: clerkHook.ts:26 ~ msg:', msg)
  } catch (err) {
    res.status(400).json({})
  }

  const evt = msg as WebhookEvent
  switch (evt.type) {
    case 'user.created': // this is typed
      const primaryEmail = getPrimaryEmail(
        evt.data?.email_addresses,
        evt.data?.primary_email_address_id
      )
      console.log('🚀 ~ file: clerkHook.ts:22 ~ primaryEmail:', primaryEmail)
      try {
        const response = await prisma.subscriptions.update({
          where: {
            authorClerkId: primaryEmail,
          },
          data: {
            authorClerkId: evt.data?.id,
            subWOSignup: false,
          },
        })
        console.log('🚀 ~ file: clerkHook.ts:49 ~ response:', response)
      } catch (error) {
        return res
          .status(400)
          .json({ error: `Webhook Error: ${error.message}` })
      }
      return res.status(200).json({ event: evt?.type })
    default:
      console.log(`Unhandled event type ${evt?.type}`)
      return res.status(200).json({ event: evt?.type })
  }
}
