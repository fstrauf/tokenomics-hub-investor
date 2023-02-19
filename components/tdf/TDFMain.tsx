import TDFSideBar from './TDFSideBar'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
// import TDF101 from './TDF101'
// import TDF102 from './TDF102'
// import TDF103 from './TDF103'

export default function TDFMain({ props, content }) {
  // console.log('🚀 ~ file: tdfMain.tsx:9 ~ TDFMainx ~ props', props)
  const [activePhase, setActivePhase] = useState(101) //props.design.activePhase

  const initialValues = content
  function handlePhaseChange(phase) {
    setActivePhase(phase)
  }

  const TDF101 = dynamic(() => import('./TDF101'), {
    loading: () => <p>Loading</p>,
  })
  const TDF102 = dynamic(() => import('./TDF102'), {
    loading: () => <p>Loading</p>,
  })
  const TDF103 = dynamic(() => import('./TDF103'), {
    loading: () => <p>Loading</p>,
  })

  const submitData = async (values, { setSubmitting }) => {
    console.log(values)
    // const body = { values }

    // fetch('/api/post/updateTDFDesignPhases', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // })

    // setSubmitting(false)
    // toast.success('saved ', { position: 'bottom-right' })
  }

  function renderSwitch(values) {
    switch (activePhase) {
      case 101:
        return <TDF101 props={props} values={values} />
      case 102:
        return <TDF102 props={props} />
      case 103:
        return <TDF103 props={props} />
      default:
        return <TDF101 props={props} values={values} />
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
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <FieldArray
              name="DesignElement"
              render={() => 
              <div>{renderSwitch(values)}</div>
            }
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
  )
}
