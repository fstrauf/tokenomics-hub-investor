import { Field } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'

export default function TDF102({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  console.log("🚀 ~ file: TDF102.tsx:9 ~ TDF102 ~ designPhase:", designPhase)
  return (
    <div className='flex flex-col'>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
        <div className="col-span-2">
          <Field
            as="textarea"
            rows="4"
            name={`DesignElement.${values?.DesignElement?.findIndex(
              (de) => de.designPhaseId === activePhase
            )}.content`} //
            placeholder={designPhase.name}
            className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
        <ResourceSection content={designPhase.Resources} />
        <ExampleSection content={props.posts} exampleField='valueCreation' />
      </div>
    </div>
  )
}
