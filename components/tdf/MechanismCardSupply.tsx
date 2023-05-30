import { Field } from 'formik'
import React from 'react'
import FormSelectUser from '../form/FormSelectUser'
// import FormTipTap from '../form/FormTipTap'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { shortBigNumber, supplyDemandType } from '../../lib/helper'

export const MechanismCardSupply = ({
  field,
  mechanismIndex,
  // setFieldValue,
  users,
}) => {

  let isInternal = false
  if (
    field.value[mechanismIndex]?.supplyDemandType ===
    supplyDemandType.supplyInternal
  ) {
    isInternal = true
  }
  // const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

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

  return (
    <div
      key={mechanismIndex}
      className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isInternal ? <>Internal Allocation</> : <>External Allocation</>}
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

      {isInternal ? supplyInternal() : supplyExternal()}
    </div>
  )
}

export default MechanismCardSupply
