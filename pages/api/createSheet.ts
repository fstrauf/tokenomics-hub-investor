import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { title, templateSheetUrl, data } = req.body

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const drive = google.drive({ version: 'v3', auth })
    const templateSheetId = templateSheetUrl.toString().split('/')[5]
    const newFile = await drive.files.copy({
      fileId: templateSheetId,
      requestBody: {
        name: title,
      }
    })

    const newSpreadSheetId = newFile.data.id

    await drive.permissions.create({
      fileId: newSpreadSheetId,
      requestBody: {
        role: 'writer',
        type: 'anyone',
      },
    })

    const timeSeriesRange = 'TimeSeries!A3:B'

    const resource = {
      values: data.map(obj => [obj.Months, obj['Circulating supply']])
    };
  
    try {
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId: newSpreadSheetId,
        range: timeSeriesRange, // Update the desired sheet and range
        valueInputOption: 'RAW',
        resource: resource
      });
  
      console.log(`${response.data.updatedCells} cells updated.`);
    } catch (error) {
      console.error('Error updating spreadsheet:', error);
    }

    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}`

    return res.status(200).json({ message: spreadsheetUrl })
  } catch (error) {
    console.log('error = ', error)
    return res.status(400).json({
      message: error,
    })
  }
}
