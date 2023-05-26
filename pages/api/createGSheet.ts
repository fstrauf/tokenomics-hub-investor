// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../lib/prisma'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { title, data } = req.body
    const { JWT } = require('google-auth-library')
    const { GoogleSpreadsheet } = require('google-spreadsheet')
    const sheetBaseUrl = `https://sheets.googleapis.com/v4/spreadsheets`
    const copyTemplateSpreadsheetId =
      '1vfGrJYzYRYyaqo6xvPA5vQSHPjd-KaJyQz4AaRn-Iag'

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

    const promisesAccountAuth = []

    promisesAccountAuth.push(
      fetch(
        `https://www.googleapis.com/drive/v3/files/${sheetData.spreadsheetId}/permissions`,
        {
          method: 'POST',
          body: JSON.stringify({
            role: 'writer',
            type: 'anyone',
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt.credentials.access_token}`,
          },
        }
      )
    )

    // await fetch(
    //   `https://www.googleapis.com/drive/v3/files/${sheetData.spreadsheetId}/permissions`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       role: 'writer',
    //       type: 'anyone',
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${jwt.credentials.access_token}`,
    //     },
    //   }
    // )

    const doc = new GoogleSpreadsheet(sheetData.spreadsheetId)
    const copyTemplateDoc = new GoogleSpreadsheet(copyTemplateSpreadsheetId)

    promisesAccountAuth.push(
      doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      })
    )

    promisesAccountAuth.push(
      copyTemplateDoc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      })
    )

    await Promise.all(promisesAccountAuth)

    const promisesLoadInfo = []

    promisesLoadInfo.push(copyTemplateDoc.loadInfo())
    promisesLoadInfo.push(doc.loadInfo())

    await Promise.all(promisesLoadInfo)

    const promisesCopy = []

    for (
      let counter = 0;
      counter < copyTemplateDoc.sheetsByIndex.length;
      counter++
    ) {
      const sheet = copyTemplateDoc.sheetsByIndex[counter]

      if (counter <= 1) {
        await sheet.copyToSpreadsheet(sheetData.spreadsheetId)

        if (sheet.title === 'TimeSeries') {
          await doc.loadInfo()

          let docSheet = doc.sheetsByIndex[doc.sheetsByIndex.length - 1]

          await docSheet.updateProperties({ title: sheet.title })
        }
      } else {
        promisesCopy.push(sheet.copyToSpreadsheet(sheetData.spreadsheetId))
      }
    }

    if (promisesCopy.length) await Promise.all(promisesCopy)

    let docFirstSheet = doc.sheetsByIndex[0]
    await docFirstSheet.delete()

    await doc.loadInfo()

    for (
      let sheetIndex = 0;
      sheetIndex < doc.sheetsByIndex.length;
      sheetIndex++
    ) {
      const sheet = doc.sheetsByIndex[sheetIndex]
      const templateSheet = copyTemplateDoc.sheetsByIndex[sheetIndex]

      sheet.updateProperties({ title: templateSheet.title })
    }

    const sheet = doc.sheetsByIndex[1]
    await sheet.clearRows()

    await sheet.addRows(data)

    return res.status(200).json({ message: sheetData?.spreadsheetUrl })
  } catch (error) {
    console.log('error = ', error)
    return res.status(400).json({
      message: 'Some error occured',
    })
  }
}
