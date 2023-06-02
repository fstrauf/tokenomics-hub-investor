import TDFSideBar from './TDFSideBar'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { FieldArray, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import FormAutoSave from '../form/FormAutoSave'
import FormId from '../form/FormId'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import RequestReviewModal from '../../components/requestReviewPopup'
import { designElementStatus, headerStatus } from '../../lib/helper'
import { event } from 'nextjs-google-analytics'
import Header2 from '../header2'
import HelpButton from './HelpButton'

export default function TDFMain({ props, header = headerStatus.design }) {
  const router = useRouter()

  const [activePhase, setActivePhase] = useState(
    router.query.phase ? +router.query.phase : 11
  )
  const [postId, setPostId] = useState(props.post.id || '')
  const [isRequestReviewOpen, setIsRequestReviewOpen] = useState(false)
  const initialValues = props.post
  const [reviewRequiredFields, setreviewRequiredFields] = useState({})

  function handlePhaseChange(phase) {
    // if (postId) {
    //   router.push(`/editDesign/${postId}?phase=${phase}`, null, {
    //     scroll: false,
    //   })
    // }

    event(`tdsPhaseChange ${phase}`, {
      category: 'UserAction',
      label: phase,
    })
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
  const TDFComingSoon = dynamic(() => import('./TDFComingSoon'), {
    loading: () => <p>Loading</p>,
  })
  const TDFDynamicOneField = dynamic(() => import('./TDFDynamicOneField'), {
    loading: () => <p>Loading</p>,
  })
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
  const TDF503 = dynamic(() => import('./TDF503'), {
    loading: () => <p>Loading</p>,
  })
  const TDF504 = dynamic(() => import('./TDF504'), {
    loading: () => <p>Loading</p>,
  })
  const TDF505 = dynamic(() => import('./TDF505'), {
    loading: () => <p>Loading</p>,
  })
  const TDF701 = dynamic(() => import('./TDF701'), {
    loading: () => <p>Loading</p>,
  })

  const TDF802 = dynamic(() => import('./TDF802'), {
    loading: () => <p>Loading</p>,
  })
  const TDF803 = dynamic(() => import('./TDF803'), {
    loading: () => <p>Loading</p>,
  })

  const TDF804 = dynamic(() => import('./TDF804'), {
    loading: () => <p>Loading</p>,
  })
  const TDF901 = dynamic(() => import('./TDF901'), {
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
          const id = await response.text()
          toast.success('Changes auto-saved ', {
            position: 'bottom-right',
          })
          setPostId(JSON.parse(id).id)
          router.push(`/editDesign/${JSON.parse(id).id}`)
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
        setSubmitting(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  function renderSwitch(values, setFieldValue) {
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
      case 900:
        return (
          <TDFHeaders props={props} values={values} activePhase={activePhase} />
        )

      case 11:
        return (
          <TDF11
            props={props}
            values={values}
            activePhase={activePhase}
            reviewRequiredFields={reviewRequiredFields}
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
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 102:
        return (
          <TDFGenericOneField
            props={props}
            activePhase={activePhase}
            values={values}
            placeholder={`Similar projects include...`}
            reviewRequiredFields={reviewRequiredFields}
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
            reviewRequiredFields={reviewRequiredFields}
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
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 602:
        return (
          <TDFDynamicOneField
            props={props}
            values={values}
            activePhase={activePhase}
            placeholder="Token Launch"
          />
        )
      case 603:
        return (
          <TDFDynamicOneField
            props={props}
            values={values}
            activePhase={activePhase}
            placeholder="Valuation"
          />
        )
      case 105:
        return (
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
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 503:
        return (
          <TDF503
            props={props}
            values={values}
            activePhase={activePhase}
            setFieldValue={setFieldValue}
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 504:
        return (
          <TDF504
            props={props}
            values={values}
            activePhase={activePhase}
            setFieldValue={setFieldValue}
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 505:
        return (
          <TDF505
            props={props}
            values={values}
            activePhase={activePhase}
            setFieldValue={setFieldValue}
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 701:
        return (
          <TDF701 props={props} values={values} activePhase={activePhase} />
        )
      case 801:
        return (
          <TDF_valueDemandUtility
            props={props}
            values={values}
            activePhase={activePhase}
            reviewRequiredFields={reviewRequiredFields}
          />
        )
      case 802:
        return (
          <TDF802 props={props} values={values} activePhase={activePhase} />
        )
      case 803:
        return (
          <TDF803 props={props} values={values} activePhase={activePhase} />
        )

      case 804:
        return (
          <TDF804 props={props} values={values} activePhase={activePhase} />
        )

      case 901:
        return (
          <TDF901 props={props} values={values} activePhase={activePhase} />
        )
      default:
        return <TDFComingSoon />
    }
  }

  const handleRequestReviewIsOpen = useCallback(
    (event) => {
      setIsRequestReviewOpen(false)
    },
    [isRequestReviewOpen]
  )

  const previewAndSave = async (submitForm) => {
    submitForm()
    router.push(`/postPreview/${postId}`)
  }

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        onSubmit={submitData}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values, dirty, submitForm }) => (
          <Form>
            <Header2 mode={header}>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  className="rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => previewAndSave(submitForm)}
                  className="rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80 disabled:opacity-50"
                >
                  Preview
                </button>
                {/* <Link
                  as={`/postPreview/${postId}`}
                  href="/postPreview/[id]]"
                  className="rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80"
                >
                  Preview
                </Link> */}
                <HelpButton
                  values={values}
                  setIsRequestReviewOpen={setIsRequestReviewOpen}
                  setreviewRequiredFields={setreviewRequiredFields}
                />
              </div>
            </Header2>
            <div className="m-auto max-w-md sm:max-w-2xl lg:max-w-screen-2xl">
              <div className="mt-5 flex h-10 justify-between bg-gray-100 p-1">
                <p className="text-xl font-bold ">{values?.title}</p>
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue(
                        `DesignElement.${values?.DesignElement?.findIndex(
                          (de) =>
                            de.designPhasesId.toString() ===
                            activePhase.toString()
                        )}.designElementStatus`,
                        designElementStatus.completed
                      )
                    }}
                    className="rounded-md bg-dao-red px-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  >
                    Complete Step
                  </button>
                  <RequestReviewModal
                    isOpen={isRequestReviewOpen}
                    handleIsOpen={handleRequestReviewIsOpen}
                  />
                </div>
              </div>

              <div className="mb-5 flex gap-1 ">
                <div className="w-1/6">
                  <TDFSideBar
                    designPhases={props.designPhases}
                    changePhase={handlePhaseChange}
                    activePhase={activePhase}
                    values={values}
                    reviewRequiredFields={reviewRequiredFields}
                  />
                </div>
                <div className="w-5/6 rounded-lg bg-white">
                  <FormAutoSave dirty={dirty} />
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
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster />
    </div>
  )
}
