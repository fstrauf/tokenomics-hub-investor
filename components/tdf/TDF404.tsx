import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTablePivot'
import { getActiveDesignPhase } from '../../lib/helper'

export default function TDF404({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
          <Field
            name={`DesignElement.${values?.DesignElement?.findIndex(
              (de) => de.designPhaseId === 404
            )}.content`}
            users={values?.PostUser || []}
            component={FormTable}
            placeholder="Select categories"
            phaseId={designPhase.phaseId}
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
