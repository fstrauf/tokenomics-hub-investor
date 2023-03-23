import { Field, FieldArray } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import FormTable from '../form/FormTablePivot'
import { getActiveDesignPhase } from '../../lib/helper'
import FormText from '../form/FormText'
import { FormAddUser } from '../form/FormAddUser'

export default function TDF301({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  return (
    <div className="flex w-full flex-col rounded-lg border-2 p-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <ResourceSection content={designPhase.Resources} />

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Users
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          List of users.
        </p>
        <FormAddUser values={values} />
      </div>

    </div>
  )
}
