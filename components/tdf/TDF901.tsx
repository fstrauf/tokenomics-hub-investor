import { getActiveDesignPhase } from '../../lib/helper'
import FormTimeLine from '../form/FormTimeLine'
import ResourceSection from './ResourceSection'

export default function TDF901({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>

      <div className="mb-6 m-1">
        <p className="mb-2 text-xs font-extralight text-gray-500">
          List the major milestones of the token.
        </p>
        <FormTimeLine values={values} />
      </div>
      {/* <ResourceSection content={designPhase.Resources} /> */}
    </div>
  )
}
