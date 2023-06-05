// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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
    console.log("🚀 ~ file: uploadSheet.ts:14 ~ mechanismTypeId:", mechanismTypeId)
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
    console.log("🚀 ~ file: uploadSheet.ts:27 ~ sMechanismId:", sMechanismId)

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
    const { GoogleSpreadsheet } = require('google-spreadsheet')

    const doc = new GoogleSpreadsheet(spreadSheetId)
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    const temDoc = new GoogleSpreadsheet(
      sMechanismId.templateSheet.toString().split('/')[5]
    )
    await temDoc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    let aRows = await sheet.getRows()
    console.log("🚀 ~ file: uploadSheet.ts:58 ~ aRows:", aRows[1])

    await temDoc.loadInfo()
    const tempSheet = temDoc.sheetsByIndex[1]
    let aTempRows = await tempSheet.getRows()
    console.log("🚀 ~ file: uploadSheet.ts:63 ~ aTempRows:", aTempRows[1])

    // if (aRows[1]._rawData[5] != aTempRows[1]._rawData[5]) {
    //   return res.status(400).json({
    //     data: [{ message: 'Invalid Template' }],
    //   })
    // }
    let allRow = []
    for (let row of aRows) {
      allRow.push({
        Months: row._rawData[0],
        'Circulating supply': row._rawData[1],
        'Expected Token Demand': row._rawData[2],
        'Month Count': row._rawData[3],
        'Rewards Type': row._rawData[4],
        'Template Type': row._rawData[5],
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
