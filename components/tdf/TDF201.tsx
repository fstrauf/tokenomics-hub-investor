import { Field, useFormikContext } from 'formik'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { useEffect } from 'react'

export default function TDF201({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
        <Field
          as="textarea"
          rows="6"
          name={`DesignElement.${values?.DesignElement?.findIndex(
            (de) => de.designPhasesId.toString() === '201'
          )}.content`} //
          placeholder="tell us about your requirements"
          phaseId={designPhase.phaseId}
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
