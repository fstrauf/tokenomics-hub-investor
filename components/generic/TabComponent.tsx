import {
  Field,
  FieldArray,
} from 'formik'
import { Key } from 'react'
import {
  downloadSpreadsheet,
  uploadSheet,
} from '../generic/DownloadUploadSpreadsheet'
export function DemandBuilder(props) {
  return (
    <>
      <FieldArray
        name={`${props.field.name}.${props.mechanismIndex}.CalculationTimeSeries`}
        render={(arrayHelpers) => (
          <>
            <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700">
                <tr>
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
                {props.field.value[props.mechanismIndex]?.CalculationTimeSeries
                  ?.length > 0 &&
                  props.field.value[
                    props.mechanismIndex
                  ]?.CalculationTimeSeries?.map(
                    (input: any, factorIndex: Key) => (
                      <>
                        <tr
                          key={factorIndex}
                          className="border-b bg-white text-xs font-normal"
                        >
                          <td className="">
                            {' '}
                            <Field
                              name={`${props.field.name}.${props.mechanismIndex}.CalculationTimeSeries.${factorIndex}.months`}
                              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              type="number"
                              onWheel={(event: {
                                currentTarget: { blur: () => any }
                              }) => event.currentTarget.blur()}
                            />
                          </td>
                          <td className="">
                            {' '}
                            <Field
                              name={`${props.field.name}.${props.mechanismIndex}.CalculationTimeSeries.${factorIndex}.tokens`}
                              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              type="number"
                              onWheel={(event: {
                                currentTarget: { blur: () => any }
                              }) => event.currentTarget.blur()}
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
                  //   props.field.value[props.mechanismIndex]
                  //     ?.CalculationTimeSeries?.length + 1 || 1,
                  months: props.field.value[props.mechanismIndex]
                  ?.CalculationTimeSeries?.length + 1 || 1,
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

export function Functions() {
  return <>Comming soon...</>
}

export function Spreadsheet(
 props
) {
  console.log("🚀 ~ file: TabComponent.tsx:116 ~ props:", props)
  return (
    <>
      <div className="m-auto mt-5 flex flex-col gap-3">
        <div className="flex justify-around gap-3">
          <button
            disabled={props.disabled}
            type="button"
            onClick={() =>
              downloadSpreadsheet(
                props.values,
                props.field,
                props.mechanismIndex,
                props.setName,
                props.setUrl,
                props.setDisabled
              )
            }
            className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          >
            {props.name}
          </button>
          <button
            disabled={ props.disabled}
            onClick={() =>
              uploadSheet(
                props.field,
                props.mechanismIndex,
                props.url,
                props.setName_,
                props.setDisabled,
                props.setFieldValue
              )
            }
            type="button"
            className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          >
            {  props.name_}
          </button>
        </div>
        <input
          // name={`${field.name}.${mechanismIndex}.url`}
          onChange={(event) =>   props.setUrl(event.target.value)}
          type="text"
          className="block h-10 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="URL"
          value={props.url}
        ></input>
      </div>
    </>
  )
}
