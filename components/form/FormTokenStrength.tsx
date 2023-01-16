// import { FieldProps } from "formik";
import { Field } from 'formik'
import React from 'react'
import FormErrorMessage from './FormErrorMessage'
import FormText from './FormText'
// import Select from "react-select";

export const FormTokenStrength = ({ reviewRequiredFields }) => {
  // console.log("🚀 ~ file: FormTokenStrength.tsx:9 ~ FormTokenStrength ~ reviewRequiredFields", reviewRequiredFields)
  return (
    <>
      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Token Utility
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            Describe what the token is used for and the role it plays within the
            protocol
          </p>
          <FormErrorMessage
            field="tokenUtility"
            reviewRequiredFields={reviewRequiredFields}
          />
        </div>
        <Field name="tokenUtility" as={FormText} placeholder="Token Utility" />
        <div className="ml-3">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            Strength
          </label>
          <Field
            type="number"
            name="tokenUtilityStrength"
            className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
      </div>
      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Business Model
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            How does the protocol make money?
          </p>
          <FormErrorMessage
            field="businessModel"
            reviewRequiredFields={reviewRequiredFields}
          />
        </div>
        <Field
          name="businessModel"
          as={FormText}
          placeholder="Business Model"
        />
        <div className="ml-3">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Strength
          </label>
          <Field
            type="number"
            name="businessModelStrength"
            className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
      </div>
      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Value Creation
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            What is the value created by the protocol?
          </p>
          <FormErrorMessage
            field="valueCreation"
            reviewRequiredFields={reviewRequiredFields}
          />
        </div>
        <Field
          name="valueCreation"
          as={FormText}
          placeholder="Value Creation"
        />
        <div className="ml-3">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Strength
          </label>
          <Field
            type="number"
            name="valueCreationStrength"
            className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
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
          <FormErrorMessage
            field="valueCapture"
            reviewRequiredFields={reviewRequiredFields}
          />
        </div>
        <Field name="valueCapture" as={FormText} placeholder="Value Capture" />
        <div className="ml-3">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Strength
          </label>
          <Field
            type="number"
            name="valueCaptureStrength"
            className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
      </div>
      <div className="mb-6 flex">
        <div className="mr-1 basis-1/4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Demand Drivers
          </label>
          <p className="mb-2 text-xs font-extralight text-gray-500">
            What is the demand for the token, why will people buy it (or not)?
          </p>
          <FormErrorMessage
            field="demandDrivers"
            reviewRequiredFields={reviewRequiredFields}
          />
        </div>
        <Field
          name="demandDrivers"
          as={FormText}
          placeholder="Demand Drivers"
        />
        <div className="ml-3">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Strength
          </label>
          <Field
            type="number"
            name="demandDriversStrength"
            className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          />
        </div>
      </div>
    </>
  )
}

export default FormTokenStrength
