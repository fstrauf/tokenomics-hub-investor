import {
  Field,
  FieldArray,
  useFormikContext,
  // useFormik,
  // ErrorMessage,
  // Formik,
  // Form,
} from 'formik'
import React from 'react'

import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { supplyDemandType } from '../../lib/helper'
import { DemandUtility, DemandMechanism } from '../supplyDemandType/SupplyType'
import { useState } from 'react'

export const MechanismCardDemand = ({
  field,
  values,
  mechanismIndex,
  // setFieldValue,
  // users,
  templates,
}) => {
  console.log('🚀 ~ file: MechanismCardDemand.tsx:24 ~ values:', values)
  console.log('🚀 ~ file: MechanismCardDemand.tsx:24 ~ field:', field)
  // const isSink = field.value[mechanismIndex]?.isSink || false

  const { setFieldValue } = useFormikContext()

  let isUtility = false

  if (
    field.value[mechanismIndex]?.supplyDemandType ===
    supplyDemandType.demandUtility
  ) {
    isUtility = true
  }

  // const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  // const secondsPerMonth = 2628000
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState('Create Spreadsheet')
  const [name_, setName_] = useState('Upload Spreadsheet')

  const [url, setUrl] = useState(null)

  let propsOfUtilityDemand = {
    field,
    values,
    mechanismIndex,
    name,
    name_,
    templates,
    disabled,
    url,
    setName,
    setName_,
    setUrl,
    setDisabled,
    setFieldValue,
  }

  return (
    <div
      key={mechanismIndex}
      className="ml-20 mr-20 flex max-w-2xl flex-col p-4"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isUtility ? <>Utility</> : <>Mechanisms</>}
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
      {isUtility ? (
        <DemandUtility {...propsOfUtilityDemand} />
      ) : (
        <DemandMechanism {...propsOfUtilityDemand} />
      )}
    </div>
  )
}

export default MechanismCardDemand
