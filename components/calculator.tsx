import React from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { Field, Form, Formik } from 'formik'

export default function Calculator() {
  const VestingChart = dynamic(() => import('./charts/VestingChart'), {
    ssr: false,
  })
  const AllocationChart = dynamic(() => import('./charts/AllocationChart'), {
    ssr: false,
  })
  const FormCalculator = dynamic(() => import('./form/FormCalculator'), {
    loading: () => <p>Loading</p>,
  })
  const FormAreaData = dynamic(() => import('./form/FormAreaData'), {
    loading: () => <p>Loading</p>,
  })

  const structure = {
    totalSupply: 100,
    months: 60,
    areaData: [],
    breakdown: [
      {
        category: 'Treasury',
        lockedMonths: 5,
        vestedMonths: 12,
        allocationP: 30,
        color: '#FF6666',
      },
      {
        category: 'Team',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 15,
        color: '#028090',
      },
      {
        category: 'Investors',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 15,
        color: '#66FFB3',
      },
      {
        category: 'Advisors',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 10,
        color: '#996EFF',
      },
      {
        category: 'Airdrops',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 30,
        color: '#333C45',
      },
    ],
  }

  const submitData = async (values, { setSubmitting }) => {}

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">
        Welcome to the Tokenomics DAO Calculation Template
      </h1>
      <div className="mt-5">
        <Formik initialValues={structure} onSubmit={submitData}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="flex">
                <div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Total Supply
                    </label>
                    <Field
                      type="number"
                      name="totalSupply"
                      className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      onWheel={ event => event.currentTarget.blur() }
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Months
                    </label>
                    <Field
                      type="number"
                      name="months"
                      className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      onWheel={ event => event.currentTarget.blur() }
                    />
                  </div>
                </div>
                <div className="m-auto flex w-full flex-col place-items-center">
                  <div className="h-80 w-full">
                    <ParentSize>
                      {({ width, height }) => (
                        <AllocationChart
                          width={width}
                          height={height}
                          fields={values.breakdown}
                        />
                      )}
                    </ParentSize>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <FormCalculator values={values} />
              </div>

              <FormAreaData name="areaData" />
              <div className="w-full">
                <div className="h-96 w-full">
                  <ParentSize>
                    {({ width, height }) => (
                      <VestingChart
                        width={width}
                        height={height}
                        data={values.areaData}
                        fields={values.breakdown}
                        totalSupply={values.totalSupply}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
