import { Field, useFormikContext } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyvsDemand from '../form/FormCardSupplyvsDemand'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import TDFCalculatorSvsD from './TDFCalculatorSvsD'
import Tiptap from '../TipTap'
import ExampleSection from './ExampleSection'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import WalkthroughSection from './WalkthroughSection'
import FormErrorMessage from '../form/FormErrorMessage'

export default function TDF502({
  props,
  values,
  activePhase,
  // setFieldValue,
  reviewRequiredFields,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue, dirty } = useFormikContext()

  useEffect(() => {
    if (dirty) {
      designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
    }
  }, [dirty])

  let ExampleDetail = ({ onGoBack, example, exampleField }) => {
    return (
      <div className="flex flex-col justify-between">
        <div className="mb-6 mt-6 font-bold">{example.title}</div>
        <div className="ml-2">
          <Tiptap content={example[exampleField]} editMode={false} />
        </div>
        <button
          className="mt-20 w-16 rounded-md border-2 border-dao-red px-1 py-1 text-xs font-medium text-dao-red"
          onClick={onGoBack}
        >
          go back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>

      <TDFCalculatorSvsD values={values} />
      <Field
        name="Mechanism"
        component={FormCardSupplyvsDemand}
        phaseId={designPhase.phaseId}
        setFieldValue={setFieldValue}
        values={values}
        mechanismTemplates={props.mechanismTemplates}
        subscription={props.Subscription}
      />
      <FormErrorMessage
        field="Mechanism"
        reviewRequiredFields={reviewRequiredFields}
      />

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        // content={props.posts}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
      <WalkthroughSection />
    </div>
  )
}
