// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../lib/prisma'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title } = req.body
  const { JWT } = require('google-auth-library')
  const { GoogleSpreadsheet } = require('google-spreadsheet')
  const sheetBaseUrl = `https://sheets.googleapis.com/v4/spreadsheets`

  const GOOGLE_AUTH_SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ]

  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: GOOGLE_AUTH_SCOPES,
    // subject: impersonateAs,
  })

  await jwt.authorize()

  console.log('🚀 ~ file: createGSheet.ts:36 ~ jwt:', jwt)

  const sheetRes = await fetch(sheetBaseUrl, {
    method: 'POST',
    body: JSON.stringify({
      properties: { title: title },
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt.credentials.access_token}`,
    },
  })
  const sheetData = await sheetRes.json()
  console.log('🚀 ~ file: createGSheet.ts:36 ~ sheetData:', sheetData)

  await fetch(
    `https://www.googleapis.com/drive/v3/files/${sheetData.spreadsheetId}/permissions`,
    {
      method: 'POST',
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.credentials.access_token}`,
      },
    }
  )

//   const shareData = await shareReq.json()

  res.status(200).json(sheetData?.spreadsheetUrl)
}
