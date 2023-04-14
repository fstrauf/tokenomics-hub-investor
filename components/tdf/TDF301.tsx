import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import { FormAddUser } from '../form/FormAddUser'
import ExampleSection from './ExampleSection'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'

export default function TDF301({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Users
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          List of users.
        </p>
        <FormAddUser values={values} />
      </div>
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        // content={props.posts}
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={null}
      />
    </div>
  )
}
