import {
  Field,
  FieldArray,
  useFormik,
  ErrorMessage,
  Formik,
  Form,
} from 'formik'
import React from 'react'
import FormSelectUtility from '../form/FormSelectUtility'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import GenericTab from '../generic/GenericTab'
import { createSpreadSheet } from '../../lib/helper'

export const MechanismCardSupply = ({
  field,
  values,
  mechanismIndex,
  setFieldValue,
  users,
  templates,
}) => {
  console.log('values = ', values)
  const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  const Tabs = [
    { tab: 'Phases' },
    { tab: 'Functions' },
    { tab: 'Spreadsheets' },
  ]

  async function downloadSpreadsheet() {
    try {
      console.log('hello')
      let aSpreadsheetData = values.Calculation.areaData.supplyDemandTotals
      console.log('spreadsheet data = ', aSpreadsheetData)
      if (
        'supply' in aSpreadsheetData[0] == false ||
        'demand' in aSpreadsheetData[0] == false
      ) {
        alert('supply/demand not found')
        return
      }
      let aSpreadSheetData = []
      for (let data of aSpreadsheetData) {
        let obj = {
          Months: data.months,
          'Circulating Supply': data.supply,
          'Token Demand': data.demand,
        }
        aSpreadSheetData.push(obj)
      }
      let spreadSheetUrl = await createSpreadSheet({
        title: 'Demand_Staking',
        data: aSpreadSheetData,
      })
      alert(spreadSheetUrl)
    } catch (error) {
      console.log('error = ', error)
      // alert('some error occured')
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
                    <th scope="col" className="py-3">
                      Phase
                    </th>
                    <th scope="col" className="py-3">
                      Phase Duration
                      <span className="ml-1 self-center text-xs">
                        (in months)
                      </span>
                    </th>
                    <th scope="col" className="py-3">
                      Demand
                      <span className="ml-1 self-center text-xs">
                        (tokens during phase)
                      </span>
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
                            <th
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
                            </th>
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
                    phase:
                      field.value[mechanismIndex]?.CalculationTimeSeries
                        ?.length + 1 || 1,
                    months: 6,
                    tokens: 10000000,
                  })
                }
              >
                Add Row
              </button>
            </>
          )}
        />
        <button type="button" onClick={() => {}}>
          Create Spreadsheet
        </button>
      </>
    )
  }

  function Functions() {
    return <>Comming soon...</>
  }

  function Spreadsheet() {
    return (
      <>
        <div className="m-auto mt-5">
          <div className="text-left">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          {/* <button
            type="button"
            onClick={downloadSpreadsheet}
            className="outline outline-1 outline-offset-2 "
          >
            Download Spreadsheet
          </button> */}

          <input
            id="url"
            type="text"
            className="ml-20 outline outline-1 outline-offset-2"
            placeholder="URL"
            // value={url}
          ></input>
          <p>
            <button
              type="button"
              className="float-right mt-5 mr-3 outline outline-1 outline-offset-2"
            >
              Upload Spreadsheet
            </button>
          </p>
        </div>
      </>
    )
  }

  const demandUtility = () => {
    return (
      <>
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Utility
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.Utility`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select utility"
          templates={templates}
          isMulti={true}
          index={mechanismIndex}
          // isSink={isSink}
        />
        <label className="mt-5 block text-sm font-medium text-gray-900">
          Descriptions
        </label>
        <Field
          name={`${field.name}.${mechanismIndex}.description`}
          placeholder="Description"
          className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          as="textarea"
          row={4}
        />

        <div className="mt-10">
          <label className="m-auto tracking-tight text-gray-900">
            DEMAND ESTIMATE
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
    return (
      <>
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select requirement
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.requirement`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select requirement"
          templates={templates}
          isMulti={true}
          index={mechanismIndex}
        />
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select Incentive
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.incentive`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select Incentive"
          isMulti={true}
          index={mechanismIndex}
        />
        <label className="mt-5 block text-sm font-medium text-gray-900">
          Descriptions
        </label>
        <Field
          name={`${field.name}.${mechanismIndex}.description`}
          placeholder="Description"
          className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          as="textarea"
          row={4}
        />

        <div className="mt-10">
          <label
            style={{ alignContent: 'center' }}
            className="tracking-tight text-gray-900"
          >
            DEMAND ESTIMATE
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
    <div key={mechanismIndex} className="ml-20 mr-20">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Mechanisms</> : <>Utility</>}
      </h5>
      <hr></hr>

      {isSink ? demandMechanism() : demandUtility()}
    </div>
  )
}

export default MechanismCardSupply
