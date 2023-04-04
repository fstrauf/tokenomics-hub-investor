import { getActiveDesignPhase } from '../../lib/helper'
import ResourceSection from './ResourceSection'

export default function TDF701({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <ResourceSection content={designPhase.Resources} />
    </div>
  )
}
