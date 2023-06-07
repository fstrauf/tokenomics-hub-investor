import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import WalkthroughSection from './WalkthroughSection'

export default function TDFNoField({
  props,
  activePhase,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>      
      <ResourceSection content={designPhase.Resources} />
      <WalkthroughSection />
    </div>
  )
}
