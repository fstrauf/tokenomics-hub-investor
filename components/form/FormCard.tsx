import { Field, FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'

// const defaultUsers = [
//   {
//     user: 'Liquidity Provider',
//     task: 'provide liquidity',
//     why: 'collect fees on idle capital',
//     valueCreation: 'provide deep liquidity on a variety of assets',
//     behaviour: 'dont churn to another AMM for better fees',
//     incentive: 'reward early liquidity',
//     mechanism1:
//       'Bootstrap the liquidity provisioning by paying an early reward via tokens to liquidity providers.',
//     mechanism2:
//       'Running this process for too long, will create an artificial demand that is based on stimulus and not real economic activity.',
//   },
//   {
//     user: 'Liquidity Provider',
//     task: 'set fees',
//     why: 'collect fees on idle capital',
//     valueCreation: 'provide deep liquidity on a variety of assets',
//     behaviour: 'dont churn to another AMM for better fees',
//     incentive: 'reward early liquidity',
//     mechanism1:
//       'Bootstrap the liquidity provisioning by paying an early reward via tokens to liquidity providers.',
//     mechanism2:
//       'Running this process for too long, will create an artificial demand that is based on stimulus and not real economic activity.',
//   },
// ]

export const FormCard = ({ field, form, phaseId }) => {
  // console.log('🚀 ~ file: FormCard.tsx:33 ~ FormCard ~ field', field)
  let [isOpen, setIsOpen] = useState(false)
  let [mechanismIndex, setMechanismIndex] = useState(0)
  // if (field.value === '') {
  //   form.setFieldValue(field.name, defaultUsers)
  // }

  const handleNewMechanism = (arrayHelpers) => {
    arrayHelpers.push({
      user: '',
      mechanism: '',
      sellPressure: true,
      descriptiom: '',
      from: '',
      to: '',
      impact: '',
      more: '',
    })
    setMechanismIndex(field.value?.length)
    setIsOpen(true)
  }
  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  return (
    <div className="relative overflow-x-auto">
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <div key={4711} className="flex flex-row flex-wrap gap-2">
              {field.value?.length > 0 &&
                field.value?.map((input, index) => (
                  <div
                    key={index}
                    className="h-44 w-44 rounded-md border-2 border-dao-green"
                  >
                    <button
                      className="relative float-right"
                      onClick={() => arrayHelpers.remove(index)}
                      type="button"
                    >
                      <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                    </button>
                    <button
                      className="h-full w-full"
                      onClick={() => handleEditMechanism(index)}
                    >
                      <p className="">{input.user}</p>
                      <p className="">{input.mechanism}</p>
                      <p className="">{input.isSink}</p>
                    </button>
                  </div>
                ))}
              <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col p-4">
                  <label className="block text-sm font-medium text-gray-900 ">
                    User
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.user`}
                    placeholder="User"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    // rows={1}
                    type="text"
                  />
                  <label className="block text-sm font-medium text-gray-900 ">
                    Mechanism Name
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.mechanism`}
                    placeholder="Mechanism Name"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    type="text"
                  />
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Sell Pressure?
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.sellPressure`}
                    placeholder="Sell Pressure or Buy Pressure"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    // rows={4}
                    type="checkbox"
                  />
                  <label className="block text-sm font-medium text-gray-900 ">
                    Describe the mechanism
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.description`}
                    placeholder="Describe the mechanism"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    as="textarea"
                  />
                  <label className="block text-sm font-medium text-gray-900 ">
                    Where do tokens come from?
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.from`}
                    placeholder="Where do Tokens come from?"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    as="textarea"
                  />
                  <label className="block text-sm font-medium text-gray-900 ">
                    Who are tokens distributed to?
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.to`}
                    placeholder="Who are tokens distributed to?"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    as="textarea"
                  />
                  <label className="block text-sm font-medium text-gray-900 ">
                    Impact on other users
                  </label>
                  <Field
                    name={`${field.name}.${mechanismIndex}.impact`}
                    placeholder="Impact on other users"
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    as="textarea"
                  />
                </div>
              </Drawer>
              <button
                type="button"
                className="h-44 w-44 rounded-md border-2 border-dao-green"
                onClick={() => handleNewMechanism(arrayHelpers)}
              >
                Add Mechanism
              </button>
            </div>
            {/* <table className="mb-1 text-left text-sm text-gray-500 overflow-x-auto">
              {header}
              <tbody>
                {field.value?.length > 0 &&
                  field.value?.map((input, index) => (
                    <>{incentiveRow(input, index, arrayHelpers)}</>
                  ))}
              </tbody>
            </table> */}
          </>
        )}
      />
    </div>
  )
}

export default FormCard
