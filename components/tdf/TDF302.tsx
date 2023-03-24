import { Field } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTablePivot'
import { getActiveDesignPhase } from '../../lib/helper'
// import ExampleSection from './ExampleSection'

export default function TDF302({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
        <Field
          as="textarea"
          rows="4"
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhaseId === 302 //should all use the same db field.
          )}.content`}
          users={values?.PostUser || []}
          component={FormTable}
          placeholder="tell us about your requirements"
          phaseId={designPhase.phaseId}
          // className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        />
      </div>
      <ResourceSection content={designPhase.Resources} />
      {/* <ExampleSection
        content={props.posts}
        exampleField={designPhase.postDataElement}
        exampleDetail={null}
      /> */}
    </div>
  )
}
