import TDFSideBar from './TDFSideBar'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { FieldArray, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import FormAutoSave from '../form/FormAutoSave'
import FormId from '../form/FormId'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import TDFHeaders from './TDFHeaders'

export default function TDFMain({ props }) {
  const router = useRouter()

  const [activePhase, setActivePhase] = useState(
    router.query.phase ? +router.query.phase : 11
  ) //props.design.activePhase
  const [postId, setPostId] = useState(props.post.id || '')

  const initialValues = props.post
  function handlePhaseChange(phase) {
    if (postId) {
      router.push(`/editDesign/${postId}?phase=${phase}`)
    }
    setActivePhase(phase)
  }

  useEffect(() => {}, [router.query.phase])

  const TDFHeaders = dynamic(() => import('./TDFHeaders'), {
    loading: () => <p>Loading</p>,
  })
  const TDF11 = dynamic(() => import('./TDF11'), {
    loading: () => <p>Loading</p>,
  })
  const TDFGenericOneField = dynamic(() => import('./TDFGenericOneField'), {
    loading: () => <p>Loading</p>,
  })
  const TDFDynamicOneField = dynamic(() => import('./TDFDynamicOneField'), {
    loading: () => <p>Loading</p>,
  })
  // const TDF105 = dynamic(() => import('./TDF105'), {
  //   loading: () => <p>Loading</p>,
  // })
  // const TDF201 = dynamic(() => import('./TDF201'), {
  //   loading: () => <p>Loading</p>,
  // })
  const TDF301 = dynamic(() => import('./TDF301'), {
    loading: () => <p>Loading</p>,
  })
  const TDF302 = dynamic(() => import('./TDF302'), {
    loading: () => <p>Loading</p>,
  })
  const TDF303 = dynamic(() => import('./TDF303'), {
    loading: () => <p>Loading</p>,
  })
  const TDF401 = dynamic(() => import('./TDF401'), {
    loading: () => <p>Loading</p>,
  })
  const TDF402 = dynamic(() => import('./TDF402'), {
    loading: () => <p>Loading</p>,
  })
  const TDF403 = dynamic(() => import('./TDF403'), {
    loading: () => <p>Loading</p>,
  })
  const TDF404 = dynamic(() => import('./TDF404'), {
    loading: () => <p>Loading</p>,
  })
  const TDF_valueDemandUtility = dynamic(
    () => import('./TDF_valueDemandUtility'),

    {
      loading: () => <p>Loading</p>,
    }
  )
  const TDF501 = dynamic(() => import('./TDF501'), {
    loading: () => <p>Loading</p>,
  })
  const TDF502 = dynamic(() => import('./TDF502'), {
    loading: () => <p>Loading</p>,
  })
  // const TDF603 = dynamic(() => import('./TDF603'), {
  //   loading: () => <p>Loading</p>,
  // })
  const TDF701 = dynamic(() => import('./TDF701'), {
    loading: () => <p>Loading</p>,
  })

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    if (values?.id === '') {
      try {
        const response = await fetch('/api/post/newDesign', {
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
          toast.success('Changes auto-saved ', {
            position: 'bottom-right',
          })
          setPostId(JSON.parse(id).id)
        }

        setSubmitting(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const response = await fetch('/api/post/updateNewDesign', {
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
        console.log('TDF updated')
      } catch (error) {
        console.error(error)
      }
    }
  }

  function renderSwitch(values, setFieldValue) {
    // console.log('renderSwitch', activePhase)
    switch (activePhase) {
      case 10:
      case 100:
      case 200:
      case 300:
      case 400:
      case 500:
      case 600:
      case 700:
      case 800:
        return (
          <TDFHeaders props={props} values={values} activePhase={activePhase} />
        )

      case 11:
        return (
          <TDF11
            props={props}
            values={values}
            // content={content}
            activePhase={activePhase}
          />
        )
      case 101:
        return (
          <TDFGenericOneField
            props={props}
            activePhase={activePhase}
            values={values}
            placeholder={`Problem:
        - State the problem that the protocol is trying to solve        
Solution:
        - State the solution that the protocol provides`}
            format={`Problem:
        - 
        
        Solution:
        - `}
          />
        )
      case 102:
        return (
          <TDFGenericOneField
            props={props}
            activePhase={activePhase}
            values={values}
            placeholder={`Similar projects include...`}
          />
        )
      case 103:
        return (
          <TDFGenericOneField
            props={props}
            activePhase={activePhase}
            values={values}
            placeholder={`The value created by [protocol] is...`}
            format={`The value created by...`}
          />
        )
      case 104:
        return (
          <TDFGenericOneField
            props={props}
            activePhase={activePhase}
            values={values}
            placeholder={`The business model for [protocol]:
Revenue comes from:
[Explanation]

Revenue is denominated in:
[Explanation]

Revenue goes to:
[Explanation, include any percentages if there is a revenue split between different users/parties]`}
            format={`The business model for protocol
- Revenue comes from:
explanation

- Revenue is denominated in:
explanation

- Revenue goes to:
explanation`}
          />
        )
      case 603:
        return (
          // <TDF105 props={props} values={values} activePhase={activePhase} />
          <TDFDynamicOneField
            props={props}
            values={values}
            activePhase={activePhase}
            placeholder="Token Launch"
          />
        )
      case 105:
        return (
          // <TDF105 props={props} values={values} activePhase={activePhase} />
          <TDFDynamicOneField
            props={props}
            values={values}
            activePhase={activePhase}
            placeholder="Token Evaluation"
          />
        )
      case 301:
        return (
          <TDF301 props={props} values={values} activePhase={activePhase} />
        )
      case 302:
        return (
          <TDF302 props={props} values={values} activePhase={activePhase} />
        )
      case 303:
        return (
          <TDF303 props={props} values={values} activePhase={activePhase} />
        )
      case 401:
        return (
          <TDF401 props={props} values={values} activePhase={activePhase} />
        )
      case 402:
        return (
          <TDF402 props={props} values={values} activePhase={activePhase} />
        )
      case 403:
        return (
          <TDF403 props={props} values={values} activePhase={activePhase} />
        )
      case 404:
        return (
          <TDF404 props={props} values={values} activePhase={activePhase} />
        )
      case 801:
        return (
          <TDF_valueDemandUtility
            props={props}
            values={values}
            activePhase={activePhase}
          />
        )
      case 501:
        return (
          <TDF501
            props={props}
            values={values}
            activePhase={activePhase}
            setFieldValue={setFieldValue}
          />
        )
      case 502:
        return (
          <TDF502
            props={props}
            values={values}
            activePhase={activePhase}
            setFieldValue={setFieldValue}
          />
        )
      // case 603:
      //   return <TDF603 props={props} activePhase={activePhase} />
      case 701:
        return (
          <TDF701 props={props} values={values} activePhase={activePhase} />
        )
      default:
        return (
          <TDFGenericOneField
            props={props}
            values={values}
            activePhase={activePhase}
          />
        )
    }
  }

  return (
    <div className="mt-4 mb-4 rounded-lg bg-gray-100 p-1">
      {/* <div className="h-12 w-full"></div> */}
      <div className="mb-5 flex gap-1 ">
        <div className="w-1/6">
          <div className="h-10 bg-gray-100 p-1 "></div>
          <TDFSideBar
            designPhases={props.designPhases}
            changePhase={handlePhaseChange}
            activePhase={activePhase}
          />
        </div>
        <div className="w-5/6 rounded-lg bg-white">
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitData}
              enableReinitialize
              // innerRef={formRef}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className="flex h-10 justify-between bg-gray-100 p-1">
                    <p className="text-xl font-bold ">{values?.title}</p>
                    <div className="flex justify-end gap-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        // onClick={formik.handleSubmit}
                        className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                      >
                        Save
                      </button>
                      <Link
                        as={`/posts/${postId}`}
                        href="/posts/[id]]"
                        className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                  <FormAutoSave />
                  <FieldArray
                    name="DesignElement"
                    render={() => (
                      <div className="rounded-lg bg-white">
                        {renderSwitch(values, setFieldValue)}
                      </div>
                    )}
                  />
                  <FormId
                    postId={postId}
                    type="text"
                    name="id"
                    className="hidden w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  )
}
