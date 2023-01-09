import Layout from '../components/layout'
// import Intro from '../components/intro'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import { DISCORD_WEBHOOK } from '../lib/constants'

export default function BookAnExpert(props) {
  const submitData = async (values, { setSubmitting }) => {
    fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content:
          'Name: ' +
          values.name +
          '\nEmail: ' +
          values.email +
          '\nTimeline: ' +
          values.timeline +
          '\nMessage: ' +
          values.message,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
    setSubmitting(false)
    toast.success('Message sent ', { position: 'bottom-right' })
  }

  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <Toaster />
        <div className="m-auto flex flex-col justify-center">
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
            Tell us what your looking for
          </h1>
          <p className="mb-5 text-center">and we'll get back to you asap</p>
          <Formik
            initialValues={{
              name: '',
              email: '',
              timeframe: new Date().toLocaleDateString('en-CA'),
              message: '',
            }}
            onSubmit={submitData}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="m-auto flex w-full max-w-xl flex-col justify-center">
                <Field
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                />
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                />
                <Field
                  type="date"
                  name="timeframe"
                  className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                />
                <Field
                  as="textarea"
                  rows="8"
                  name="message"
                  placeholder="tell us about your requirements"
                  className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </>
  )
}
