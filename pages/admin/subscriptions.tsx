import Layout from '../../components/layout'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import prisma from '../../lib/prisma'
import UnAuthorised from '../../components/unauthorised'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { headerStatus } from '../../lib/helper'
import { GetServerSideProps } from 'next'
// import dynamic from 'next/dynamic'
// import * as yup from 'yup'

export default function subscriptions({ allSubscriptions }) {
  // console.log("🚀 ~ file: coreMechanisms.tsx:12 ~ coreMechanisms ~ alldesignPhases", alldesignPhases)
  const [initialValues, setInititalValues] = useState(
    allSubscriptions[0] || {
      authorClerkId: '',
      stripeCustomerId: '',
      tier: '',
      exampleSectionCount: 0,
      exampleViewStart: new Date(),
    }
  )

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    fetch('/api/post/updateSubscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSubmitting(false)
    setInititalValues(body.values)
    toast.success('saved ', { position: 'bottom-right' })
    
  }

  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const admin = user?.publicMetadata?.admin || false

  function handleChange(e) {
    setInititalValues(
      allSubscriptions.find((adp) => String(adp.authorClerkId) === e.target.value)
    )
  }

  if (admin) {
    return (
      <Layout mode={headerStatus.main}>
        <Toaster />
        <div className="m-auto mb-10 flex w-full max-w-xl flex-col justify-center">
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
            Subscriptions
          </h1>
          <select
              onChange={handleChange}
              className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
            >
              {allSubscriptions.map((c) => (
                <>
                  <option
                    key={c.authorClerkId}
                    value={c.authorClerkId}
                    // label={c.name}
                  >
                    {c.authorClerkId}
                  </option>
                </>
              ))}
            </select>
          <Formik
            initialValues={initialValues}
            onSubmit={submitData}
            // validationSchema={validationSchema}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                    Clerk Id
                  </label>
                  <Field
                    id="authorClerkId"
                    name="authorClerkId"
                    placeholder="authorClerkId"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Stripe Id
                  </label>
                  <Field
                    id="stripeCustomerId"
                    name="stripeCustomerId"
                    placeholder="stripeCustomerId"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <div className="error">
                    <ErrorMessage name="name" />
                  </div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Tier
                  </label>
                  <Field
                    id="tier"
                    name="tier"
                    placeholder="tier"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allSubscriptions = await prisma.subscriptions.findMany()

  return {
    props: {
      allSubscriptions: allSubscriptions || null,
    },
  }
}
