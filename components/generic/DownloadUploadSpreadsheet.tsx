import { SetStateAction } from 'react'
import { createSpreadSheet, uploadSpreadsheet } from '../../lib/helper'
import { toast } from 'react-hot-toast'

export async function downloadSpreadsheet(
  values: { Calculation: { areaData: { supplyDemandTotals: string | any[] } } },
  field: { value: { [x: string]: { id: any } } },
  mechanismIndex: string | number,
  setName: { (value: SetStateAction<string>): void; (arg0: string): void },
  setUrl: { (value: SetStateAction<string>): void; (arg0: any): void },
  setDisabled: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) {
  try {
    if ('areaData' in values.Calculation == false) {
      throw 'supply/demand not found'
    }
    if ('supplyDemandTotals' in values.Calculation.areaData == false) {
      throw 'supply/demand not found'
    }
    if (values.Calculation.areaData.supplyDemandTotals.length == 0) {
      throw 'supply/demand not found'
    }

    let aSpreadsheetData = values.Calculation.areaData.supplyDemandTotals
    console.log(
      '🚀 ~ file: MechanismCardDemand.tsx:56 ~ downloadSpreadsheet ~ aSpreadsheetData:',
      aSpreadsheetData
    )
    if (
      'supply' in aSpreadsheetData[0] == false ||
      'demand' in aSpreadsheetData[0] == false
    ) {
      throw 'supply/demand not found'
    }
    if (
      field.value[mechanismIndex].mechanismTypeId == null ||
      field.value[mechanismIndex].mechanismTypeId == undefined
    ) {
      console.log("🚀 ~ file: DownloadUploadSpreadsheet.tsx:39 ~ field.value[mechanismIndex]:", field.value[mechanismIndex])
      return toast.error('Invalid Mechanism', { position: 'bottom-right' })
    }
    setName('Creating Spreadsheet..')
    setDisabled(true)
    let aSpreadSheetData = [
      {
        Months: "Don't Change - Imported from Tokenomics Design Space",
        'Circulating supply':
          "Don't Change - Imported from Tokenomics Design Space",
        'Expected Token Demand':
          "Don't Change - Imported from Tokenomics Design Space",
        'Month Count': "Don't Change - Imported from Tokenomics Design Space",
        'Rewards Type': 'Please select the relevant tab',
        'Template Type': "Don't Change - Imported from Tokenomics Design Space",
      },
    ]

    for (let data of aSpreadsheetData) {
      let obj = {
        Months: data.months,
        'Circulating supply': data.supply,
        'Expected Token Demand': data.demand,
        'Template Type': field.value[mechanismIndex].name
          .replace(/[0-9]/g, '')
          .trim(),
      }
      aSpreadSheetData.push(obj)
    }
    console.log(
      '🚀 ~ file: MechanismCardDemand.tsx:88 ~ downloadSpreadsheet ~ aSpreadSheetData:',
      aSpreadSheetData
    )
    let spreadSheetUrl = await createSpreadSheet({
      mechanismTypeId: field.value[mechanismIndex].mechanismTypeId,
      title: field.value[mechanismIndex].name.replace(/[0-9]/g, '').trim(),
      data: aSpreadSheetData,
    })
    if (JSON.parse(spreadSheetUrl).message == 'Invalid Template')
      throw JSON.parse(spreadSheetUrl).message
    setUrl(JSON.parse(spreadSheetUrl).message)
    setName('Create Spreadsheet')
    setDisabled(false)
  } catch (error) {
    console.log('error = ', error)
    setName('Create Spreadsheet')
    setDisabled(false)
    toast.error(error, { position: 'bottom-right' })
  }
}

export async function uploadSheet(
  field: { value: { [x: string]: { id: any } }; name: any },
  mechanismIndex: string | number,
  url: any,
  setName_: (arg0: string) => void,
  setDisabled: (arg0: boolean) => void,
  setFieldValue: (arg0: string, arg1: any) => void
) {
  try {
    if (url == null) {
      return toast.error('Empty field', { position: 'bottom-right' })
    }
    if (
      field.value[mechanismIndex].mechanismTypeId == null ||
      field.value[mechanismIndex].mechanismTypeId == undefined
    ) {
      return toast.error('Invalid Mechanism', { position: 'bottom-right' })
    }
    setDisabled(true)
    setName_('Uploading sheet...')
    let updateResponse = JSON.parse(
      await uploadSpreadsheet({
        mechanismTypeId: field.value[mechanismIndex].mechanismTypeId,
        url,
      })
    )
    console.log(
      '🚀 ~ file: MechanismCardDemand.tsx:113 ~ uploadSheet ~ updateResponse:',
      updateResponse
    )

    if (updateResponse) {
      try {
        if (updateResponse.data[0].message == 'Invalid Template') {
          throw 'Invalid Template'
        }
        const calculationTimeSeries = updateResponse.data.map(
          (ur: { [x: string]: string }) => ({
            months: Number(ur['Months']),
            tokens: parseInt(
              ur['Expected Token Demand'].replace(/,/g, '').split('.')[0],
              10
            ),
          })
        )
        console.log('calculation time series = ', calculationTimeSeries)
        //remove headers

        calculationTimeSeries.shift()
        setFieldValue(
          `${field.name}.${mechanismIndex}.CalculationTimeSeries`,
          calculationTimeSeries
        )
        toast.success('Upload successfull', { position: 'bottom-right' })
      } catch (error) {
        console.log(
          '🚀 ~ file: MechanismCardDemand.tsx:136 ~ uploadSheet ~ error:',
          error
        )
        toast.error(error, { position: 'bottom-right' })
      }
    }
    setDisabled(false)
    setName_('Upload Spreadsheet')
  } catch (error) {
    console.log('error = ', error)
    setDisabled(false)
    setName_('Upload Spreadsheet')
    //alert(error)
    toast.error('Upload failed..........', { position: 'bottom-right' })
  }
}
