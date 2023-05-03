import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { getActiveDesignPhase } from '../../lib/helper'
import FormTimeLine from '../form/FormTimeLine'
import ResourceSection from './ResourceSection'
import WalkthroughSection from './WalkthroughSection'

export default function TDF901({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>

      <div className="m-1 mb-6">
        <p className="mb-2 text-xs font-extralight text-gray-500">
          List the major milestones of the token.
        </p>
        <FormTimeLine values={values} />
      </div>
      {/* <ResourceSection content={designPhase.Resources} /> */}
      <WalkthroughSection />
    </div>
  )
}
