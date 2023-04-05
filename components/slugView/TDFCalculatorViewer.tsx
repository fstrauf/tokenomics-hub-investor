import React, { useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import { getAreaData } from '../../lib/helper'

export default function TDFCalculatorViewer(props) {
  const { values } = props

  const VestingChart = dynamic(() => import('../charts/VestingChart'), {
    ssr: false,
  })
  const AllocationChart = dynamic(() => import('../charts/AllocationChart'), {
    ssr: false,
  })
  const SupplyDemandChart = dynamic(
    () => import('../charts/SupplyDemandChart'),
    {
      ssr: false,
    }
  )

  return (
    <>
      <Toaster />
      <div className="mt-5">      
        <div className="flex">
          <div className='w-3/12'>
            <div className="gap-2 flex">
              <label className="mb-2 w-20 text-xs font-medium text-gray-900">
                Total Supply
              </label>
              <p className="text-xs">{values?.Calculation?.totalSupply}</p>
            </div>
            <div className="gap-2 flex">
              <label className="mb-2 w-20 block text-xs font-medium text-gray-900">
                Months
              </label>
              <p className="text-xs">{values?.Calculation?.months}</p>
            </div>
            <div className="gap-2 flex">
              <label className="mb-2 w-20 block text-xs font-medium text-gray-900">
                Start Date
              </label>
              <p className="text-xs">{String(new Date(values?.Calculation?.startDate).toLocaleDateString('en-AU'))}</p>
            </div>
          </div>
          <div className="m-auto flex w-full flex-col place-items-center">
            <div className="h-52 w-full">
              <ParentSize>
                {({ width, height }) => (
                  // only show supply here
                  <AllocationChart
                    width={width}
                    height={height}
                    fields={values?.Mechanism.filter((m) => !m.isSink)}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </div>
        {/* <FormAreaDataMechanism name="Calculation.areaData" /> */}
        <div className="w-full">
          <div className="h-96 w-full">
            <ParentSize>
              {({ width, height }) => (
                <VestingChart
                  width={width}
                  height={height}
                  // data={values?.Calculation?.areaData?.chartData}
                  data={getAreaData(
                    values?.Calculation?.months,
                    values?.Mechanism,
                    values?.Calculation?.totalSupply,
                    values?.Calculation?.startDate
                  ).chartData}
                  fields={values?.Mechanism.filter((m) => !m.isSink)}
                  totalSupply={values?.Calculation?.totalSupply}
                />
              )}
            </ParentSize>
          </div>
        </div>
        <div className="w-full">
          <div className="h-96 w-full">
            <ParentSize>
            {({ width, height }) => (
              <SupplyDemandChart
                width={width}
                height={height}
                data={getAreaData(
                  values?.Calculation?.months,
                  // values?.Calculation?.CalculationRows,
                  values?.Mechanism,
                  values?.Calculation?.totalSupply,
                  values?.Calculation?.startDate
                ).supplyDemandTotals}
                fields={values?.Mechanism}
                totalSupply={values?.Calculation?.totalSupply}
              />
              )}
            </ParentSize>
          </div>
        </div>
        {/* <FormId
          postId={postId}
          type="text"
          name="id"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        /> */}
      </div>
    </>
  )
}
