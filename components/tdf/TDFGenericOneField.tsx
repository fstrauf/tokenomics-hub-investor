import { Field } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'

export default function TDFGenericOneField({
  props,
  activePhase,
  placeholder,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <Field
        as="textarea"
        rows="6"
        name={designPhase.postDataElement}
        placeholder={placeholder}
        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
      />
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        content={props.posts}
        exampleField={designPhase.postDataElement}
      />
    </div>
  )
}
