import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import FormText from '../form/FormText'

export default function TDF202({ props, values, activePhase }) {
  const designPhase = props.designPhases.find(
    (adp) => String(adp.phaseId) === '202',
    activePhase
  )
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
      </div>
      <div className="mb-6 flex">
        <Field
          name="parent"
          as={FormText}
          placeholder="Please enter text here"
        />
      </div>
    </div>
  )
}
