import React from 'react'
import Tiptap from '../TipTap'
import UserViewer from './UserViewer'

export const MechanismCardViewer = ({
  mechanism,
}) => {
  // console.log('🚀 ~ file: MechanismCardViewer.tsx:12 ~ mechanism:', mechanism)

  const isSink = mechanism.isSink || false

  const supplyBuilder = () => {
    return (
      <>
        <div>
          <div className="flex p-5">
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Allocation Based Supply
            </span>
            <label className="relative mr-5 inline-flex cursor-pointer items-center">
              <span>{mechanism.isEpochDistro}</span>

              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Emission Based Supply
            </span>
          </div>
          {mechanism.isEpochDistro ? (
            <>
              {' '}
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Epoch Duration in Seconds
                </p>
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.epochDurationInSeconds}</p>
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Initial Emission per second
                </p>
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.initialEmissionPerSecond}</p>
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Emission Reduction per Epoch (in %)
                </p>
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.emissionReductionPerEpoch}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <p className="w-16 text-xs font-bold uppercase text-gray-700">
                  Lockup Period
                </p>
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.lockupPeriod}</p>
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Unlocking Period
                </p>
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.unlockPeriod}</p>
              </div>
            </>
          )}
          <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">
              Percentage Allocation (%)
            </p>{' '}
            <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.percentageAllocation}</p>
          </div>
          <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">{mechanism.color}</p>
          </div>
        </div>
      </>
    )
  }

  const demandBuilder = () => {
    return (
      <>
        <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 mt-4">Demand Estimate</div>
        <>
          <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs text-gray-700">
              <tr>
                <th scope="col" className="py-3">
                  Phase
                </th>
                <th scope="col" className="py-3">
                  Phase Duration
                </th>
                <th scope="col" className="py-3">
                  Demand
                </th>
              </tr>
            </thead>
            <tbody>
              {mechanism?.CalculationTimeSeries?.length > 0 &&
                mechanism?.CalculationTimeSeries?.map((input, factorIndex) => (
                  <>
                    <tr
                      key={factorIndex}
                      className="border-b bg-white text-xs font-normal"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap text-gray-900 "
                      >
                        {input.phase}
                      </th>
                      <td className="">
                        {input.months}
                      </td>
                      <td className="">
                        {input.tokens}
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </>
      </>
    )
  }

  return (
    <div
      key={mechanism.id}
      className="ml-auto mr-auto flex max-w-xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Demand Mechanism</> : <>Supply Emission</>}
      </h5>
      <label className="block text-sm font-medium text-gray-900 ">Name</label>
      <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
        {mechanism.name}
      </span>
      <label className="block text-sm font-medium text-gray-900 ">
        Summary
      </label>
      <pre
        id="message"
        className="block w-full whitespace-pre-line rounded-lg bg-slate-50 p-2.5 font-sans text-sm text-gray-900"
      >
        {mechanism.summary}
      </pre>
      {isSink ? (
        <>
          <label className="block text-sm font-medium text-gray-900 ">
            Details
          </label>
          <Tiptap content={mechanism.details} editMode={false} />
        </>
      ) : (
        <></>
      )}
      <label className="block text-sm font-medium text-gray-900 ">Token</label>
      <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
        {mechanism.token}
      </span>
      <UserViewer users={mechanism.PostUser} />

      {isSink ? demandBuilder() : supplyBuilder()}
    </div>
  )
}

export default MechanismCardViewer
