import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTable'
import { getActiveDesignPhase } from '../../lib/helper'

export default function TDF301({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <ResourceSection content={designPhase.Resources} />
      <div className="">
        <Field
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === activePhase
          )}.content`}
          component={FormTable}
          placeholder="Select categories"
          phaseId={designPhase.phaseId}
        />
      </div>
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          References
        </h5>
        {props.posts.map((post) => (
          <div key={post.id}>
            <div>{post.title}</div>
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