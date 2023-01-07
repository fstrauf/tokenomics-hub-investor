import React, { Fragment, useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { Dialog, Transition } from '@headlessui/react'
import FormId from './form/FormId'

export default function Calculator(props) {
  const { initialValues } = props

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

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [postId, setPostId] = useState(initialValues.id)

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
          const id = await response.text()
          toast.success('Calculation saved ', { position: 'bottom-right' })
          setPostId(JSON.parse(id).id)
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
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Calculation saved ', { position: 'bottom-right' })
        }

        // await Router.push('/');
        setSubmitting(false)
        console.log('calculation updated')
      } catch (error) {
        console.error(error)
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

    if (response.ok) {
      const calcRows: any = JSON.parse(await response.text())

      resetForm({
        values: {
          id: calcRows.id,
          totalSupply: calcRows.totalSupply,
          months: calcRows.months,
          areaData: [],
          authorClerkId: calcRows.authorClerkId,
          name: calcRows.title,
          calculations: initialValues.calculations,
          calculationRows: calcRows.CalculationRows,
        },
      })
    }
  }

  return (
    <>
      <h1 className="mb-10 mt-10 text-3xl font-bold">
        Welcome to the Tokenomics DAO Calculation Template
      </h1>
      <Toaster />

      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={submitData}
          enableReinitialize={true}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Share Your Calculation
                          </Dialog.Title>
                          <div className="mt-2">
                            {values.id ? (
                              <pre className="text-xs text-gray-500">
                                http://tokenomicshub.xyz/calculator?id=
                                {values.id}
                              </pre>
                            ) : (
                              <pre className="text-sm text-gray-500">
                                Save your calculation first
                              </pre>
                            )}
                          </div>
                          <div className="mt-4">
                            <button
                              className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:bg-dao-red focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  `http://tokenomicshub.xyz/calculator?id=${values.id}`
                                )
                              }
                            >
                              Copy Link
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <div className="mb-5 flex">
                <Field
                  name="calculations"
                  as="select"
                  className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  // value=''
                >
                  <option key="loadcalc" value="" label="load a calculation">
                    Load a Calculation{' '}
                  </option>
                  {initialValues.calculations.map((c) => (
                    <>
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    </>
                  ))}
                </Field>
                <button
                  onClick={() => loadContent(resetForm, values.calculations)}
                  type="button"
                  className="ml-4 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  disabled={isSubmitting}
                >
                  Load
                </button>
                <button
                  className="ml-4 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
                <button
                  onClick={openModal}
                  className="ml-4 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  type="button"
                  disabled={isSubmitting}
                >
                  Share
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
              <FormId
                postId={postId}
                type="text"
                name="id"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
