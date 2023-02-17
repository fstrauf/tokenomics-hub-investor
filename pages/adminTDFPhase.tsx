import Layout from '../components/layout'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import prisma from '../lib/prisma'
import UnAuthorised from '../components/unauthorised'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import dynamic from 'next/dynamic'

export default function adminTDFPhase({ alldesignPhases }) {
  const [initialValues, setInititalValues] = useState(alldesignPhases[0])

  const FormTipTap = dynamic(() => import('../components/form/FormTipTap'), {
    loading: () => <p>Loading</p>,
  })

  function handleChange(e) {
    setInititalValues(
      alldesignPhases.find((adp) => String(adp.id) === e.target.value)
    )
  }

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }

    fetch('/api/post/updateTDFDesignPhases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSubmitting(false)
    toast.success('saved ', { position: 'bottom-right' })
  }

  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const admin = user?.publicMetadata?.admin || false

  if (isSignedIn && admin) {
    return (
      <>
        <Layout>
          <Toaster />
          <div className="m-auto mb-10 flex w-full max-w-xl flex-col justify-center">
            <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
              TDF Phase editor
            </h1>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Select a design phases
            </label>
            <select
              onChange={handleChange}
              className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
            >
              {alldesignPhases.map((c) => (
                <>
                  <option key={c.id} value={c.id} label={c.name}>
                    {c.id} - {c.name}
                  </option>
                </>
              ))}
            </select>
            <Formik
              initialValues={initialValues}
              onSubmit={submitData}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>               
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    ID
                  </label>
                  <Field
                    id="phaseId"
                    name="phaseId"
                    placeholder="phaseId"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="name"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />

                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    ParentPhaseId
                  </label>
                  <Field
                    id="parentPhaseId"
                    name="parentPhaseId"
                    placeholder="parentPhaseId"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Resources
                  </label>
                  <Field
                    name="Resources"
                    as={FormTipTap}
                    placeholder="Deep Dive"
                    onChange={(e) => setFieldValue('Resources', e)}
                  />
                  <button
                    className="w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
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
      </>
    )
  } else {
    return (
      <>
        <UnAuthorised />
      </>
    )
  }
}

export async function getStaticProps() {
  const alldesignPhases = await prisma.designPhases.findMany()

  return {
    props: {
      alldesignPhases: alldesignPhases || null,
    },
  }
}
