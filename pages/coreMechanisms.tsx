import Layout from '../components/layout'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import prisma from '../lib/prisma'
import UnAuthorised from '../components/unauthorised'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import dynamic from 'next/dynamic'
import * as yup from 'yup'

export default function coreMechanisms({ alldesignPhases }) {
  // console.log("🚀 ~ file: coreMechanisms.tsx:12 ~ coreMechanisms ~ alldesignPhases", alldesignPhases)
  const [initialValues, setInititalValues] = useState({
    name: '',
    summary: '',
    details: '',
    isSink: false,
    isTemplate: true,
  
  })

  const FormTipTap = dynamic(() => import('../components/form/FormTipTap'), {
    loading: () => <p>Loading</p>,
  })

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    fetch('/api/post/updateCoreMechanismTemplate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSubmitting(false)
    setInititalValues(
      body.values
    )
    toast.success('saved ', { position: 'bottom-right' })
    
  }

  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const admin = user?.publicMetadata?.admin || false

  function validateName(value) {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
  }

  // const validationSchema = yup.object({
  //   name: yup.string().required('Name is required'),
  //   summary: yup.string().required('Summary is required'),
  //   // isSink: yup.boolean().required('is Sink is required'),
  //   // details: yup.string().required('Details is required'),
  // })

  if (isSignedIn && admin) {
    return (
      <Layout>
        <Toaster />
        <div className="m-auto mb-10 flex w-full max-w-xl flex-col justify-center">
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
            Core Mechanisms
          </h1>

          <Formik
            initialValues={initialValues}
            onSubmit={submitData}
            // validationSchema={validationSchema}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
              <Form>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="name"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <div className="error">
                    <ErrorMessage name="name" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Summary
                  </label>
                  <Field
                    id="summary"
                    name="summary"
                    placeholder="summary"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <div className="error">
                    <ErrorMessage name="summary" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Details
                  </label>

                  <Field
                    name="details"
                    as={FormTipTap}
                    placeholder="Deep Dive"
                    onChange={(e) => setFieldValue('details', e)}
                  />
                  <div className="error">
                    <ErrorMessage name="details" />
                  </div>
                </div>
                <div className="flex">
                  <label className="mb-2 mr-2  text-sm font-medium text-gray-900">
                    Is Sink
                  </label>
                  <Field
                    name="isSink"
                    type="checkbox"
                    className="-mt-[7px]"
                    placeholder="Deep Dive"
                  />
                  <div className="error">
                    <ErrorMessage name="isSink" />
                  </div>
                </div>
                <button
                  className="mt-2 w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    )
  } else {
    return <UnAuthorised />
  }
}

export async function getStaticProps() {
  const alldesignPhases = await prisma.designPhases.findMany({
    orderBy: { phaseId: 'asc' },
  })

  return {
    props: {
      alldesignPhases: alldesignPhases || null,
    },
  }
}
