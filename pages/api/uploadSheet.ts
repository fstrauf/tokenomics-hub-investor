import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import prisma from '../../lib/prisma'

type Data = {
  data: Array<object>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { mechanismTypeId, url } = req.body
    let spreadSheetId = url.toString().split('/')[5]

    if (mechanismTypeId == null || mechanismTypeId == undefined) {
      return res.status(400).json({
        data: [{ message: 'No template mechanism provided' }],
      })
    }

    const sMechanismId = await prisma.mechanism.findUnique({
      where: {
        id: mechanismTypeId,
      },
    })

    if (
      !sMechanismId ||
      sMechanismId.templateSheet == null ||
      sMechanismId.templateSheet == undefined
    ) {
      return res.status(400).json({
        data: [{ message: 'template mechanism could not be found' }],
      })
    }

    console.log('mechanism data = ', sMechanismId)

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const sheet = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadSheetId,
      range: 'TimeSeries',
    })

    const aRows = sheet.data.values || []

    let allRow = []
    for (let row of aRows) {
      allRow.push({
        Months: row[0],
        'Circulating supply': row[1],
        'Expected Token Demand': row[2],
        'Month Count': row[3],
        'Rewards Type': row[4],
        'Template Type': row[5],
      })
    }

    return res.status(200).json({ data: allRow })
  } catch (error) {
    console.log('error = ', error)
    return res.status(403).json({
      data: [{ message: error.message }],
    })
  }
}
