import TDFSideBar from './TDFSideBar'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import FormAutoSave from '../form/FormAutoSave'
// import TDFHeaders from './TDFHeaders'

export default function TDFMain({ props, content }) {
  console.log('🚀 ~ file: tdfMain.tsx:9 ~ TDFMainx ~ props  -k', props)
  // console.log('🚀 content', content)
  const [activePhase, setActivePhase] = useState(11) //props.design.activePhase

  const initialValues = content
  function handlePhaseChange(phase) {
    setActivePhase(phase)
  }

  const TDFHeaders = dynamic(() => import('./TDFHeaders'), {
    loading: () => <p>Loading</p>,
  })
  const TDF11 = dynamic(() => import('./TDF11'), {
    loading: () => <p>Loading</p>,
  })
  const TDF101 = dynamic(() => import('./TDF101'), {
    loading: () => <p>Loading</p>,
  })
  const TDF102 = dynamic(() => import('./TDF102'), {
    loading: () => <p>Loading</p>,
  })
  const TDF103 = dynamic(() => import('./TDF103'), {
    loading: () => <p>Loading</p>,
  })
  const TDF201 = dynamic(() => import('./TDF201'), {
    loading: () => <p>Loading</p>,
  })
  const TDF202 = dynamic(() => import('./TDF202'), {
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
  // const TDF405 = dynamic(() => import('./TDF405'), {
  //   loading: () => <p>Loading</p>,
  // })
  // const TDF406 = dynamic(() => import('./TDF406'), {
  //   loading: () => <p>Loading</p>,
  // })
  const TDF407 = dynamic(() => import('./TDF407'), {
    loading: () => <p>Loading</p>,
  })
  const TDF501 = dynamic(() => import('./TDF501'), {
    loading: () => <p>Loading</p>,
  })
  const TDF502 = dynamic(() => import('./TDF502'), {
    loading: () => <p>Loading</p>,
  })
  const TDF601 = dynamic(() => import('./TDF601'), {
    loading: () => <p>Loading</p>,
  })
  const TDF602 = dynamic(() => import('./TDF602'), {
    loading: () => <p>Loading</p>,
  })
  const TDF603 = dynamic(() => import('./TDF603'), {
    loading: () => <p>Loading</p>,
  })
  const TDF701 = dynamic(() => import('./TDF701'), {
    loading: () => <p>Loading</p>,
  })

  // const submitData = async (values, { setSubmitting }) => {
  //   const body = { values }

  //   fetch('/api/post/newTDFDesignPhases', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body),
  //   })

  //   setSubmitting(false)
  //   toast.success('saved ', { position: 'bottom-right' })
  //   console.log('tdfSubmit', values)
  // }

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    console.log('val TDF mail', body)
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
        }

        setSubmitting(false)
        console.log('TDF created', values)
      } catch (error) {
        console.error(error)
      }
    } else {
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
    switch (activePhase) {
      case 10:
      case 100:
      case 200:
      case 300:
      case 400:
      case 500:
      case 600:
      case 700:
        return (
          <TDFHeaders props={props} values={values} activePhase={activePhase} />
        )

      case 11:
        return (
          <TDF11
            props={props}
            values={values}
            content={content}
            activePhase={activePhase}
          />
        )
      case 101:
        return (
          <TDF101 props={props} values={values} activePhase={activePhase} />
        )
      case 102:
        return (
          <TDF102 props={props} values={values} activePhase={activePhase} />
        )
      case 103:
        return (
          <TDF103 props={props} values={values} activePhase={activePhase} />
        )
      case 201:
        return (
          <TDF201 props={props} values={values} activePhase={activePhase} />
        )
      case 202:
        return (
          <TDF202 props={props} values={values} activePhase={activePhase} />
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
      // case 405:
      //   return (
      //     <TDF405 props={props} values={values} activePhase={activePhase} />
      //   )
      // case 406:
      //   return (
      //     <TDF406 props={props} values={values} activePhase={activePhase} />
      //   )
      case 407:
        return (
          <TDF407 props={props} values={values} activePhase={activePhase} />
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
      case 601:
        return (
          <TDF601 props={props} values={values} activePhase={activePhase} />
        )
      case 602:
        return (
          <TDF602 props={props} values={values} activePhase={activePhase} />
        )
      case 603:
        return <TDF603 props={props} activePhase={activePhase} />
      case 701:
        return (
          <TDF701 props={props} values={values} activePhase={activePhase} />
        )
      default:
        return (
          <TDF101 props={props} values={values} activePhase={activePhase} />
        )
    }
  }

  return (
    <div className="mt-5 mb-5 flex">
      <div className="w-1/6">
        <TDFSideBar
          designPhases={props.designPhases}
          changePhase={handlePhaseChange}
          activePhase={activePhase}
        />
      </div>
      <div className="w-5/6">
        <Formik
          initialValues={initialValues}
          onSubmit={submitData}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <FormAutoSave />
              <FieldArray
                name="DesignElement"
                render={() => <div>{renderSwitch(values, setFieldValue)}</div>}
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
      <Toaster />
    </div>
  )
}
