import { getActiveDesignPhase } from '../../lib/helper'
import ResourceSection from './ResourceSection'

export default function TDF603({ props, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="grid w-full grid-cols-1 gap-2 rounded-lg border-2 p-2">
      <div className="">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
      </div>
      <ResourceSection content={designPhase.Resources} />
    </div>
  )
}
