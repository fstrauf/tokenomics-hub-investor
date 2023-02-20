import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTable'

export default function TDF302({ props, values }) {
  const designPhase = props.designPhases.find((adp) => String(adp.phaseId) === '302')
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
        </h5>
        <ResourceSection content={designPhase.Resources}/>
        <Field
          as="textarea"
          rows="4"
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === 301 //should all use the same db field.
          )}.content`}
          component={FormTable}
          placeholder="tell us about your requirements"
          phaseId={designPhase.phaseId}
          // className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
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
