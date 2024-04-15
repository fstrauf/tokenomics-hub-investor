import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
// import { validateTierAccess } from '../../lib/helper'
// import SubscriptionOptions from '../subscription/SubscriptionOptions'

export default function NewDesignMinimal({ newPost, postCount, subscription }) {
  const router = useRouter()
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const submitData = async (values) => {
    const body = { values }
    setIsSubmittingForm(true)
    try {
      const response = await fetch('/api/post/newDesign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = await response.text()
        toast.error(JSON.parse(error).error, { position: 'bottom-right' })
        setIsSubmittingForm(false)
        throw new Error(error)
      } else {
        const id = await response.text()
        toast.success('Design created, redirecting shortly.', {
          position: 'bottom-right',
        })
        router.push(`/editDesign/${JSON.parse(id).id}`)
      }
    } catch (error) {
      setIsSubmittingForm(false)
      console.error(error)
    }
  }

  // if(postCount >=3 && !validateTierAccess(subscription) ) return(
  //   <div>
  //   <h1 className='text-center font-bold'>You have reached 3 free designs, subscribe for more.</h1>
  //   <SubscriptionOptions/>
  // </div>
  // )

  return (
    <>
      <h1 className="my-20 text-center text-4xl font-bold">
        Create a new Token Design
      </h1>
      <Toaster />
      <Formik initialValues={newPost} onSubmit={submitData}>
        {() => (
          <Form className="m-auto flex w-full max-w-xl flex-col justify-center">
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Title
              </label>

              <Field
                type="text"
                name="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingForm}
              className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
            >
              Create new Token Design
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
