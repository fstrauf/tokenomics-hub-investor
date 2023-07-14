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
  console.log("🚀 ~ file: DownloadUploadSpreadsheet.tsx:13 ~ field:", field.value[mechanismIndex])
  // console.log("🚀 ~ file: DownloadUploadSpreadsheet.tsx:13 ~ values:", values)
  // console.log("🚀 ~ file: DownloadUploadSpreadsheet.tsx:13 ~ values:", values)
  try {
    //console.log("field inside download = ====",field.value[mechanismIndex].mechanismType.mechanismTypeId)

    if ('areaData' in values.Calculation == false) {
      throw 'areaData is not assigned'
    }
    if ('supplyDemandTotals' in values.Calculation.areaData == false) {
      throw 'supplyDemandTotals is not assigned'
    }
    if (values.Calculation.areaData.supplyDemandTotals.length == 0) {
      throw 'No Supply Found'
    }

    let aSpreadsheetData: any = values.Calculation.areaData.supplyDemandTotals

    if ('supply' in aSpreadsheetData[0] == false) {
      throw 'No Supply Found'
    }

    if (!field?.value?.[mechanismIndex]?.mechanismType?.templateSheet) {
      return toast.error('No Utility or Mechanism assigned', {
        position: 'bottom-right',
      })
    }

    if ('mechanismType' in field.value[mechanismIndex] == false) {
      return toast.error('No Utility or Mechanism assigned', {
        position: 'bottom-right',
      })
    }

    setName('Creating Spreadsheet..')
    setDisabled(true)
    let aSpreadSheetData = [
    ]

    for (let [index, data] of aSpreadsheetData.entries()) {
      let obj = {
        Months: data.months == undefined ? index +=1 : data.months,
        'Circulating supply': data.supply,
        'Expected Token Demand': data.demand,
        'Month Count': index == 1 ? aSpreadsheetData.length : '',
        'Template Type': field.value[mechanismIndex].name
          .replace(/[0-9]/g, '')
          .trim(),
      }
      aSpreadSheetData.push(obj)
    }
    let spreadSheetUrl = await createSpreadSheet({
      templateSheetUrl: field.value[mechanismIndex]?.mechanismType?.templateSheet,
      title: field.value[mechanismIndex].name.replace(/[0-9]/g, '').trim(),
      data: aSpreadSheetData,
    })
    if (JSON.parse(spreadSheetUrl).message == 'Invalid Template')
      throw JSON.parse(spreadSheetUrl).message

      toast.success('Spreadsheet Created, copy the link to edit your data', { position: 'bottom-right' })
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
    setDisabled(true)
    setName_('Uploading sheet...')
    // console.log("🚀 ~ file: DownloadUploadSpreadsheet.tsx:124 ~ field.value[mechanismIndex]:", field.value[mechanismIndex])
    let updateResponse = JSON.parse(
      await uploadSpreadsheet({
        mechanismTypeId: field.value[mechanismIndex]?.mechanismType?.id,
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
              ur['Expected Token Demand']?.replace(/,/g, '').split('.')[0],
              10
            ) || 0,
          })
        )
        console.log('calculation time series = ', calculationTimeSeries)
        //remove headers

        calculationTimeSeries.shift()
        setFieldValue(
          `${field.name}.${mechanismIndex}.CalculationTimeSeries`,
          calculationTimeSeries
        )
        toast.success('Upload successful', { position: 'bottom-right' })
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
