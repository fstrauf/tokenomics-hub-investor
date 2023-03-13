import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelect from '../form/FormSelect'

export const MechanismCard = ({
  field,
  mechanismIndex,
  // mechanismImpactFactors,
}) => {
  const impactFactors = (input, factorIndex, arrayHelpers) => {
    return (
      <>
        <tr key={factorIndex} className="border-b bg-white text-xs font-normal">
          <th scope="row" className="whitespace-nowrap text-gray-900 ">
            {' '}
            {/* <Field
              className="custom-select"
              name={`${field.name}.${mechanismIndex}.impactFactors.${factorIndex}.factor`}
              options={mechanismImpactFactors}
              component={FormSelect}
              placeholder="Select impact factors"
              isMulti={true}
            /> */}
          </th>
          <td className="">
            {' '}
            <Field
              name={`${field.name}.${mechanismIndex}.impactFactors.${factorIndex}.isDynamic`}
              //   placeholder="label"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              //   rows={4}
              type="checkbox"
            />
          </td>

          <td>
            <Field
              name={`${field.name}.${mechanismIndex}.impactFactors.${factorIndex}.impactOnQuantity`}
              placeholder="impactOnQuantity"
              className="block w-80 text-xs rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              as="textarea"
            />
          </td>

          <td>
            <button
              type="button"
              className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
              onClick={() => arrayHelpers.remove(factorIndex)}
            >
              <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
                <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
              </svg>
            </button>
          </td>
        </tr>
      </>
    )
  }

  return (
    <div className="flex flex-col p-4">
      <label className="block text-sm font-medium text-gray-900 ">User</label>
      <Field
        name={`${field.name}.${mechanismIndex}.user`}
        placeholder="User"
        className="block text-xs rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">
        Mechanism Name
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.mechanism`}
        placeholder="Mechanism Name"
        className="block text-xs rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">
        Describe the mechanism
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.description`}
        placeholder="Describe the mechanism"
        className="block text-xs rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        rows={4}
        as="textarea"
      />
      <label className="mb-2 block text-sm font-medium text-gray-900 ">
        Is this mechanism a sink? (taking tokens out of circulation)
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.isSink`}
        placeholder="Is this mechanism a sink? (taking tokens out of circulation)"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="checkbox"
      />
      <label className="mb-2 block text-sm font-medium text-gray-900 ">
        What impacts token Quantity?
      </label>
      <FieldArray
        name={`${field.name}.${mechanismIndex}.impactFactors`}
        render={(arrayHelpers) => (
          <>
            <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700">
                <tr>
                  <th scope="col" className="py-3">
                    Factor
                  </th>
                  <th scope="col" className="py-3">
                    Dynamic?
                  </th>
                  <th scope="col" className="py-3">
                    Impact on quantity
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {field.value[mechanismIndex]?.impactFactors?.length > 0 &&
                  field.value[mechanismIndex]?.impactFactors?.map(
                    (input, factorIndex) => (
                      <>{impactFactors(input, factorIndex, arrayHelpers)}</>
                    )
                  )}
              </tbody>
            </table>
            <button
              type="button"
              className="mt-3 mr-3 w-36 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() =>
                arrayHelpers.push({
                  factor: '',
                  isDynamic: true,
                  impactOnQuantity: '',
                })
              }
            >
              Add Row
            </button>
          </>
        )}
      />
    </div>
  )
}

export default MechanismCard
