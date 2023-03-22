import { Field } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import TDFCalculator from './TDFCalculator'

export default function TDF502({ props, values, activePhase, setFieldValue }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
        <div className="col-span-2">
          <div>
            <Field
              name="Mechanism"
              component={FormCardSupplyDemand}
              phaseId={designPhase.phaseId}
              setFieldValue={setFieldValue}
              values={values}
              mechanismTemplates={props.mechanismTemplates}
            />
          </div>
        </div>
        <div className="col-span-2">
          <TDFCalculator
            preloadInitialValues={props.preloadInitialCalcValues}
            values={values}
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
