import { Field, FieldArray, useFormikContext } from 'formik'
import React, { useState } from 'react'
import FormSelectUser from '../form/FormSelectUser'
import FormTipTap from '../form/FormTipTap'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { supplyDemandType } from '../../lib/helper'
import {
  SupplyInternal,
  SupplyExternal,
  DemandUtility,
  DemandMechanism,
} from '../supplyDemandType/SupplyType'

export const MechanismCardSupplyvsDemand = ({
  values,
  field,
  mechanismIndex,
  //setFieldValue,
  users,
  templates,
}) => {
  //   const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  console.log('field =======', field.value[mechanismIndex])
  console.log('mechanaism index = ', mechanismIndex)
  console.log('values ==== ', values)
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState('Create Spreadsheet')
  const [name_, setName_] = useState('Upload Spreadsheet')
  const [url, setUrl] = useState('')

  let sCurrentTab = field.value[mechanismIndex]?.supplyDemandType
  const { setFieldValue } = useFormikContext()

  function returnsTab(tab) {
    let propsOfInternalExternal = {
      field,
      values,
      mechanismIndex,
    }
    let propsOfUtilityDemand = {
      field,
      values,
      mechanismIndex,
      name,
      name_,
      templates,
      url,
      disabled,
      setName,
      setName_,
      setUrl,
      setDisabled,
      setFieldValue,
    }
    switch (tab) {
      case 'supplyInternal':
        return <SupplyInternal {...propsOfInternalExternal} />
      case 'supplyExternal':
        return <SupplyExternal {...propsOfInternalExternal} />
      case 'demandUtility':
        return <DemandUtility {...propsOfUtilityDemand} />
      case 'demandMechanism':
        return <DemandMechanism {...propsOfUtilityDemand} />
    }
  }

  function returnsTabName(tab) {
    switch (tab) {
      case 'supplyInternal':
        return 'Internal Allocation'
      case 'supplyExternal':
        return 'External Allocation'
      case 'demandUtility':
        return 'Utility'
      case 'demandMechanism':
        return 'Mechanism'
    }
  }

  if (
    sCurrentTab == supplyDemandType.supplyInternal ||
    sCurrentTab == supplyDemandType.supplyExternal
  ) {
    return (
      <div
        key={mechanismIndex}
        className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {returnsTabName(sCurrentTab)}
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
        />

        {returnsTab(sCurrentTab)}
      </div>
    )
  }
  return (
    <div
      key={mechanismIndex}
      className="ml-20 mr-20 flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {returnsTabName(sCurrentTab)}
      </h5>
      <label className="block text-sm font-medium text-gray-900 ">Name</label>
      <Field
        name={`${field.name}.${mechanismIndex}.name`}
        placeholder="Name"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">
        Summary
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.summary`}
        placeholder="Summary"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        as="textarea"
        rows={4}
      />
      {returnsTab(sCurrentTab)}
    </div>
  )
}

export default MechanismCardSupplyvsDemand
