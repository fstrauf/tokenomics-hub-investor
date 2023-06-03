import {
  Field,
  FieldArray,
  useFormikContext,
  // useFormik,
  // ErrorMessage,
  // Formik,
  // Form,
} from 'formik'
import React from 'react'

import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { createSpreadSheet, supplyDemandType, uploadSpreadsheet } from '../../lib/helper'
import { DemandUtility, DemandMechanism } from '../supplyDemandType/SupplyType'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const MechanismCardDemand = ({
  field,
  values,
  mechanismIndex,
  // setFieldValue,
  // users,
  templates,
}) => {

  const { setFieldValue } = useFormikContext()

  let isUtility = false

  if (
    field.value[mechanismIndex]?.supplyDemandType ===
    supplyDemandType.demandUtility
  ) {
    isUtility = true
  }

  // const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  // const secondsPerMonth = 2628000
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState('Create Spreadsheet')
  const [name_, setName_] = useState('Upload Spreadsheet')

  const [url, setUrl] = useState(null)

  let propsOfUtilityDemand = {
    field,
    values,
    mechanismIndex,
    name,
    name_,
    templates,
    disabled,
    url,
    setName,
    setName_,
    setUrl,
    setDisabled,
    setFieldValue,}

  const Tabs = [
    { tab: 'Manual' },
    { tab: 'Functions' },
    { tab: 'Spreadsheets' },
  ]

  async function downloadSpreadsheet() {
    try {
      if ('areaData' in values.Calculation == false) {
        throw 'areaData in Calculation not found'
      }
      if ('supplyDemandTotals' in values.Calculation.areaData == false) {
        throw 'supply demand summary in Calculation not found'
      }
      if (values.Calculation.areaData.supplyDemandTotals.length == 0) {
        throw 'supply demand summary is 0'
      }

      let aSpreadsheetData = values.Calculation.areaData.supplyDemandTotals
      console.log(
        '🚀 ~ file: MechanismCardDemand.tsx:56 ~ downloadSpreadsheet ~ aSpreadsheetData:',
        aSpreadsheetData
      )
      setName('Creating Spreadsheet..')
      setDisabled(true)
      if (
        'supply' in aSpreadsheetData[0] == false ||
        'demand' in aSpreadsheetData[0] == false
      ) {
        throw 'Column supply or demand in Calculation not found'
      }
      let aSpreadSheetData = [
        {
          Months: "Don't Change - Imported from Tokenomics Design Space",
          'Circulating supply':
            "Don't Change - Imported from Tokenomics Design Space",
          'Expected Token Demand':
            "Don't Change - Imported from Tokenomics Design Space",
          'Month Count': "Don't Change - Imported from Tokenomics Design Space",
          'Rewards Type': 'Please select the relevant tab',
          'Template Type':
            "Don't Change - Imported from Tokenomics Design Space",
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
        id: field.value[mechanismIndex].id,
        title: 'Demand_Staking',
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

  async function uploadSheet() {
    try {
      setDisabled(true)
      setName_('Uploading sheet...')
      let updateResponse = JSON.parse(
        await uploadSpreadsheet({ id: field.value[mechanismIndex].id, url })
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
          const calculationTimeSeries = updateResponse.data.map((ur) => ({
            months: Number(ur['Months']),
            tokens: parseInt(
              ur['Expected Token Demand'].replace(/,/g, '').split('.')[0],
              10
            ),
          }))
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

  const DemandBuilder = () => {
    return (
      <>
        <FieldArray
          name={`${field.name}.${mechanismIndex}.CalculationTimeSeries`}
          render={(arrayHelpers) => (
            <>
              <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700">
                  <tr>
                    {/* <th scope="col" className="py-3">
                      Phase
                    </th> */}
                    <th scope="col" className="py-3">
                      Months
                    </th>
                    <th scope="col" className="py-3">
                      Token Demand
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {field.value[mechanismIndex]?.CalculationTimeSeries?.length >
                    0 &&
                    field.value[mechanismIndex]?.CalculationTimeSeries?.map(
                      (input, factorIndex) => (
                        <>
                          <tr
                            key={factorIndex}
                            className="border-b bg-white text-xs font-normal"
                          >
                            {/* <th
                              scope="row"
                              className="whitespace-nowrap text-gray-900 "
                            >
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.phase`}
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                type="number"
                                onWheel={(event) => event.currentTarget.blur()}
                              />
                            </th> */}
                            <td className="">
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.months`}
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                type="number"
                                onWheel={(event) => event.currentTarget.blur()}
                              />
                            </td>
                            <td className="">
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.tokens`}
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                type="number"
                                onWheel={(event) => event.currentTarget.blur()}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
                                onClick={() => arrayHelpers.remove(factorIndex)}
                              >
                                <svg
                                  fill="white"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                >
                                  <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </>
                      )
                    )}
                </tbody>
              </table>
              <button
                type="button"
                className="mt-3 mr-3 w-36 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    // phase:
                    //   field.value[mechanismIndex]?.CalculationTimeSeries
                    //     ?.length + 1 || 1,
                    months: field.value[mechanismIndex]?.CalculationTimeSeries
                    ?.length + 1 || 1,
                    tokens: 10000000,
                  })
                }
              >
                Add Row
              </button>
            </>
          )}
        />
      </>
    )
  }

  function Functions() {
    return <>Comming soon...</>
  }

  function Spreadsheet() {
    return (
      <>
        <div className="m-auto mt-5 flex flex-col gap-3">
          <div className="flex justify-around gap-3">
            <button
              disabled={disabled}
              type="button"
              onClick={downloadSpreadsheet}
              className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
            >
              {name}
            </button>
            <button
              disabled={disabled}
              onClick={uploadSheet}
              type="button"
              className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
            >
              {name_}
            </button>
          </div>
          <input
            // name={`${field.name}.${mechanismIndex}.url`}
            onChange={(event) => setUrl(event.target.value)}
            type="text"
            className="block h-10 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="URL"
            value={url}
          ></input>
        </div>
      </>
    )
  }

  const demandUtility = () => {
    return (
      <>
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select Utility Type
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.mechanismType`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select Utility"
          templates={templates}
          isMulti={true}
          index={mechanismIndex}
        />
        <div className="mt-10">
          <label className="m-auto tracking-tight text-gray-900">
            Demand Estimate
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <GenericTab
              tabs={Tabs}
              panels={[
                <DemandBuilder></DemandBuilder>,
                <Functions></Functions>,
                <Spreadsheet></Spreadsheet>,
              ]}
            ></GenericTab>
          </div>
        </div>
      </>
    )
  }

  const demandMechanism = () => {
    console.log("🚀 ~ file: MechanismCardDemand.tsx:375 ~ demandMechanism ~ templates:", templates)
    console.log("🚀 ~ file: MechanismCardDemand.tsx:373 ~ demandMechanism ~ field:", field)
    return (
      <>
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select Mechanism Type
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.mechanismType`}          
          options={field}
          
          component={FormSelectUtility}
          placeholder="Select Mechanism"
          templates={templates}
          
          isMulti={true}
          index={mechanismIndex}
        />
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select Incentive
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.incentiveTarget`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select Incentive"
          isMulti={true}
          index={mechanismIndex}
        />
        <div className="mt-10">
          <label
            style={{ alignContent: 'center' }}
            className="tracking-tight text-gray-900"
          >
            Demand Estimate
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>

            <GenericTab
              tabs={Tabs}
              panels={[
                <DemandBuilder></DemandBuilder>,
                <Functions></Functions>,
                <Spreadsheet></Spreadsheet>,
              ]}
            ></GenericTab>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      key={mechanismIndex}
      className="ml-20 mr-20 flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isUtility ? <>Utility</> : <>Mechanisms</>}
      </h5>
      <label className="block text-sm font-medium text-gray-900 ">Name</label>
      <Field
        name={`${field.name}.${mechanismIndex}.name`}
        placeholder="Name"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">
        Summary
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.summary`}
        placeholder="Summary"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        as="textarea"
        rows={4}
      />
      {isUtility ? (
        <DemandUtility {...propsOfUtilityDemand} />
      ) : (
        <DemandMechanism {...propsOfUtilityDemand} />
      )}
    </div>
  )
}

export default MechanismCardDemand
