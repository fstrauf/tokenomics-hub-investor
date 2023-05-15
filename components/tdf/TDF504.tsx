import { Field } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardDemand from '../form/FormCardDemand'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
// import TDFCalculator from './TDFCalculator'
import Tiptap from '../TipTap'
import ExampleSection from './ExampleSection'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import WalkthroughSection from './WalkthroughSection'
import FormErrorMessage from '../form/FormErrorMessage'

export default function TDF504({
  props,
  values,
  activePhase,
  setFieldValue,
  reviewRequiredFields,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

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
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Total Supply
      </label>
      <Field
        type="number"
        name="Calculation.totalSupply"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Months
      </label>
      <Field
        type="number"
        name="Calculation.months"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Start Date
      </label>
      <Field
        type="date"
        name="Calculation.startDate"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
      />
      <Field
        name="Mechanism"
        component={FormCardDemand}
        phaseId={designPhase.phaseId}
        setFieldValue={setFieldValue}
        values={values}
        mechanismTemplates={props.mechanismTemplates}
      />
      <FormErrorMessage
        field="Mechanism"
        reviewRequiredFields={reviewRequiredFields}
      />

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
      <WalkthroughSection />
    </div>
  )
}
