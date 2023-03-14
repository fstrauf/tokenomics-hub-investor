import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'

//taking stock
export default function TDF501({ props, values,activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
        </h5>
        <ResourceSection content={designPhase.Resources}/>
        <Field
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === 405
          )}.content`}
          component={FormCardSupplyDemand}
          placeholder="Select categories"
          phaseId={designPhase.phaseId}
          // mechanismImpactFactors={props.mechanismImpactFactors}
        />
      </div>
      
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          References
        </h5>
        {props.posts.map((post) => (
          <div>
            <div key={post.id}>{post.title}</div>
            <BreakdownBox
              value={post?.businessModel}
              strength={post?.businessModelStrength}
              title="Business Model:"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
