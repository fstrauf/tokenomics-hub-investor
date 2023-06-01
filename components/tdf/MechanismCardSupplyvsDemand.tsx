import { Field, FieldArray, useFormikContext } from 'formik'
import React, { useState } from 'react'
import FormSelectUser from '../form/FormSelectUser'
import FormTipTap from '../form/FormTipTap'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
//import { createSpreadSheet, uploadSpreadsheet } from '../../lib/helper'
import { supplyDemandType } from '../../lib/helper'
import FormSelectUtility from '../form/FormSelectUtility'
import GenericTab from '../generic/GenericTab'
import { Functions,DemandBuilder,Spreadsheet } from '../generic/TabComponent'
import { toast } from 'react-hot-toast'
import { shortBigNumber } from '../../lib/helper'
import { SupplyInternal,SupplyExternal,DemandUtility,DemandMechanism} from '../supplyDemandType/SupplyType'



export const MechanismCardSupplyvsDemand = ({
  values,
  field,
  mechanismIndex,
  //setFieldValue,
  users,
  templates,
}) => {
  //   const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  console.log('field =======', field.value[mechanismIndex])
  console.log('mechanaism index = ', mechanismIndex)
  console.log("values ==== ",values)
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState('Create Spreadsheet')
  const [name_, setName_] = useState('Upload Spreadsheet')
  const [url, setUrl] = useState('')

  let sCurrentTab = field.value[mechanismIndex]?.supplyDemandType
  const { setFieldValue } = useFormikContext()

  const Tabs = [
    { tab: 'Manual' },
    { tab: 'Functions' },
    { tab: 'Spreadsheets' },
  ]

  // async function downloadSpreadsheet() {
  //   try {
  //     if ('areaData' in values.Calculation == false) {
  //       throw 'supply/demand not found'
  //     }
  //     if ('supplyDemandTotals' in values.Calculation.areaData == false) {
  //       throw 'supply/demand not found'
  //     }
  //     if (values.Calculation.areaData.supplyDemandTotals.length == 0) {
  //       throw 'supply/demand not found'
  //     }

  //     // if(values.Calculation.areaData.length == 0 ){
  //     //   throw 'supply/demand not found'
  //     // }
  //     // let isSupplyPresent = 'areaData' in values.Calculation || 'supplyDemandTotals' in  values.Calculation.areaData
  //     // if (!isSupplyPresent) {
  //     //   throw 'supply/demand not found'
  //     // }

  //     let aSpreadsheetData = values.Calculation.areaData.supplyDemandTotals
  //     console.log(
  //       '🚀 ~ file: MechanismCardDemand.tsx:56 ~ downloadSpreadsheet ~ aSpreadsheetData:',
  //       aSpreadsheetData
  //     )
  //     setName('Creating Spreadsheet..')
  //     setDisabled(true)
  //     if (
  //       'supply' in aSpreadsheetData[0] == false ||
  //       'demand' in aSpreadsheetData[0] == false
  //     ) {
  //       throw 'supply/demand not found'
  //     }
  //     let aSpreadSheetData = [
  //       {
  //         Months: "Don't Change - Imported from Tokenomics Design Space",
  //         'Circulating supply':
  //           "Don't Change - Imported from Tokenomics Design Space",
  //         'Expected Token Demand':
  //           "Don't Change - Imported from Tokenomics Design Space",
  //         'Month Count': "Don't Change - Imported from Tokenomics Design Space",
  //         'Rewards Type': 'Please select the relevant tab',
  //         'Template Type':
  //           "Don't Change - Imported from Tokenomics Design Space",
  //       },
  //     ]

  //     for (let data of aSpreadsheetData) {
  //       let obj = {
  //         Months: data.months,
  //         'Circulating supply': data.supply,
  //         'Expected Token Demand': data.demand,
  //         'Template Type': field.value[mechanismIndex].name
  //           .replace(/[0-9]/g, '')
  //           .trim(),
  //       }
  //       aSpreadSheetData.push(obj)
  //     }
  //     console.log(
  //       '🚀 ~ file: MechanismCardDemand.tsx:88 ~ downloadSpreadsheet ~ aSpreadSheetData:',
  //       aSpreadSheetData
  //     )
  //     let spreadSheetUrl = await createSpreadSheet({
  //       id: field.value[mechanismIndex].id,
  //       title: 'Demand_Staking',
  //       data: aSpreadSheetData,
  //     })
  //     if (JSON.parse(spreadSheetUrl).message == 'Invalid Template')
  //       throw JSON.parse(spreadSheetUrl).message
  //     setUrl(JSON.parse(spreadSheetUrl).message)
  //     setName('Create Spreadsheet')
  //     setDisabled(false)
  //   } catch (error) {
  //     console.log('error = ', error)
  //     setName('Create Spreadsheet')
  //     setDisabled(false)
  //     toast.error(error, { position: 'bottom-right' })
  //   }
  // }

  // async function uploadSheet() {
  //   try {
  //     setDisabled(true)
  //     setName_('Uploading sheet...')
  //     let updateResponse = JSON.parse(
  //       await uploadSpreadsheet({ id: field.value[mechanismIndex].id, url })
  //     )
  //     console.log(
  //       '🚀 ~ file: MechanismCardDemand.tsx:113 ~ uploadSheet ~ updateResponse:',
  //       updateResponse
  //     )

  //     if (updateResponse) {
  //       try {
  //         if (updateResponse.data[0].message == 'Invalid Template') {
  //           throw 'Invalid Template'
  //         }
  //         const calculationTimeSeries = updateResponse.data.map((ur) => ({
  //           months: Number(ur['Months']),
  //           tokens: parseInt(
  //             ur['Expected Token Demand'].replace(/,/g, '').split('.')[0],
  //             10
  //           ),
  //         }))
  //         console.log('calculation time series = ', calculationTimeSeries)
  //         //remove headers

  //         calculationTimeSeries.shift()
  //         setFieldValue(
  //           `${field.name}.${mechanismIndex}.CalculationTimeSeries`,
  //           calculationTimeSeries
  //         )
  //         toast.success('Upload successfull', { position: 'bottom-right' })
  //       } catch (error) {
  //         console.log(
  //           '🚀 ~ file: MechanismCardDemand.tsx:136 ~ uploadSheet ~ error:',
  //           error
  //         )
  //         toast.error(error, { position: 'bottom-right' })
  //       }
  //     }
  //     setDisabled(false)
  //     setName_('Upload Spreadsheet')
  //   } catch (error) {
  //     console.log('error = ', error)
  //     setDisabled(false)
  //     setName_('Upload Spreadsheet')
  //     //alert(error)
  //     toast.error('Upload failed..........', { position: 'bottom-right' })
  //   }
  // }

  // const DemandBuilder = () => {
  //   return (
  //     <>
  //       <FieldArray
  //         name={`${field.name}.${mechanismIndex}.CalculationTimeSeries`}
  //         render={(arrayHelpers) => (
  //           <>
  //             <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
  //               <thead className="bg-gray-50 text-xs text-gray-700">
  //                 <tr>
  //                   {/* <th scope="col" className="py-3">
  //                     Phase
  //                   </th> */}
  //                   <th scope="col" className="py-3">
  //                     Months
  //                   </th>
  //                   <th scope="col" className="py-3">
  //                     Token Demand
  //                   </th>
  //                   <th></th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {field.value[mechanismIndex]?.CalculationTimeSeries?.length >
  //                   0 &&
  //                   field.value[mechanismIndex]?.CalculationTimeSeries?.map(
  //                     (input, factorIndex) => (
  //                       <>
  //                         <tr
  //                           key={factorIndex}
  //                           className="border-b bg-white text-xs font-normal"
  //                         >
  //                           {/* <th
  //                             scope="row"
  //                             className="whitespace-nowrap text-gray-900 "
  //                           >
  //                             {' '}
  //                             <Field
  //                               name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.phase`}
  //                               className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  //                               type="number"
  //                               onWheel={(event) => event.currentTarget.blur()}
  //                             />
  //                           </th> */}
  //                           <td className="">
  //                             {' '}
  //                             <Field
  //                               name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.months`}
  //                               className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  //                               type="number"
  //                               onWheel={(event) => event.currentTarget.blur()}
  //                             />
  //                           </td>
  //                           <td className="">
  //                             {' '}
  //                             <Field
  //                               name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.tokens`}
  //                               className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  //                               type="number"
  //                               onWheel={(event) => event.currentTarget.blur()}
  //                             />
  //                           </td>
  //                           <td>
  //                             <button
  //                               type="button"
  //                               className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
  //                               onClick={() => arrayHelpers.remove(factorIndex)}
  //                             >
  //                               <svg
  //                                 fill="white"
  //                                 viewBox="0 0 16 16"
  //                                 height="1em"
  //                                 width="1em"
  //                               >
  //                                 <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
  //                               </svg>
  //                             </button>
  //                           </td>
  //                         </tr>
  //                       </>
  //                     )
  //                   )}
  //               </tbody>
  //             </table>
  //             <button
  //               type="button"
  //               className="mt-3 mr-3 w-36 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  //               onClick={() =>
  //                 arrayHelpers.push({
  //                   phase:
  //                     field.value[mechanismIndex]?.CalculationTimeSeries
  //                       ?.length + 1 || 1,
  //                   months: 6,
  //                   tokens: 10000000,
  //                 })
  //               }
  //             >
  //               Add Row
  //             </button>
  //           </>
  //         )}
  //       />
  //     </>
  //   )
  // }

  // function Functions() {
  //   return <>Comming soon...</>
  // }

  // function Spreadsheet() {
  //   return (
  //     <>
  //       <div className="m-auto mt-5 flex flex-col gap-3">
  //         <div className="flex justify-around gap-3">
  //           <button
  //             disabled={disabled}
  //             type="button"
  //             onClick={downloadSpreadsheet}
  //             className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
  //           >
  //             {name}
  //           </button>
  //           <button
  //             disabled={disabled}
  //             onClick={uploadSheet}
  //             type="button"
  //             className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
  //           >
  //             {name_}
  //           </button>
  //         </div>
  //         <input
  //           // name={`${field.name}.${mechanismIndex}.url`}
  //           onChange={(event) => setUrl(event.target.value)}
  //           type="text"
  //           className="block h-10 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  //           placeholder="URL"
  //           value={url}
  //         ></input>
  //       </div>
  //     </>
  //   )
  // }

  const supplyInternal = () => {
    return (
      <>
        <div>
          <div className="flex p-5">
            <label>Distribution type</label>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Linear
            </span>
            <label className="relative mx-5 inline-flex cursor-pointer items-center">
              <Field
                id="isEpochDistro"
                name={`${field.name}.${mechanismIndex}.isEpochDistro`}
                type="checkbox"
                class="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Log
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-1">
            <p className="text-xs font-bold uppercase text-gray-700">
              Percentage Allocation (
              {field.values?.reduce(
                (a, v) => (a = a + Number(v?.percentageAllocation)),
                0
              )}
              %)
            </p>{' '}
            <Field
              name={`${field.name}.${mechanismIndex}.percentageAllocation`}
              placeholder="percentageAllocation"
              className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
            />
            {field?.value[mechanismIndex]?.isEpochDistro ? (
              <>
                {' '}
                <p className="text-xs font-bold uppercase text-gray-700">
                  Epoch Duration in Seconds
                </p>
                <div className="flex">
                  <Field
                    name={`${field.name}.${mechanismIndex}.epochDurationInSeconds`}
                    placeholder="First Epoch Duration in Seconds"
                    className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="number"
                    min="0"
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                  <span className="ml-1 self-center text-xs">
                    (~{' '}
                    {Math.floor(
                      dayjs
                        .duration(
                          field.value[mechanismIndex].epochDurationInSeconds,
                          'seconds'
                        )
                        .asMonths()
                    )}{' '}
                    months)
                  </span>
                </div>
                <p className="text-xs font-bold uppercase text-gray-700">
                  Initial Emission per second
                </p>
                <div className="flex">
                  <Field
                    name={`${field.name}.${mechanismIndex}.initialEmissionPerSecond`}
                    placeholder="Initial Emission per Seconds"
                    className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="number"
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                  <span className="ml-1 self-center text-xs">
                    (~{' '}
                    {shortBigNumber(
                      field.value[mechanismIndex].initialEmissionPerSecond *
                        secondsPerMonth
                    )}{' '}
                    per month)
                  </span>
                </div>
                <p className="text-xs font-bold uppercase text-gray-700">
                  Emission Reduction per Epoch (in %)
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.emissionReductionPerEpoch`}
                  placeholder="Emission Reduction per Epoch"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase text-gray-700">
                  % Unlock at TGE
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.percentageUnlockTGE`}
                  placeholder="TGE Unlock Percentage"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <p className="text-xs font-bold uppercase text-gray-700">
                  Lockup Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.lockupPeriod`}
                  placeholder="lockupPeriod"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <p className="text-xs font-bold uppercase text-gray-700">
                  Unlocking Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.unlockPeriod`}
                  placeholder="unlockPeriod"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </>
            )}
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <Field
              name={`${field.name}.${mechanismIndex}.color`}
              placeholder="color"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="color"
            />
            <p className="text-xs font-bold uppercase text-gray-700">APR</p>
            <p className="block p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              15 %
            </p>
          </div>
        </div>
      </>
    )
  }

  const supplyExternal = () => {
    return (
      <>
        <div>
          <div className="flex p-5">
            <label>Distribution type</label>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Linear
            </span>
            <label className="relative mx-5 inline-flex cursor-pointer items-center">
              <Field
                id="isEpochDistro"
                name={`${field.name}.${mechanismIndex}.isEpochDistro`}
                type="checkbox"
                class="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Log
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-1">
            <p className="text-xs font-bold uppercase text-gray-700">
              Percentage Allocation (
              {field.values?.reduce(
                (a, v) => (a = a + Number(v?.percentageAllocation)),
                0
              )}
              %)
            </p>{' '}
            <Field
              name={`${field.name}.${mechanismIndex}.percentageAllocation`}
              placeholder="percentageAllocation"
              className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
            />
            {field?.value[mechanismIndex]?.isEpochDistro ? (
              <>
                {' '}
                <p className="text-xs font-bold uppercase text-gray-700">
                  Epoch Duration in Seconds
                </p>
                <div className="flex">
                  <Field
                    name={`${field.name}.${mechanismIndex}.epochDurationInSeconds`}
                    placeholder="First Epoch Duration in Seconds"
                    className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="number"
                    min="0"
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                  <span className="ml-1 self-center text-xs">
                    (~{' '}
                    {Math.floor(
                      dayjs
                        .duration(
                          field.value[mechanismIndex].epochDurationInSeconds,
                          'seconds'
                        )
                        .asMonths()
                    )}{' '}
                    months)
                  </span>
                </div>
                <p className="text-xs font-bold uppercase text-gray-700">
                  Initial Emission per second
                </p>
                <div className="flex">
                  <Field
                    name={`${field.name}.${mechanismIndex}.initialEmissionPerSecond`}
                    placeholder="Initial Emission per Seconds"
                    className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="number"
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                  <span className="ml-1 self-center text-xs">
                    (~{' '}
                    {shortBigNumber(
                      field.value[mechanismIndex].initialEmissionPerSecond *
                        secondsPerMonth
                    )}{' '}
                    per month)
                  </span>
                </div>
                <p className="text-xs font-bold uppercase text-gray-700">
                  Emission Reduction per Epoch (in %)
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.emissionReductionPerEpoch`}
                  placeholder="Emission Reduction per Epoch"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase text-gray-700">
                  % Unlock at TGE
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.percentageUnlockTGE`}
                  placeholder="TGE Unlock Percentage"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <p className="text-xs font-bold uppercase text-gray-700">
                  Lockup Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.lockupPeriod`}
                  placeholder="lockupPeriod"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <p className="text-xs font-bold uppercase text-gray-700">
                  Unlocking Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.unlockPeriod`}
                  placeholder="unlockPeriod"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </>
            )}
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <Field
              name={`${field.name}.${mechanismIndex}.color`}
              placeholder="color"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="color"
            />
            <p className="text-xs font-bold uppercase text-gray-700">APR</p>
            <p className="block p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              15 %
            </p>
          </div>
        </div>
      </>
    )
  }

  const demandUtility = () => {
    let props = {
      field,
      mechanismIndex
    }
    let propsOfSpreadsheet = {
      field,
      values,
      mechanismIndex,
      name,
      name_,
      setName,
      setName_,
      setUrl,
      setDisabled,
      setFieldValue
    }
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
                <DemandBuilder {...props}></DemandBuilder>,
                <Functions></Functions>,
                <Spreadsheet {...propsOfSpreadsheet}></Spreadsheet>,
              ]}
            ></GenericTab>
          </div>
        </div>
      </>
    )
  }

  const demandMechanism = () => {
    let props = {
      field,
      mechanismIndex
    }
    let propsOfSpreadsheet = {
      field,
      values,
      mechanismIndex,
      name,
      name_,
      setName,
      setName_,
      setUrl,
      setDisabled,
      setFieldValue
    }
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
                <DemandBuilder {...props}></DemandBuilder>,
                <Functions></Functions>,
                <Spreadsheet {...propsOfSpreadsheet}></Spreadsheet>,
              ]}
            ></GenericTab>
          </div>
        </div>
      </>
    )
  }

  function returnsTab(tab) {
    let propsOfInternalExternal={
      field,
      values,
      mechanismIndex,
     }
     let propsOfUtilityDemand = {
      field,
      values,
      mechanismIndex,
      name,
      name_,
      templates,
      url,
      disabled,
      setName,
      setName_,
      setUrl,
      setDisabled,
      setFieldValue
    }
    switch (tab) {
      case 'supplyInternal':
        return <SupplyInternal {...propsOfInternalExternal}/>
      case 'supplyExternal':
        return  <SupplyExternal {...propsOfInternalExternal}/>
      case 'demandUtility':
        return  <DemandUtility {...propsOfUtilityDemand}/>
      case 'demandMechanism':
        return <DemandMechanism {...propsOfUtilityDemand}/>
    }
  }

  function returnsTabName(tab) {
    switch (tab) {
      case 'supplyInternal':
        return 'Internal Allocation'
      case 'supplyExternal':
        return 'External Allocation'
      case 'demandUtility':
        return 'Utility'
      case 'demandMechanism':
        return 'Mechanism'
    }
  }



  if (
    sCurrentTab == supplyDemandType.supplyInternal ||
    sCurrentTab == supplyDemandType.supplyExternal
  ) {
    return (
      <div
        key={mechanismIndex}
        className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {returnsTabName(sCurrentTab)}
        </h5>
        <label className="block text-sm font-medium text-gray-900 ">Name</label>
        <Field
          name={`${field.name}.${mechanismIndex}.name`}
          placeholder="Name"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="text"
        />

        <label className="block text-sm font-medium text-gray-900 ">User</label>
        <Field
          className="custom-select"
          name={`${field.name}.${mechanismIndex}.PostUser`}
          options={users}
          component={FormSelectUser}
          placeholder="Select Users"
          isMulti={true}
        />

        {returnsTab(sCurrentTab)}
      </div>
    )
  }
  return (
    <div
      key={mechanismIndex}
      className="ml-20 mr-20 flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {returnsTabName(sCurrentTab)}
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
      {returnsTab(sCurrentTab)}
    </div>
  )
}

export default MechanismCardSupplyvsDemand
