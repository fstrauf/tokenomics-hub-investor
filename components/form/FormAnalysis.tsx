// import { FieldProps } from "formik";
import { Field } from 'formik'
import React from 'react'
import FormText from './FormText'
// import Select from "react-select";

export const FormAnalysis = () => (
  <>
    <div className="mb-6 flex">
      <div className="basis-1/4">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Strong Points
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          Describe the strenghts of protocol and token.
        </p>
      </div>
      <Field name="strongPoints" as={FormText} placeholder="Strong Points" />
    </div>
    <div className="mb-6 flex">
      <div className="basis-1/4">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Weak Points
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          Describe the weaknesses of protocol and token.
        </p>
      </div>
      <Field name="weakPoints" as={FormText} placeholder="Weak Points" />
    </div>
    <div className="mb-6 flex">
      <div className="basis-1/4">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Problems / Solutions
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          Describe the problems the token solves.
        </p>
      </div>
      <Field
        name="problemSolution"
        as={FormText}
        placeholder="Problems / Solutions"
      />
    </div>
    <div className="mb-6 flex">
      <div className="basis-1/4">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Predecessors
        </label>
        <p className="mb-2 text-xs font-extralight text-gray-500">
          Who did the token borrow ideas from / which concepts did it evolve?
        </p>
      </div>
      <Field name="parent" as={FormText} placeholder="Predecessor" />
    </div>
  </>
)

export default FormAnalysis
