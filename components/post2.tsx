import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import FormSelect from './form/FormSelect'
import FormText from './form/FormText'
import FormStrength from './form/FormStrength'
import FormImageSelect from './form/FormImageSelect'
import FormDivider from './form/FormDivider'
import FormAutoSave from './form/FormAutoSave'
import dynamic from 'next/dynamic'
import FormId from './form/FormId'
import { mandatoryFormValidate, notifyReviewers, postStatus } from '../lib/helper'
import { WEBSITE_URL_BASE } from '../lib/constants'
import FormErrorMessage from './form/FormErrorMessage'

export default function Post2({
  content,
  categories,
  tags,
  calculations,
  author,
}) {
  const FormTipTap = dynamic(() => import('./form/FormTipTap'), {
    loading: () => <p>Loading</p>,
  })
  const FormResources = dynamic(() => import('./form/FormResources'), {
    loading: () => <p>Loading</p>,
  })
  const FormInvestmentTake = dynamic(
    () => import('./form/FormInvestmentTake'),
    { loading: () => <p>Loading</p> }
  )
  const FormAnalysis = dynamic(() => import('./form/FormAnalysis'), {
    loading: () => <p>Loading</p>,
  })
  const FormTokenStrength = dynamic(() => import('./form/FormTokenStrength'), {
    loading: () => <p>Loading</p>,
  })
  const FormTimeLine = dynamic(() => import('./form/FormTimeLine'), {
    loading: () => <p>Loading</p>,
  })

  const [isReviewSubmitting, setReviewSubmitting] = useState(false)

  const [postId, setPostId] = useState(content.id)
  const [reviewRequiredFields, setreviewRequiredFields] = useState({})

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }

    if (values?.id === '') {
      try {
        const response = await fetch('/api/post/newProtocol', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          //connect the returned id to the inputfields.id
          const id = await response.text()
          // console.log(response)
          toast.success('Changes auto-saved ' + JSON.parse(id).id, {
            position: 'bottom-right',
          })
          setPostId(JSON.parse(id).id)
        }

        setSubmitting(false)
        console.log('protocol created')
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const response = await fetch('/api/post/updateProtocol', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Changes auto-saved ', { position: 'bottom-right' })
        }

        // await Router.push('/');
        setSubmitting(false)
        console.log('protocol updated')
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function sendToReview(
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    values
  ): void {
    const errors = mandatoryFormValidate(values)
    setreviewRequiredFields(errors)

    if (Object.keys(errors).length > 0) {
      toast.error('Some required fields are missing!', {
        position: 'bottom-right',
      })
    } else {
      const postId = values.id
      setReviewSubmitting(true)
      const body = { status: postStatus.reviewRequired, postId }

      const response = await fetch('/api/post/updateStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = await response.text()
        toast.error(JSON.parse(error).error, { position: 'bottom-right' })
        throw new Error(error)
      } else {
        toast.success('Sent to review', { position: 'bottom-right' })
        notifyReviewers(`${WEBSITE_URL_BASE}/editPost/${postId}`)
      }
      setReviewSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="mt-10 text-4xl">Editing Report: {content?.title} </h2>
          <p className="mb-10">By {author?.username || 'Unknown author'}</p>
        </div>
        <div className="self-center">
          <span>Status: </span>
          <span className="font-bold">{content?.status}</span>
        </div>
      </div>
      <Formik initialValues={content} onSubmit={submitData}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Toaster />
            <FormAutoSave />
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Title
              </label>
              <FormErrorMessage
                field="title"
                reviewRequiredFields={reviewRequiredFields}
              />
              <Field
                type="text"
                name="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </div>
            <div className="mb-6 flex">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Slug
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  To fetch API data, the slug needs to be API id from Coingecko.
                </p>
              </div>
              <Field
                type="text"
                name="slug"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </div>
            <div className="mb-t flex">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Short Description
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  Give a short summary of the project and the token/tokens.
                </p>
                <FormErrorMessage
                  field="shortDescription"
                  reviewRequiredFields={reviewRequiredFields}
                />
              </div>
              <Field
                name="shortDescription"
                as={FormText}
                placeholder="Short description"
              />
              {/* <FormErrorMessage name="shortDescription" /> */}
            </div>

            <div className="mt-6 flex">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Ticker
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  What's the ticker used for the token?
                </p>
              </div>
              <Field
                type="text"
                name="ticker"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Categories
              </label>
              <FormErrorMessage
                field="categories"
                reviewRequiredFields={reviewRequiredFields}
              />
              <Field
                className="custom-select"
                name="categories"
                options={categories}
                component={FormSelect}
                placeholder="Select categories"
                isMulti={true}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tags
              </label>
              <FormErrorMessage
                field="tags"
                reviewRequiredFields={reviewRequiredFields}
              />
              <Field
                className="custom-select"
                name="tags"
                options={tags}
                component={FormSelect}
                placeholder="Select categories"
                isMulti={true}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Timeline
              </label>
              <p className="mb-2 text-xs font-extralight text-gray-500">
                List the major milestones of the token.
              </p>
              <FormTimeLine values={values} />
            </div>
            <div className="mb-6 flex">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Main Image
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  Upload an SVG or PNG of the protocols logo.
                </p>
              </div>
              <div className="flex">
                <Field
                  id="mainImageUrl"
                  className="custom-image"
                  name="mainImageUrl"
                  as={FormImageSelect}
                  onChange={(e) => setFieldValue('mainImageUrl', e)}
                />
                <img
                  alt={`Cover Image`}
                  className="m-auto h-10 rounded-lg"
                  src={values.mainImageUrl}
                />
              </div>
            </div>
            <FormDivider text="Token Strength" />
            <FormTokenStrength reviewRequiredFields={reviewRequiredFields} />
            <p className="block text-sm font-medium text-gray-900">
              total Strength:
            </p>
            <span className="mb-2 justify-end self-end text-right text-xs font-extralight text-gray-500">
              Rating is optional. Leave the strength rating set to 0 to skip the
              rating
            </span>
            <FormStrength name="tokenStrength" />
            <FormDivider text="Token Analysis" />
            <FormAnalysis />
            <FormDivider text="Investment Take" />
            <FormInvestmentTake />
            <FormDivider text="Deep Dive" />
            <div className="mb-6">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Deep Dive
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  Provide any additional information as well as Token
                  Allocation, Vesting and Dsitribution information.
                </p>
              </div>
              {/* <Tiptap content={deepDive} setContent={setDeepDive} /> */}
              <Field
                name="breakdown"
                as={FormTipTap}
                placeholder="Deep Dive"
                onChange={(e) => setFieldValue('breakdown', e)}
              />
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Calculation
              </label>
              <p className="mb-2 text-xs font-extralight text-gray-500">
                If you have created a calculation, you can link it here.
              </p>
              <Field
                name="calculation"
                as="select"
                className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                // value=''
              >
                <option key="loadcalc" value="" label="load a calculation">
                  Link a Calculation{' '}
                </option>
                {calculations.map((c) => (
                  <>
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  </>
                ))}
              </Field>
            </div>
            <FormDivider text="Additional Information" />
            <div className="mb-6">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Diagram
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  Provide a link to a diagram{' '}
                  <a
                    className="underline"
                    href="https://www.notion.so/tokenomicsdao/Creating-Diagrams-ebc097180eb24380ad3e22ebf25f0189#bf3266cdce724102b2c3155d8fb51239"
                  >
                    (how to)
                  </a>{' '}
                  or upload your own diagram
                </p>
              </div>
              <div className="mb-2">
                <Field
                  name="diagramUrl"
                  as={FormImageSelect}
                  onChange={(e) => setFieldValue('diagramUrl', e)}
                />
              </div>
              <Field
                type="url"
                name="diagramUrl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Resources
              </label>
              <p className="mb-2 text-xs font-extralight text-gray-500">
                List all links to further reading
              </p>
            </div>
            <FormResources values={values} postId={postId} />
            <FormId
              postId={postId}
              type="text"
              name="id"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
            />
            <Field
              type="text"
              name="Author.email"
              disabled={true}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
            />
            <button
              className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              type="submit"
              disabled={isSubmitting || isReviewSubmitting}
            >
              Save
            </button>
            <button
              className="mt-5 ml-3 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              type="button"
              disabled={
                isSubmitting ||
                isReviewSubmitting ||
                values.status === postStatus.reviewRequired ||
                values.status === postStatus.published
              }
              onClick={(e) => sendToReview(e, values)}
            >
              Send to Review
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
