import { Field, useFormikContext } from 'formik'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { useEffect } from 'react'
import FormGenerateButton from './FormGenerateButton'
import FormFormatButton from './FormFormatButton'

export default function TDFGenericOneField({
  props,
  activePhase,
  placeholder,
  values,
  format = null,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])
  
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
      <div className='flex gap-2'>
        {format ? (
          <FormFormatButton text={values[designPhase.postDataElement]} format={format} scope={designPhase.postDataElement} setFieldValue={setFieldValue}/>
        ) : (
          <></>
        )}
        <FormGenerateButton title={values.title} scope={designPhase.postDataElement} setFieldValue={setFieldValue} />
      </div>

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={undefined}
      />
    </div>
  )
}
