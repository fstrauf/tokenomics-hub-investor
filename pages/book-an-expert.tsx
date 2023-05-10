import Layout from '../components/layout'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import { discordWebhooks, sendDiscordMessage } from '../lib/discordMessenger'
import ProductOverview from '../components/ProductOverview'

export default function BookAnExpert(props) {
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
      <Layout>
        {/* <Intro /> */}
        <Toaster />
        <div className="m-auto flex flex-col justify-center">
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
            Need help designing your token?
            <br></br>Want a review of your design?
          </h1>
          <p className="mb-5 text-center">
            our team of experts is happy to help
          </p>
          <div className='my-20'><ProductOverview /></div>
          
          
          <section id="contact-us">
          <h1 className='text-4xl font-bold text-center my-20'>Contact Us</h1>
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
          </section>
          <div className="m-auto mt-20 mb-20 flex max-w-xl flex-col gap-10">
            <h1 className="text-4xl font-bold">Scope, Terms & Conditions</h1>            

            <section id="review-of-your-material">
              <h2 className="text-2xl font-bold">Review of your Material</h2>
              <p>We will analyse, review and provide a report with written feedback <a className='underline' href='https://docs.google.com/document/d/1MYPr1nCKQQ8P9MS6F5Pjkp8xITUItKYI9Udwm6Syh9o'>(using this format)</a> and suggestions to improve your tokenomics design.</p>
              <br/>
              <p>The review will include 2 1 hour meetings. The specifics of what to review and provide feedback on can be discussed within the meeting.</p>
              <p>Prefer crypto payment? We accept DAI or USDC on Ethereum: eth:0x9bcF35BD44Cd5902bfa0738b7B2de12d09CC2DC9 send your tx-link to <a className='underline' href='mailto:contact@tokenomicsdao.com'>contact@tokenomicsdao.com</a></p>
            </section>

            <section id="review-of-tokenomics-design">
              <h2 className="text-2xl font-bold">
                Review of Tokenomics Design Space Design
              </h2>
              <p>We will analyse, review and provide a report with written feedback <a className='underline' href='https://docs.google.com/document/d/1MYPr1nCKQQ8P9MS6F5Pjkp8xITUItKYI9Udwm6Syh9o'>(using this format)</a> and suggestions to improve your tokenomics design.</p>
              <br/>
              <p>To use this option, your full token design must be in the Tokenomics Design Space</p>
              <br/>
              <p>The review will include 2 1 hour meetings. The specifics of what to review and provide feedback on can be discussed within the meeting.</p>
              <p>Prefer crypto payment? We accept DAI or USDC on Ethereum: eth:0x9bcF35BD44Cd5902bfa0738b7B2de12d09CC2DC9 send your tx-link to <a className='underline' href='mailto:contact@tokenomicsdao.com'>contact@tokenomicsdao.com</a></p>
            </section>

            <section id="custom">
              <h2 className="text-2xl font-bold">Custom</h2>
              <p>
                Up to discussion. Scope will be documented and signed off in a
                separate scope document.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}
