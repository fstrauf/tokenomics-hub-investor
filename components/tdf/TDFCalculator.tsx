import React, { useState } from 'react'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
// import { Dialog, Transition } from '@headlessui/react'
import FormId from '../form/FormId'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
// import { useRouter } from 'next/router'
import FormEmission from '../form/FormEmission'
import FormAreaData from '../form/FormAreaData'

export default function TDFCalculator(props) {
  const { preloadInitialValues, values } = props
  console.log("🚀 ~ file: TDFCalculator.tsx:13 ~ TDFCalculator ~ values:", values)
  const { isSignedIn } = useAuth()

  // const router = useRouter()

  const VestingChart = dynamic(() => import('../charts/VestingChart'), {
    ssr: false,
  })
  const AllocationChart = dynamic(() => import('../charts/AllocationChart'), {
    ssr: false,
  })
  // const FormEmission = dynamic(() => import('../form/FormEmission'), {
  //   loading: () => <p>Loading</p>,
  // })
  // const FormAreaData = dynamic(() => import('../form/FormAreaData'), {
  //   loading: () => <p>Loading</p>,
  // })

  // let [isOpen, setIsOpen] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // function openModal() {
  //   setIsOpen(true)
  // }

  const [postId, setPostId] = useState(preloadInitialValues.id)

  const validateName = async (value) => {
    let error;
    if (!value) {
      error = 'Required';      
    }
    return error;
  }

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    if(!isSignedIn){
      toast.error('Please sign in to save calculations', { position: 'bottom-right' })
      return
    }

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

  //can't load content via route 
  // const loadContent = async (calculationId) => {
  //   router.push(`/calculator?id=${calculationId}`)    
  // }

  // const newForm = async () => {
  //   router.push(`/calculator`)    
  // }

  return (
    <>
    {/* <div className='mb-10 mt-10'>
      <h1 className="text-3xl font-bold">
        Welcome to the Tokenomics DAO Calculator
      </h1>
      <p className='text-sm'>Please log-in to save calculations</p>
      </div> */}
      <Toaster />
      <div className="mt-5">
        {/* <Formik
          initialValues={preloadInitialValues}
          onSubmit={submitData}
          enableReinitialize={true}
        >
          {({ isSubmitting, values }) => ( */}
            {/* // <Form> */}
             
              <div className="flex">
                <div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Total Supply
                    </label>
                    <Field
                      type="number"
                      name="calculation.totalSupply"
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
                      name="calculation.months"
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
                      name="calculation.name"    
                      validate={validateName}                                       
                      className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                    />
                    <ErrorMessage name="name">{msg => <div className='text-red-600 font-bold'>{msg}</div>}</ErrorMessage>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name="calculation.startDate"
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
                          fields={values?.calculation?.calculationRows}
                        />
                      )}
                    </ParentSize>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <FormEmission values={values?.calculation} navPreFix='calculation.' />
              </div>
              <FormAreaData name="calculation.areaData" />  
              <div className="w-full">
                <div className="h-96 w-full">
                  <ParentSize>
                    {({ width, height }) => (
                      <VestingChart
                        width={width}
                        height={height}
                        data={values?.calculation?.areaData}
                        fields={values?.calculation?.calculationRows}
                        totalSupply={values?.calculation?.totalSupply}
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
            {/* </Form>
           )}
         </Formik> */}
      </div>
    </>
  )
}
