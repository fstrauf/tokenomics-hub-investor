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
}) => {
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
  } else if (field.name.split('.')[2] == 'requirement') {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        options={templates.filter((option) => {
          return option.supplyDemandType == supplyDemandType.demandMechanism
        })}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        // isMulti={true}
        placeholder={placeholder}
      />
    )
  } else if (field.name.split('.')[2] == 'incentive') {
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
        getOptionValue={(option) =>
          option.percentageAllocation + '% ' + option.name
        }
        getOptionLabel={(option) =>
          option.percentageAllocation + '% ' + option.name
        }
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
        options={templates.filter((option) => {
          return option.supplyDemandType == supplyDemandType.demandUtility
        })}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        //isMulti={true}
        placeholder={placeholder}
      />
    )
  }
}

export default FormSelectUtilty
