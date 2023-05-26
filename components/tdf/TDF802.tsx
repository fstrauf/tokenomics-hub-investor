import { Field, useFormikContext } from 'formik'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { getActiveDesignPhase } from '../../lib/helper'
import FormTipTap from '../form/FormTipTap'
import ResourceSection from './ResourceSection'
import ExampleSection from './ExampleSection'
import WalkthroughSection from './WalkthroughSection'

export default function TDF802({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue, dirty } = useFormikContext()

  useEffect(() => {
    if (dirty) {
      designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
    }
  }, [dirty])
  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="mb-6">
        <div className="basis-1/4">
          <p className="mb-2 text-xs font-extralight text-gray-500">
            Provide any additional information as well as Token Allocation,
            Vesting and Dsitribution information.
          </p>
        </div>
        <Field
          name="breakdown"
          as={FormTipTap}
          placeholder="Deep Dive"
          onChange={(e) => setFieldValue('breakdown', e)}
        />
      </div>
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={undefined}
      />
      <WalkthroughSection />
    </div>
  )
}
