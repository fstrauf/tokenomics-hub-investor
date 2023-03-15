import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'
import { FormTable } from '../form/FormTable'

//taking stock
export default function TDF501({ props, values, activePhase, setFieldValue }) {
  // console.log("🚀 ~ file: TDF501.tsx:10 ~ TDF501 ~ values:", values)
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
        <div className="">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Incentive Summary
          </h5>
          <Field
            name={`DesignElement.${values?.DesignElement?.findIndex(
              (de) => de.designPhaseId === 301
            )}.content`}
            component={FormTable}
            placeholder="Select categories"
            phaseId={designPhase.phaseId}
          />
        </div>
        <div>
          <Field
            name="Mechanism"
            component={FormCardSupplyDemand}
            // placeholder="Select categories"
            phaseId={designPhase.phaseId}
            setFieldValue={setFieldValue}
            values={values}
            mechanismTemplates={props.mechanismTemplates}
            // mechanismImpactFactors={props.mechanismImpactFactors}
          />
        </div>

        <div className="">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Resources
          </h5>
          <ResourceSection content={designPhase.Resources} />
        </div>
        <div className="">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Examples
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
    </div>
  )
}
