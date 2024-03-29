import React, { useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { Field } from 'formik'
import { Toaster } from 'react-hot-toast'
import FormId from '../form/FormId'
import FormAreaDataMechanism from '../form/FormAreaDataMechanism'

export default function TDFCalculatorForSupply(props) {
  const { values } = props

  const VestingChart = dynamic(() => import('../charts/VestingChart'), {
    ssr: false,
  })
  const AllocationChart = dynamic(() => import('../charts/AllocationChart'), {
    ssr: false,
  })

  // const [postId, setPostId] = useState(values.id || '')

  return (
    <>
      <Toaster />
      <div className="mt-5">
        <div className="flex">
          <div>
            <div className="mb-1">
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Total Supply
              </label>
              <Field
                type="number"
                name="Calculation.totalSupply"
                className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="mb-1">
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Months
              </label>
              <Field
                type="number"
                name="Calculation.months"
                className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="mb-1">
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Start Date
              </label>
              <Field
                type="date"
                name="Calculation.startDate"
                className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
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
                    hideLegend={true}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </div>
        <FormAreaDataMechanism name="Calculation.areaData" />
        <div className="w-full">
          <div className="h-96 w-full">
            <ParentSize>
              {({ width, height }) => (
                <VestingChart
                  width={width}
                  height={height}
                  data={values?.Calculation?.areaData?.chartData}
                  fields={values?.Mechanism.filter((m) => !m.isSink)}
                  totalSupply={values?.Calculation?.totalSupply}
                />
              )}
            </ParentSize>
          </div>
        </div>

        <FormId
          postId={values?.id}
          type="text"
          name="id"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        />
      </div>
    </>
  )
}
