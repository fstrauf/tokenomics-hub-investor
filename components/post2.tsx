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

export default function Post2({ content, categories, tags }) {
  // console.log("Post2 " + content.breakdown)

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

  const [postId, setPostId] = useState(content.id)

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }

    // console.log("submit " + values.breakdown)

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

  return (
    <>
      <Formik initialValues={content} onSubmit={submitData}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Toaster />
            <FormAutoSave />
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Title
              </label>
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
            <div className="mb-6 flex">
              <div className="basis-1/4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Short Description
                </label>
                <p className="mb-2 text-xs font-extralight text-gray-500">
                  Give a short summary of the project
                </p>
              </div>
              <Field
                name="shortDescription"
                as={FormText}
                placeholder="Short description"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Categories
              </label>
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
            <FormTokenStrength />
            <p className="mb-2 block text-sm font-medium text-gray-900">
              total Strength:
            </p>
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
                  </a>
                  {' '}or upload your own diagram
                </p>
              </div>
              <div className='mb-2'>
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
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
