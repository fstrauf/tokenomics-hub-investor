import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { discordWebhooks, sendDiscordMessage } from '../../lib/discordMessenger'
import { Toaster } from 'react-hot-toast'

export default function ContactUs() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const submitData = async (values, { resetForm }) => {
    setIsSubmittingForm(true)

    const message = `
    Name: ${values.name}
    Email: ${values.email}
    Timeline: ${values.timeline}
    Message: ${values.message}`
    const success = await sendDiscordMessage(
      message,
      discordWebhooks.consulting
    )

    if (success) {
      resetForm()
    }
    setIsSubmittingForm(false)
  }

  return (
    <>
      <h1 className="my-20 text-center text-4xl font-bold">Contact Us</h1>
      <Toaster/>
      <Formik
        initialValues={{
          name: '',
          email: '',
          timeline: new Date().toLocaleDateString('en-CA'),
          message: '',
        }}
        onSubmit={submitData}
      >
        {({ isSubmitting }) => (
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
              name="timeline"
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
              disabled={isSubmittingForm}
              className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
