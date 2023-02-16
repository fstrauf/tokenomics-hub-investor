import Layout from '../components/layout'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Field, Form, Formik, useField, useFormikContext } from 'formik'
import prisma from '../lib/prisma'
import UnAuthorised from '../components/unauthorised'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import { DISCORD_WEBHOOK } from '../lib/constants'

export default function adminTDFPhase({ alldesignPhases }) {
  const submitData = async (values, { setSubmitting }) => {
    // console.log('🚀 ~ file: adminView.tsx:10 ~ submitData ~ values', values)
    const body = { values }

    fetch('/api/post/updateTDFDesignPhases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSubmitting(false)
    toast.success('saved ', { position: 'bottom-right' })
  }

  const DepField = (props) => {
    const {
      values: { designPhases },

      touched,
      setFieldValue,
    } = useFormikContext()
    const [field, meta] = useField(props)

    React.useEffect(() => {
      if (typeof designPhases === 'string') {
        const matchingPost = alldesignPhases.find((ap) => designPhases === ap.id)
        if (matchingPost === undefined) {
        } else {
          setFieldValue(props.name, matchingPost[props.name])
        }
      }
    }, [designPhases, touched.designPhases, setFieldValue, props.name])

    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    )
  }

  const AuthorDepField = (props) => {
    const {
      values: { designPhases },

      touched,
      setFieldValue,
    } = useFormikContext()
    const [field, meta] = useField(props)

    React.useEffect(() => {
      if (typeof designPhases === 'string') {
        const matchingPost = alldesignPhases.find((ap) => designPhases === ap.id)
        if (matchingPost === undefined) {
        } else {
          if (matchingPost.isOfficial) {
            setFieldValue(
              props.name,
              matchingPost?.author?.[props.name.split('.')[1]]
            )
          }
        }
      }
    }, [designPhases, touched.designPhases, setFieldValue, props.name])

    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    )
  }

  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const admin = user?.publicMetadata?.admin || false

  if (isSignedIn && admin) {
    return (
      <>
        <Layout>
          {/* <Intro /> */}
          <Toaster />
          <div className="m-auto flex flex-col justify-center">
            <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
              Admin change fields
            </h1>
            <p className="mb-5 text-center">hopefully don't break anything</p>
            <Formik
              initialValues={{
                id: '',
                title: '',
                slug: '',
                authorClerkId: '',
                isOfficial: false,
                designPhases: '',
              }}
              onSubmit={submitData}
            >
              {({ isSubmitting, values }) => (
                <Form className="m-auto mb-10 flex w-full max-w-xl flex-col justify-center">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Select a designPhases
                  </label>
                  <Field
                    name="designPhases"
                    as="select"
                    className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                    // value=''
                  >
                    <option key="loadcalc" value="" label="load a design Phases">
                      Load a phase{' '}
                    </option>
                    {alldesignPhases.map((c) => (
                      <>
                        <option key={c.id} value={c.id} label={c.title}>
                          {c.id} - {c.title}
                        </option>
                      </>
                    ))}
                  </Field>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Slug
                  </label>
                  <DepField
                    id="slug"
                    name="slug"
                    placeholder="slug"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Is the report endorsed by the protocol?
                  </label>
                  <DepField
                    id="isOfficial"
                    name="isOfficial"
                    type="checkbox"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  {values.isOfficial && (
                    <div className="rounded-lg border-2 p-2">
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        User Id
                      </label>
                      <AuthorDepField
                        id="author.id"
                        name="author.id"
                        placeholder="User Id"
                        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      />
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Protocol Name
                      </label>
                      <AuthorDepField
                        id="author.name"
                        name="author.name"
                        placeholder="Username"
                        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      />
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Protocol Website
                      </label>
                      <AuthorDepField
                        id="author.website"
                        name="author.website"
                        placeholder="Website"
                        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      />
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Protocol Twitter
                      </label>
                      <AuthorDepField
                        id="author.twitter"
                        name="author.twitter"
                        placeholder="Twitter"
                        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      />
                    </div>
                  )}
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Author
                  </label>
                  <DepField
                    id="authorClerkId"
                    name="authorClerkId"
                    placeholder="Author"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />

                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Id
                  </label>
                  <DepField
                    id="id"
                    name="id"
                    placeholder="id"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Title
                  </label>
                  <DepField
                    id="title"
                    name="title"
                    placeholder="title"
                    className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
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
