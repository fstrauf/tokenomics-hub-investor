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
    const { spreadsheetId } = req.body

    const { GoogleSpreadsheet } = require('google-spreadsheet')

    const doc = new GoogleSpreadsheet(spreadsheetId)
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]

    let aRows = await sheet.getRows()
    console.log('sheet ========', aRows[0]._rawData)
    let allRow = []
    for (let row of aRows) {
      allRow.push({
        month: row._rawData[0],
        expecedYield: row._rawData[1],
        percentageStaked: row._rawData[2],
        circulatingSupply: row._rawData[3],
        tokenDemand: row._rawData[4],
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
