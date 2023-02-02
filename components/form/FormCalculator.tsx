import { Field, FieldArray } from 'formik'
import React from 'react'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { shortBigNumber } from '../../lib/helper'

export const FormCalculator = ({ values }) => {
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  const monthHeader = (
    <>
      <p className="text-xs font-bold uppercase text-gray-700">Category</p>
      <p className="w-16 text-xs font-bold uppercase text-gray-700">
        Lockup Period
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Unlocking Period
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Percentage Allocation (
        {values?.calculationRows?.reduce(
          (a, v) => (a = a + Number(v?.percentageAllocation)),
          0
        )}
        %)
      </p>{' '}
      <p className="text-xs font-bold uppercase text-gray-700">
        Token Allocation
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">Color</p>
      <p></p>
    </>
  )

  const monthRow = (index, input, arrayHelpers) => (
    <>
      <Field
        name={`calculationRows.${index}.category`}
        placeholder="category"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <Field
        name={`calculationRows.${index}.lockupPeriod`}
        placeholder="lockupPeriod"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        onWheel={(event) => event.currentTarget.blur()}
      />

      <Field
        name={`calculationRows.${index}.unlockPeriod`}
        placeholder="unlockPeriod"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        onWheel={(event) => event.currentTarget.blur()}
      />

      <Field
        name={`calculationRows.${index}.percentageAllocation`}
        placeholder="percentageAllocation"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <div className='text-sm text-center'>
        {new Intl.NumberFormat('en').format(
          Number((input.percentageAllocation / 100) * values?.totalSupply)
        )}
      </div>
      <Field
        name={`calculationRows.${index}.color`}
        placeholder="color"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="color"
      />
      <button
        type="button"
        className="mr-2 inline-flex items-center rounded-full bg-red-500 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
        onClick={() => arrayHelpers.remove(index)}
      >
        <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
        </svg>
      </button>
    </>
  )

  const epochHeader = (
    <>
      <p className="text-xs font-bold uppercase text-gray-700">Category</p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Epoch Duration in Seconds
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Initial Emission per second
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Emission Reduction per Epoch (in %)
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Percentage Allocation (
        {values?.calculationRows?.reduce(
          (a, v) => (a = a + Number(v?.percentageAllocation)),
          0
        )}
        %)
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">
        Token Allocation
      </p>
      <p className="text-xs font-bold uppercase text-gray-700">Color</p>
      <p></p>
    </>
  )

  const epochRow = (index, input, arrayHelpers) => (
    <>
      <Field
        name={`calculationRows.${index}.category`}
        placeholder="category"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <div className='flex'>
        <Field
          name={`calculationRows.${index}.epochDurationInSeconds`}
          placeholder="First Epoch Duration in Seconds"
          className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="number"
          onWheel={(event) => event.currentTarget.blur()}
        />
        {/* ({dayjs.duration(input.epochDurationInSeconds, 'seconds').humanize()}) */}
        <span className="text-xs ml-1 self-center">
          (~{' '}
          {Math.floor(
            dayjs.duration(input.epochDurationInSeconds, 'seconds').asMonths()
          )}{' '}
          months)
        </span>
      </div>
      <div className='flex'>
        <Field
          name={`calculationRows.${index}.initialEmissionPerSecond`}
          placeholder="Initial Emission per Seconds"
          className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="number"
          onWheel={(event) => event.currentTarget.blur()}
        />
        <span className="text-xs ml-1 self-center">
          (~ {shortBigNumber(input.initialEmissionPerSecond * secondsPerMonth)}{' '}
          per month)
        </span>
      </div>
      <Field
        name={`calculationRows.${index}.emissionReductionPerEpoch`}
        placeholder="Reward Reduction per Epoch"
        className="block rounded-lg border w-24 border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        onWheel={(event) => event.currentTarget.blur()}
      />

      <Field
        name={`calculationRows.${index}.percentageAllocation`}
        placeholder="percentageAllocation"
        className="block rounded-lg border w-24 border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <div className='text-sm text-center'>
        {new Intl.NumberFormat('en').format(
          Number((input.percentageAllocation / 100) * values?.totalSupply)
        )}
      </div>
      <Field
        name={`calculationRows.${index}.color`}
        placeholder="color"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="color"
      />
      <button
        type="button"
        className="mr-2 inline-flex items-center rounded-full bg-red-500 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
        onClick={() => arrayHelpers.remove(index)}
      >
        <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
        </svg>
      </button>
    </>
  )

  return (
    <div className="relative">
      <FieldArray
        name="calculationRows"
        render={(arrayHelpers) => (
          <>
            <h1 className="mb-4text-black section-head text-base font-bold">
              Monthly Emissions
            </h1>
            <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
              <div className="mb-3 grid grid-cols-[auto_150px_150px_150px_150px_80px_40px] gap-3">
                {monthHeader}
                {values?.calculationRows?.length > 0 &&
                  values?.calculationRows?.map((input, index) => (
                    <>
                      {!input.isEpochDistro ? (
                        monthRow(index, input, arrayHelpers)
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
              <button
                type="button"
                className="mt-3 mr-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    category: 'Treasury',
                    lockupPeriod: 5,
                    unlockPeriod: 12,
                    percentageAllocation: 10,
                    color: '#823',
                    isEpochDistro: false,
                    epochDurationInSeconds: 0,
                    initialRewardPerSecond: 0,
                    rewardReductionPerEpoch: 0,
                  })
                }
              >
                Add Month Category
              </button>
            </div>
            <h1 className="mb-4text-black section-head text-base font-bold">
              Epoch Based Emissions
            </h1>
            <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
              <div className="mb-3 grid grid-cols-[auto_auto_auto_150px_150px_120px_80px_40px] gap-2">
                {epochHeader}
                {values?.calculationRows?.length > 0 &&
                  values?.calculationRows?.map((input, index) => (
                    <>
                      {input.isEpochDistro ? (
                        epochRow(index, input, arrayHelpers)
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
              <button
                type="button"
                className="mt-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    category: 'Treasury',
                    lockupPeriod: 5,
                    unlockPeriod: 12,
                    percentageAllocation: 10,
                    color: '#Fe1',
                    isEpochDistro: true,
                    epochDurationInSeconds: 126144000,
                    initialEmissionPerSecond: 0.2397,
                    emissionReductionPerEpoch: 0.5,
                  })
                }
              >
                Add Epoch Category
              </button>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCalculator
