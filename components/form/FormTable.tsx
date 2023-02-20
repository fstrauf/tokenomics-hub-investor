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
  console.log("🚀 ~ file: FormTable.tsx:32 ~ FormTable ~ phaseId", phaseId)
  if (field.value === '') {
    form.setFieldValue(field.name, defaultUsers)
  }

  const header = (
    <>
      <p className="text-xs font-bold uppercase text-gray-700">User</p>
      <p className="w-16 text-xs font-bold uppercase text-gray-700">Task</p>
      {phaseId > 301 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Motivation
        </p>
      )}
      {phaseId > 302 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Value Creation
        </p>
      )}
      {phaseId > 303 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Behaviour
        </p>
      )}
      {phaseId > 401 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Incentives
        </p>
      )}
      {phaseId > 402 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Mechanism
        </p>
      )}
      {phaseId > 403 ?? (
        <p className="w-16 text-xs font-bold uppercase text-gray-700">
          Side Effects
        </p>
      )}
      <p></p>
    </>
  )

  const incentiveRow = (input, index, arrayHelpers) => {
    return (
      <>
        <Field
          name={`${field.name}.${index}.user`}
          placeholder="user"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          as="textarea"
        />
        <Field
          name={`${field.name}.${index}.task`}
          placeholder="task"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          as="textarea"
        />
        {phaseId > 301 ?? (
          <Field
            name={`${field.name}.${index}.why`}
            placeholder="why"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        {phaseId > 302 ?? (
          <Field
            name={`${field.name}.${index}.valueCreation`}
            placeholder="valueCreation"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        {phaseId > 303 ?? (
          <Field
            name={`${field.name}.${index}.behaviour`}
            placeholder="behaviour"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        {phaseId > 401 ?? (
          <Field
            name={`${field.name}.${index}.incentive`}
            placeholder="incentive"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        {phaseId > 402 ?? (
          <Field
            name={`${field.name}.${index}.mechanism1`}
            placeholder="mechanism1"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        {phaseId > 403 ?? (
          <Field
            name={`${field.name}.${index}.mechanism2`}
            placeholder="mechanism2"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            as="textarea"
          />
        )}
        <button
          type="button"
          className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
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
    <div className="relative">
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
            <div className="mb-3 grid grid-cols-3 gap-3">
              {header}
              {field.value?.length > 0 &&
                field.value?.map((input, index) => (
                  <>{incentiveRow(input, index, arrayHelpers)}</>
                ))}
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
          </div>
        )}
      />
    </div>
  )
}

export default FormTable
