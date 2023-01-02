import React from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
// import prisma from '../lib/prisma'
// import FormSelect from './form/FormSelect';
// import { useAuth } from '@clerk/nextjs';

export default function Calculator(props) {
  const { userId, calculations } = props
  // console.log(
  //   '🚀 ~ file: calculator.tsx:10 ~ Calculator ~ calculations',
  //   calculations
  // )
  // const { user } = useUser();
  // const { userId } = useAuth();
  // console.log("🚀 ~ file: calculator.tsx:11 ~ Calculator ~ userId", userId)
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
    id: '',
    totalSupply: 100,
    months: 60,
    areaData: [],
    authorClerkId: userId,
    name: '',
    calculations: calculations,
    calculationRows: [
      {
        category: 'Treasury',
        lockupPeriod: 5,
        unlockPeriod: 12,
        percentageAllocation: 30,
        color: '#FF6666',
      },
      {
        category: 'Team',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 15,
        color: '#028090',
      },
      {
        category: 'Investors',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 15,
        color: '#66FFB3',
      },
      {
        category: 'Advisors',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 10,
        color: '#996EFF',
      },
      {
        category: 'Airdrops',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 30,
        color: '#333C45',
      },
    ],
  }

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }

    if (values?.id === '') {
      try {
        const response = await fetch('/api/post/newCalculation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Calculation saved ', { position: 'bottom-right' })
        }

        setSubmitting(false)
        console.log('calculation created')
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const response = await fetch('/api/post/updateCalculation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Calculation saved ', { position: 'bottom-right' })
        }

        // await Router.push('/');
        setSubmitting(false);
        console.log('calculation updated');
    } catch (error) {
        console.error(error);
    }
    }
  }

  const loadContent = async (resetForm, calculationId) => {
    const body = { calculationId }

    const response = await fetch('/api/get/getCalculationRows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    // console.log("🚀 ~ file: calculator.tsx:114 ~ loadContent ~ response", response)

    if (response.ok) {
      //connect the returned id to the inputfields.id
      const calcRows: any = JSON.parse(await response.text())
      // console.log("🚀 ~ file: calculator.tsx:119 ~ loadContent ~ calcRows", calcRows.totalSupply)
      resetForm({
        // values: structure2
        values: {
          id: calcRows.id,
          totalSupply: calcRows.totalSupply,
          months: calcRows.months,
          areaData: [],
          authorClerkId: calcRows.authorClerkId,
          name: calcRows.title,
          calculations: calculations,
          calculationRows: calcRows.CalculationRows,
        },
      })
    }
    // console.log("🚀 ~ file: calculator.tsx:120 ~ loadContent ~ resetForm", resetForm)
  }

  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">
        Welcome to the Tokenomics DAO Calculation Template
      </h1>
      <Toaster />
      <div className="mt-5">
        <Formik
          initialValues={structure}
          onSubmit={submitData}
          enableReinitialize={true}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              <div className="flex mb-5">
                <Field
                  name="calculations"
                  as="select"                  
                  className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  value=''
                >
                  <option value="" label="load a calculation">
                    Load a Calculation{' '}
                  </option>
                  {calculations.map((c) => (
                    <>
                      <option value={c.id}>
                        {c.title}
                      </option>
                    </>
                  ))}
                </Field>
                <button
                  onClick={() => loadContent(resetForm, values.calculations)}
                  type="button"
                  className="ml-4 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                >
                  Load Calculation
                </button>
              </div>
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
                      onWheel={(event) => event.currentTarget.blur()}
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
                      onWheel={(event) => event.currentTarget.blur()}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Calculation name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
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
                          fields={values.calculationRows}
                        />
                      )}
                    </ParentSize>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <FormCalculator values={values} />
                <button
                  className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save Calculation
                </button>
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
                        fields={values.calculationRows}
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
