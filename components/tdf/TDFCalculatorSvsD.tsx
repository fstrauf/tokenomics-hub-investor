import React, { useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'

import { Toaster } from 'react-hot-toast'
import FormId from '../form/FormId'
import FormAreaDataMechanism from '../form/FormAreaDataMechanism'

export default function TDFCalculatorSvsD(props) {
  const { values } = props

  const SupplyDemandChart = dynamic(
    () => import('../charts/SupplyDemandChart'),
    {
      ssr: false,
    }
  )

  const [postId, setPostId] = useState(values.id || '')

  return (
    <>
      <Toaster />
      <div className="mt-5">
        <FormAreaDataMechanism name="Calculation.areaData" />

        <div className="w-full">
          <div className="h-96 w-full">
            <ParentSize>
              {({ width, height }) => (
                <SupplyDemandChart
                  width={width}
                  height={height}
                  data={values?.Calculation?.areaData?.supplyDemandTotals}
                  fields={values?.Mechanism}
                  totalSupply={values?.Calculation?.totalSupply}
                />
              )}
            </ParentSize>
          </div>
        </div>
        <FormId
          postId={postId}
          type="text"
          name="id"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        />
      </div>
    </>
  )
}
