import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import dynamic from 'next/dynamic'

export default function TDF601({ props, values,activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const Calculator = dynamic(() => import('../calculator'), {
    loading: () => <p>Loading</p>,
  })
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
        </h5>
        <ResourceSection content={designPhase.Resources}/>
        <Calculator preloadInitialValues={preloadInitialValues} />
        {/* <Field
          as="textarea"
          rows="4"
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === activePhase
          )}.content`} //
          placeholder="tell us about your requirements"
          className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        /> */}
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
