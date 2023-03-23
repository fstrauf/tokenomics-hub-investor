import { Field } from 'formik'
import ResourceSection from './ResourceSection'
import React from 'react'
import FormText from '../form/FormText'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'
import BreakdownBox from '../slugView/breakdown-box'

export default function TDF407({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

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

  return (
    <div className="grid w-full  gap-2 rounded-lg border-2 p-2">
      <div className="col-span-1">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase?.name}
        </h5>
      </div>

      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Value Capture
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            How does (or does not) the protocol and/or its token capture/reflect
            the value it creates?
          </p>
        </div>
        <Field name="valueCapture" as={FormText} placeholder="Value Capture" />
      </div>

      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Token Utility
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            Describe what the token is used for and the role it plays within the
            protocol
          </p>
        </div>
        <Field name="tokenUtility" as={FormText} placeholder="Token Utility" />
      </div>

      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Demand Drivers
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            What is the demand for the token, why will people buy it (or not)?
          </p>
        </div>
        <Field
          name="demandDrivers"
          as={FormText}
          placeholder="Demand Drivers"
        />
      </div>
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        content={props.posts}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
    </div>
  )
}
