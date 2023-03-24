import { Field } from 'formik'
import ResourceSection from './ResourceSection'

export default function TDF701({ props, values, activePhase }) {
  const designPhase = props.designPhases.find((adp) => String(adp.phaseId) === '701')
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
    <div className="col-span-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <Field
        as="textarea"
        rows="4"
        name={`DesignElement.${values?.DesignElement?.findIndex(
          (de) => de.designPhaseId === activePhase
        )}.content`} //
        placeholder="tell us about your requirements"
        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
      />
    </div>
    <ResourceSection content={designPhase.Resources} />
    {/* <ExampleSection
      content={props.posts}
      exampleField={designPhase.postDataElement}
    /> */}
  </div>
  )
}
