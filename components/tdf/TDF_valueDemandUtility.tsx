import { Field, useFormikContext } from 'formik'
import ResourceSection from './ResourceSection'
import React, { useEffect } from 'react'
import FormText from '../form/FormText'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'
import BreakdownBox from '../slugView/breakdown-box'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import FormGenerateButton from './FormGenerateButton'
import FormFormatButton from './FormFormatButton'
import WalkthroughSection from './WalkthroughSection'
import FormErrorMessage from '../form/FormErrorMessage'

export default function TDF_valueDemandUtility({
  props,
  values,
  activePhase,
  reviewRequiredFields,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, '801', setFieldValue)
  }, [])

  let ExampleDetail = ({ onGoBack, example, exampleField }) => {
    return (
      <div className="flex flex-col justify-between">
        <div className="mb-6 mt-6 font-bold">{example?.title}</div>
        <BreakdownBox value={example['valueCapture']} title="Value Capture:" />
        <BreakdownBox value={example['tokenUtility']} title="Token Utility:" />
        <BreakdownBox
          value={example['demandDrivers']}
          title="Demand Drivers:"
        />
        <button
          className="mt-20 w-16 rounded-md border-2 border-dao-red px-1 py-1 text-xs font-medium text-dao-red"
          onClick={onGoBack}
        >
          go back
        </button>
      </div>
    )
  }

  const valueCaptureFormat = `Value accrual to token (if any)
  [briefly explain any mechanism that allow token to map the value created]
  
  Value accrual to protocol (if any)
  [briefly explain any ways in which value is directed back to the protool itself, normally to the treasury]`
  const utilityFormat = `$Token 1
  - Utility Name
  [brief explanation of the utility] 
  
  $Token 2
  - Utility Name
  [brief explanation of the utility] `
  const demandDriversFormat = `Demand Name 1
  [explain who is buying/holding this token and why]
  
  Demand Name 2
  [explain who is buying/holding this token and why]`

  return (
    <div className="flex flex-col rounded-lg border-2 p-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase?.name}
      </h5>

      <div className="mb-6 flex gap-4">
        <div className="basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Value Capture
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            How does (or does not) the protocol and/or its token capture/reflect
            the value it creates?
          </p>
          <div className="flex gap-2">
            <FormFormatButton
              text={values['valueCapture']}
              format={valueCaptureFormat}
              scope="valueCapture"
              setFieldValue={setFieldValue}
            />
            <FormGenerateButton
              title={values.title}
              scope="valueCapture"
              setFieldValue={setFieldValue}
            />
            <FormErrorMessage
              field="valueCapture"
              reviewRequiredFields={reviewRequiredFields}
            />
          </div>
        </div>
        <Field
          name="valueCapture"
          as={FormText}
          rows={8}
          placeholder={valueCaptureFormat}
        />
      </div>

      <div className="mb-6 flex gap-4">
        <div className="basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Token Utility
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            Describe what the token is used for and the role it plays within the
            protocol
          </p>
          <div className="flex gap-2">
            <FormFormatButton
              text={values['tokenUtility']}
              format={utilityFormat}
              scope="tokenUtility"
              setFieldValue={setFieldValue}
            />
            <FormGenerateButton
              title={values.title}
              scope="tokenUtility"
              setFieldValue={setFieldValue}
            />
            <FormErrorMessage
              field="tokenUtility"
              reviewRequiredFields={reviewRequiredFields}
            />
          </div>
        </div>
        <Field
          name="tokenUtility"
          as={FormText}
          rows={8}
          placeholder={utilityFormat}
        />
      </div>

      <div className="mb-6 flex gap-4">
        <div className="basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Demand Drivers
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            What is the demand for the token, why will people buy it (or not)?
          </p>
          <div className="flex gap-2">
            <FormFormatButton
              text={values['demandDrivers']}
              format={demandDriversFormat}
              scope="demandDrivers"
              setFieldValue={setFieldValue}
            />
            <FormGenerateButton
              title={values.title}
              scope="demandDrivers"
              setFieldValue={setFieldValue}
            />
            <FormErrorMessage
              field="demandDrivers"
              reviewRequiredFields={reviewRequiredFields}
            />
          </div>
        </div>
        <Field
          name="demandDrivers"
          as={FormText}
          rows={8}
          placeholder={demandDriversFormat}
        />
      </div>
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        // content={props.posts}
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
