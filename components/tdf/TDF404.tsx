import { Field, useFormikContext } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTablePivot'
import { getActiveDesignPhase } from '../../lib/helper'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'

export default function TDF404({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
        <Field
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhasesId.toString() === '302'
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
