// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   message: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const { blankSpreadSheetId, templateSheetUrl, data } = req.body
//     const { GoogleSpreadsheet } = require('google-spreadsheet')
//     const promisesAccountAuth = []

//     const newSpreadSheet = new GoogleSpreadsheet(blankSpreadSheetId)

//     const templateSpreadSheet = new GoogleSpreadsheet(
//       templateSheetUrl.toString().split('/')[5]
//     )

//     promisesAccountAuth.push(
//       newSpreadSheet.useServiceAccountAuth({
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY,
//       })
//     )

//     promisesAccountAuth.push(
//       templateSpreadSheet.useServiceAccountAuth({
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY,
//       })
//     )

//     promisesAccountAuth.push(templateSpreadSheet.loadInfo())
//     promisesAccountAuth.push(newSpreadSheet.loadInfo())
//     await Promise.all(promisesAccountAuth)

//     for (
//       let counter = 0;
//       counter < templateSpreadSheet.sheetsByIndex.length;
//       counter++
//     ) {
//       const templateSheet = templateSpreadSheet.sheetsByIndex[counter]

//       if (counter <= 1) {
//         await templateSheet.copyToSpreadsheet(blankSpreadSheetId)

//         if (templateSheet.title === 'TimeSeries') {
//           await newSpreadSheet.loadInfo()

//           let docSheet =
//             newSpreadSheet.sheetsByIndex[
//               newSpreadSheet.sheetsByIndex.length - 1
//             ]

//           await docSheet.updateProperties({ title: templateSheet.title })
//         }
//       } else {
//         templateSheet.copyToSpreadsheet(blankSpreadSheetId)
//       }
//     }

//     let docFirstSheet = newSpreadSheet.sheetsByIndex[0]
//     await docFirstSheet.delete()

//     await newSpreadSheet.loadInfo()
//     for (
//       let sheetIndex = 0;
//       sheetIndex < newSpreadSheet.sheetsByIndex.length;
//       sheetIndex++
//     ) {
//       const newSheet = newSpreadSheet.sheetsByIndex[sheetIndex]

//       const templateSheet = templateSpreadSheet.sheetsByIndex[sheetIndex]
//       newSheet.updateProperties({
//         title: templateSheet.title.replace(/^Copy of /, ''),
//       })
//     }

//     await newSpreadSheet.loadInfo()

//     const timeSeriesSheet = newSpreadSheet.sheetsByIndex[1]

//     await timeSeriesSheet.loadCells('A3:E')
//     for (let i = 0; i < data.length; i++) {
//       timeSeriesSheet.getCellByA1(`B${i + 3}`).value =
//         data[i]['Circulating supply']
//       if (timeSeriesSheet.getCellByA1(`C${i + 3}`).formula) {
//         timeSeriesSheet.getCellByA1(`C${i + 3}`).formula =
//           timeSeriesSheet.getCellByA1(`C${i + 3}`).formula
//       }
//     }

//     await timeSeriesSheet.saveUpdatedCells()

//     return res.status(200).json({ message: newSpreadSheet?._spreadsheetUrl })
//   } catch (error) {
//     console.log('error = ', error)
//     return res.status(400).json({
//       message: error,
//     })
//   }
// }
