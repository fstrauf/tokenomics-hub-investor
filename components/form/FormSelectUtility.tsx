// import { FieldProps } from "formik";
import React from 'react'
import Select from 'react-select'
import { supplyDemandType } from '../../lib/helper'

const FormSelectUtilty = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = 'Select or create',
  templates,
  index,
}) => {
  console.log("🚀 ~ file: FormSelectUtility.tsx:15 ~ field:", field)
  console.log("🚀 ~ file: FormSelectUtility.tsx:15 ~ templates:", templates)
  function onChange(option) {
    form.setFieldValue(field.name, option ? option : {})
  }

  if (!isMulti) {
    return (
      <Select
        options={options.value}
        name={field.name}
        value={
          options
            ? options.value.find((option) => option.value === field.value)
            : ''
        }
        onChange={(option) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
        placeholder={placeholder}
      />
    )
  } else if (field.name.split('.')[2] == 'mechanismType') {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        defaultValue={options.value[index]}
        options={templates?.filter((option) => {
          return option.supplyDemandType == supplyDemandType.demandMechanism
        })}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => filterLabel(option)}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        // isMulti={true}
        placeholder={placeholder}
      />
    )
  } else if (field.name.split('.')[2] == 'incentiveTarget') {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        options={options.value.filter((option) => {
          return option.supplyDemandType == supplyDemandType.supplyExternal
        })}
        getOptionValue={(option) => filterIncentiveLabel(option)}
        getOptionLabel={(option) => filterIncentiveLabel(option)}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        //isMulti={true}
        placeholder={placeholder}
      />
    )
  } else {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        defaultValue={options.value[index]}
        options={templates?.filter((option) => {
          return option.supplyDemandType == supplyDemandType.demandUtility
        })}
        getOptionValue={(option) =>filterLabel(option)}
        getOptionLabel={(option) => filterLabel(option)}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        //isMulti={true}
        placeholder={placeholder}
      />
    )
  }

  function filterLabel(options) {
    if (options.name.replace(/[0-9]/g, '').trim() === 'Default') {
      return ''
    }
    return options.name.replace(/[0-9]/g, '').trim()
  }
  function filterIncentiveLabel(options) {
    return (
      options.percentageAllocation +
      '% ' +
      options.name.replace(/[0-9]/g, '').trim()
    )
  }
}

export default FormSelectUtilty
