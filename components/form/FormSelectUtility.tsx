// import { FieldProps } from "formik";
import React from 'react'
import Select from 'react-select'


const FormSelectUtilty = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = 'Select or create',
  defaultValue,
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
  } else {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={field.value}
        onChange={onChange}
        defaultValue={defaultValue}
        options={options}
        getOptionValue={(option) => option.name.replace(/[0-9]/g, '').trim()}
        getOptionLabel={(option) =>  option.name.replace(/[0-9]/g, '').trim()}
        // getNewOptionData={(value, label) => ({ id: value, name: label, __isNew__: true })}
        //isMulti={true}
        placeholder={placeholder}
      />
    )
  }
}

export default FormSelectUtilty
