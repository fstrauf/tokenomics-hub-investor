import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelectUser from '../form/FormSelectUser'
import FormTipTap from '../form/FormTipTap'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { shortBigNumber } from '../../lib/helper'

export const MechanismCard = ({
  field,
  mechanismIndex,
  setFieldValue,
  users,
}) => {
  const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  const supplyBuilder = () => {
    return (
      <>
        <div>
          <div className="flex p-5">
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Allocation Based Supply
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
              Emission Based Supply
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-1">
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
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <Field
              name={`${field.name}.${mechanismIndex}.color`}
              placeholder="color"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="color"
            />
          </div>
        </div>
      </>
    )
  }

  const demandBuilder = () => {
    return (
      <>
        <div>Demand Estimate</div>
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
        {/* need some kind of table that creates timeseries, question is how we convert the info back and forth */}
      </>
    )
  }

  return (
    <div
      key={mechanismIndex}
      className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Demand Builder</> : <>Supply Builder</>}
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
      {isSink ? (
        <>
          <label className="block text-sm font-medium text-gray-900 ">
            Details
          </label>
          <Field
            id={`${field.name}.${mechanismIndex}.details`}
            name={`${field.name}.${mechanismIndex}.details`}
            // value={field.value[mechanismIndex].details}
            as={FormTipTap}
            placeholder="Details"
            onChange={(e) => {
              setFieldValue(`${field.name}.${mechanismIndex}.details`, e)
            }}
          />
        </>
      ) : (
        <></>
      )}
      <label className="block text-sm font-medium text-gray-900 ">Token</label>
      <Field
        name={`${field.name}.${mechanismIndex}.token`}
        placeholder="Token"
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

      {isSink ? demandBuilder() : supplyBuilder()}
    </div>
  )
}

export default MechanismCard
