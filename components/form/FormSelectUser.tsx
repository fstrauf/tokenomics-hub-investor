import React from 'react'
import Select from 'react-select/creatable'

const FormSelectUser = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = 'Select or create',
}) => {
  console.log("🚀 ~ file: FormSelectUser.tsx:11 ~ options:", options)
  
  function onChange(option) {
    console.log("🚀 ~ file: FormSelectUser.tsx:12 ~ onChange ~ option:", option)
    console.log("🚀 ~ file: FormSelectUser.tsx:11 ~ field:", field.name)
    form.setFieldValue(field.name, option ? option.map((item) => item) : [])
  }

  if (!isMulti) {
    return (
      <Select
        options={options}
        name={field.name}
        value={
          options ? options.find((option) => option.value === field.value) : ''
        }
        onChange={(option) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
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
        // value={options ? options.find(option => option.name === field.value) : ''}
        onChange={onChange}
        options={options}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        getNewOptionData={(value, label) => ({
          id: value,
          name: label,
          __isNew__: true,
        })}
        isMulti={true}
        placeholder={placeholder}
      />
    )
  }
}

export default FormSelectUser
