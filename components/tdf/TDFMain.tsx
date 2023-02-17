import TDFSideBar from './TDFSideBar'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

export default function TDFMain({ props, content }) {
  console.log('🚀 ~ file: tdfMain.tsx:9 ~ TDFMain ~ props', props)
  const [activePhase, setActivePhase] = useState(101) //props.design.activePhase

  const initialValues = content
  function handlePhaseChange(phase) {
    setActivePhase(phase)
  }

  const submitData = async (values, { setSubmitting }) => {
    const body = { values }

    fetch('/api/post/updateTDFDesignPhases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSubmitting(false)
    toast.success('saved ', { position: 'bottom-right' })
  }

  //there needs to be a step that adds a phase to the design.
  function renderSwitch() {
    switch (activePhase) {
      case 101:
        const TDF101 = dynamic(() => import('./TDF101'), {
          loading: () => <p>Loading</p>,
        })
        return <TDF101 props={props} />
      case 102:
        const TDF102 = dynamic(() => import('./TDF102'), {
          loading: () => <p>Loading</p>,
        })
        return <TDF102 props={props} />
      case 103:
        const TDF103 = dynamic(() => import('./TDF103'), {
          loading: () => <p>Loading</p>,
        })
        return <TDF103 props={props} />
      default:
        const DefaultView = dynamic(() => import('./TDF101'), {
          loading: () => <p>Loading</p>,
        })
        return <DefaultView props={props} />
    }
  }

  return (
    <div className="mt-5 mb-5 flex flex-row ">
      <Toaster />
      <TDFSideBar
        designPhases={props.designPhases}
        changePhase={handlePhaseChange}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={submitData}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>{renderSwitch()}</div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
