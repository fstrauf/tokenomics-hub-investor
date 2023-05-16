import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelectUtility from '../form/FormSelectUtility'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import GenericTab from '../generic/GenericTab'

export const MechanismCardSupply = ({
  field,
  mechanismIndex,
  setFieldValue,
  users,
}) => {
  const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  const Tabs = [
    { tab: 'Phases' },
    { tab: 'Functions' },
    { tab: 'Spreadsheets' },
  ]

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

  function Spreadsheet(){
    return(
      <>
      <div className='m-auto mt-5'>
        <button className='outline outline-offset-2 outline-1'>Download Spreadsheet</button>
        <button className='ml-20 outline outline-offset-2 outline-1'>Upload Spreadsheet</button>
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
          isMulti={true}
          isSink={isSink}
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
          isMulti={true}
          isSink={isSink}
        />
        <label className="mt-5 block text-sm font-medium text-gray-900 ">
          Select Incentive
        </label>
        <Field
          className="custom-select mt-5"
          name={`${field.name}.${mechanismIndex}.Incentive`}
          options={field}
          component={FormSelectUtility}
          placeholder="Select Incentive"
          isMulti={true}
          isSink={isSink}
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
