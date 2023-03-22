// import { FieldProps } from "formik";
import React from 'react'

const FormNormalSelect = ({ field, form, options, placeholder }) => {
  function onChange(e) {
    // let data = Array.from(props.data);
    form.setFieldValue(field.name, e.target.value)
  }

  return (
    <select
      style={{
        fontSize: '12px',
        border: '1px solid lightgray',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
      }}
      name={field.name}
      id={field.id}
      value={field.value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option?.id} value={option?.name}>
          {option?.name}
        </option>
      ))}
    </select>
  )
}

export default FormNormalSelect
