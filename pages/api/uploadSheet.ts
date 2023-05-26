// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: Array<object>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id,url } = req.body
    let spreadSheetId = url.toString().split('/')[5]

    const { GoogleSpreadsheet } = require('google-spreadsheet')

    const doc = new GoogleSpreadsheet(spreadSheetId)
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]

    let aRows = await sheet.getRows()
    console.log('sheet ========', aRows[0]._rawData)
    let allRow = []
    for (let row of aRows) {
      allRow.push({
        Months: row._rawData[0],
        'Circulating supply': row._rawData[1],
        'Expected Token Demand': row._rawData[2],
        'Month Count': row._rawData[3],
        'Rewards Type': row._rawData[4],
      })
    }

    return res.status(200).json({ data: allRow })
  } catch (error) {
    console.log('error = ', error.data)
    return res.status(403).json({
      data: [{ message: error.message }],
    })
  }
}
