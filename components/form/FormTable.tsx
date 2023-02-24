import { Field, FieldArray } from 'formik'
import React from 'react'

const defaultUsers = [
  {
    user: 'Liquidity Provider',
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
    user: 'Liquidity Provider',
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

export const FormTable = ({ field, form, phaseId }) => {
  if (field.value === '') {
    form.setFieldValue(field.name, defaultUsers)
  }

  const header = (
    <>
      <div className="flex w-20 content-center bg-gray-200 text-center text-sm font-bold text-gray-700">
        <p className="m-auto">User</p>
      </div>
      <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
        <p className="m-auto">Task</p>
      </div>
      {phaseId > 301 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Motivation</p>
        </div>
      ) : (
        <></>
      )}
      {phaseId > 302 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Value Creation</p>
        </div>
      ) : (
        <></>
      )}
      {phaseId > 303 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Behaviour</p>
        </div>
      ) : (
        <></>
      )}
      {phaseId > 401 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Incentives</p>
        </div>
      ) : (
        <></>
      )}
      {phaseId > 402 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Mechanism</p>
        </div>
      ) : (
        <></>
      )}
      {phaseId > 403 ? (
        <div className="flex w-20 bg-gray-200 text-sm font-bold text-gray-700">
          <p className="m-auto">Side Effects</p>
        </div>
      ) : (
        <></>
      )}
      <div className="h-10 w-20 bg-gray-200 text-sm font-bold"></div>
    </>
  )

  const incentiveRow = (input, index, arrayHelpers) => {
    return (
      <>
        <Field
          name={`${field.name}.${index}.user`}
          placeholder="user"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs font-bold text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          as="textarea"
        />
        <Field
          name={`${field.name}.${index}.task`}
          placeholder="task"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          as="textarea"
        />
        {phaseId > 301 ? (
          <Field
            name={`${field.name}.${index}.why`}
            placeholder="why"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        {phaseId > 302 ? (
          <Field
            name={`${field.name}.${index}.valueCreation`}
            placeholder="valueCreation"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        {phaseId > 303 ? (
          <Field
            name={`${field.name}.${index}.behaviour`}
            placeholder="behaviour"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        {phaseId > 401 ? (
          <Field
            name={`${field.name}.${index}.incentive`}
            placeholder="incentive"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        {phaseId > 402 ? (
          <Field
            name={`${field.name}.${index}.mechanism1`}
            placeholder="mechanism1"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        {phaseId > 403 ? (
          <Field
            name={`${field.name}.${index}.mechanism2`}
            placeholder="mechanism2"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            as="textarea"
          />
        ) : (
          <></>
        )}
        <button
          type="button"
          className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
          onClick={() => arrayHelpers.remove(index)}
        >
          <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
          </svg>
        </button>
      </>
    )
  }

  return (
    <div className="relative overflow-x-auto">
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <div
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
              {header}
              {/* <tbody className="flex flex-row"> */}
              {field.value?.length > 0 &&
                field.value?.map((input, index) => (
                  <>{incentiveRow(input, index, arrayHelpers)}</>
                ))}
              {/* </tbody> */}
              {/* </table> */}
            </div>
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

export default FormTable
