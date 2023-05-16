// import { FieldProps } from "formik";
import React from 'react'
import Select from 'react-select'

const FormSelectUtilty = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = 'Select or create',
  isSink,
}) => {
  const requirementOptions = [
    { id: 'Stake', name: 'Stake' },
    { id: 'Lock', name: 'Lock' },
    { id: 'Pay Tax', name: 'Pay Tax' },
    { id: 'Bond', name: 'Bond' },
    { id: 'Option', name: 'Option' },
    { id: 'Reedem', name: 'Reedem' },
  ];
  const incentiveOptions = [
    { id: '10% Trader', name: '10% Trader' },
    { id: '30% Liquidity providers', name: '30% Liquidity providers' },
    { id: '20% Token Holders', name: '30% Liquidity providers' },
    { id: '3% Airdrop', name: '3% Airdrop' },
    { id: '2% contributors', name: '2% contributors' },

  ]
  console.log('🚀 ~ file: FormSelectUtility.tsx:12 ~ options:', options)
  console.log('🚀 ~ field = ', field)
  console.log('🚀 is slink = ', isSink)
  function onChange(option) {
    form.setFieldValue(field.name, option ? option.map((item) => item) : [])
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
  } else if(field.name.split('.')[2]== 'requirement') {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        options={
          isSink
            ? requirementOptions
            : options.value.filter((option) => {
                return option.supplyDemandType == 'demandUtility'
              })
        }
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        isMulti={true}
        placeholder={placeholder}
      />
    )
  }
  else {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        options={
          isSink
            ? incentiveOptions
            : options.value.filter((option) => {
                return option.supplyDemandType == 'demandUtility'
              })
        }
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        isMulti={true}
        placeholder={placeholder}
      />
    )
  }
}

export default FormSelectUtilty
