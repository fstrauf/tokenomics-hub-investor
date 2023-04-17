import { Field, FieldArray } from 'formik'
import React from 'react'
import FormNormalSelect from './FormNormalSelect'

const defaultUsers = [
  {
    user: 'user1',
    task: 'provide liquidity',
    why: 'collect fees on idle capital',
    valueCreation: 'provide deep liquidity on a variety of assets',
    behaviour: 'dont churn to another AMM for better fees',
    incentive: 'reward early liquidity',
    mechanism1:
      'Bootstrap the liquidity provisioning by paying an early reward via tokens to liquidity providers.',
    mechanism2:
      'Running this process for too long, will create an artificial demand that is based on stimulus and not real economic activity.',
  },
  {
    user: 'user2',
    task: 'set fees',
    why: 'collect fees on idle capital',
    valueCreation: 'provide deep liquidity on a variety of assets',
    behaviour: 'dont churn to another AMM for better fees',
    incentive: 'reward early liquidity',
    mechanism1:
      'Bootstrap the liquidity provisioning by paying an early reward via tokens to liquidity providers.',
    mechanism2:
      'Running this process for too long, will create an artificial demand that is based on stimulus and not real economic activity.',
  },
]

export const FormTablePivot = ({ field, form, phaseId, users }) => {

  if (field.value === '') {
    form.setFieldValue(field.name, defaultUsers)
  }

  const header = (
    <thead className="bg-gray-50 text-xs text-gray-700">
      <tr>
        <th scope="col" className="py-3">
          User
        </th>
        <th scope="col" className="py-3">
          Task
        </th>
        {phaseId > 301 ? (
          <th className="w-16 text-xs text-gray-700">Motivation</th>
        ) : (
          <></>
        )}
        {phaseId > 302 ? (
          <th className="w-16 text-xs text-gray-700">Value Creation</th>
        ) : (
          <></>
        )}
        {phaseId > 303 ? (
          <th className="w-16 text-xs text-gray-700">Behaviour</th>
        ) : (
          <></>
        )}
        {phaseId > 401 ? (
          <th className="text- w-16 text-gray-700">Incentives</th>
        ) : (
          <></>
        )}
        {phaseId > 402 ? (
          <th className="w-16 text-xs text-gray-700">Mechanism</th>
        ) : (
          <></>
        )}
        {phaseId > 403 ? (
          <th className="w-16 text-xs text-gray-700">Side Effects</th>
        ) : (
          <></>
        )}
        <th></th>
      </tr>
    </thead>
  )

  const incentiveRow = (input, index, arrayHelpers) => {
    return (
      <>
        <tr key={index} className="border-b bg-white text-xs font-normal">
          <th scope="row" className="whitespace-nowrap text-gray-900 ">
            <Field
              className="rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              name={`${field.name}.${index}.user`}
              options={users}
              component={FormNormalSelect}
              placeholder="Select Users"
            />
          </th>
          <td className="">
            <Field
              name={`${field.name}.${index}.task`}
              placeholder="task"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              as="textarea"
            />
          </td>
          {phaseId > 301 ? (
            <td>
              <Field
                name={`${field.name}.${index}.why`}
                placeholder="why"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          {phaseId > 302 ? (
            <td>
              <Field
                name={`${field.name}.${index}.valueCreation`}
                placeholder="valueCreation"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          {phaseId > 303 ? (
            <td>
              <Field
                name={`${field.name}.${index}.behaviour`}
                placeholder="behaviour"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          {phaseId > 401 ? (
            <td>
              <Field
                name={`${field.name}.${index}.incentive`}
                placeholder="incentive"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          {phaseId > 402 ? (
            <td>
              <Field
                name={`${field.name}.${index}.mechanism1`}
                placeholder="mechanism1"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          {phaseId > 403 ? (
            <td>
              <Field
                name={`${field.name}.${index}.mechanism2`}
                placeholder="mechanism2"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                as="textarea"
              />
            </td>
          ) : (
            <></>
          )}
          <td>
            <button
              type="button"
              className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
              onClick={() => arrayHelpers.remove(index)}
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
    <div className="relative overflow-x-auto">
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            {/* <div
              className={`${
                phaseId === 301
                  ? 'grid-rows-3'
                  : phaseId > 403
                  ? 'grid-rows-9'
                  : phaseId > 402
                  ? 'grid-rows-8'
                  : phaseId > 401
                  ? 'grid-rows-7'
                  : phaseId > 303
                  ? 'grid-rows-6'
                  : phaseId > 302
                  ? 'grid-rows-5'
                  : phaseId > 301
                  ? 'grid-rows-4'
                  : ''
              } grid auto-cols-min grid-flow-col max-w-4xl overflow-x-auto`}
            >
                            <table className="mb-1 text-left text-sm text-gray-500 overflow-x-auto">

                {header}
                <tbody>
                {field.value?.length > 0 &&
                  field.value?.map((input, index) => (
                    <>{incentiveRow(input, index, arrayHelpers)}</>
                  ))}
              </tbody>
            </table>
            </div> */}
            <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
              {header}
              <tbody>
                {field?.value?.length > 0 &&
                  field?.value?.map((input, index) => (
                    <>{incentiveRow(input, index, arrayHelpers)}</>
                  ))}
              </tbody>
            </table>

            <button
              type="button"
              className="mt-3 mr-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() =>
                arrayHelpers.push({
                  user: 'Treasury',
                  task: 'asd',
                })
              }
            >
              Add User
            </button>
          </>
          // <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
          //   <div className="mb-3 grid grid-cols-4 gap-3">
          //     {header}
          //     {field.value?.length > 0 &&
          //       field.value?.map((input, index) => (
          //         <>{incentiveRow(input, index, arrayHelpers)}</>
          //       ))}
          //   </div>

          // </div>
        )}
      />
    </div>
  )
}

export default FormTablePivot
