import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import React from 'react'
import FormErrorMessage from '../form/FormErrorMessage'
import FormText from '../form/FormText'

export default function TDF407({ props, values, activePhase }) {
  const designPhase = props.designPhases.find(
    (adp) => String(adp.phaseId) === '407',
    activePhase
  )
  return (
    <div className="grid w-full  gap-2 rounded-lg border-2 p-2">
      <div className="col-span-1">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase?.name}
        </h5>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Resources
        </label>
        <ResourceSection content={designPhase.Resources} />
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
    </div>
  )
}
