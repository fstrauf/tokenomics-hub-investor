import { Field } from 'formik'
import React from 'react'
import { supplyDemandType } from '../../lib/helper'
import { SupplyInternal, SupplyExternal } from '../supplyDemandType/SupplyType'
import FormSelectUser from '../form/FormSelectUser'

export const MechanismCardSupply = ({
  field,
  mechanismIndex,
  users,
}) => {
  console.log("🚀 ~ file: MechanismCardSupply.tsx:12 ~ users:", users)
  let isInternal = false
  if (
    field.value[mechanismIndex]?.supplyDemandType ===
    supplyDemandType.supplyInternal
  ) {
    isInternal = true
  }
  let propsOfInternalExternal = {
    field,
    mechanismIndex,
  }

  return (
    <div
      key={mechanismIndex}
      className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isInternal ? <>Internal Allocation</> : <>External Allocation</>}
      </h5>
      <label className="block text-sm font-medium text-gray-900 ">Name</label>
      <Field
        name={`${field.name}.${mechanismIndex}.name`}
        placeholder="Name"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />

      <label className="block text-sm font-medium text-gray-900 ">User</label>
      <Field
        className="custom-select"
        name={`${field.name}.${mechanismIndex}.PostUser`}
        options={users}
        component={FormSelectUser}
        placeholder="Select Users"
        isMulti={true}
        // onChange={(e) => {
        //   const { value } = e.target
        //   setFieldValue('PostUser', value)
        // }}
      />

      {isInternal ? (
        <SupplyInternal {...propsOfInternalExternal} />
      ) : (
        <SupplyExternal {...propsOfInternalExternal} />
      )}
    </div>
  )
}

export default MechanismCardSupply
