// import { FieldProps } from "formik";
import React from "react";
import Select from "react-select/creatable";

const FormSelect = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = 'Select or create'
}) => {
  function onChange(option) {

    form.setFieldValue(
      field.name,
      option ? (option).map((item) => item) : [],
    );
  }

  // const getValue = () => {
  //   console.log(JSON.stringify(options))
  //   console.log('field ' + JSON.stringify(field.value))
  //   console.log(options.find(option => option.value === field.value))
  //   if (options) {
  //     return isMulti
  //       ? options.filter((option) => field?.value?.indexOf(option.value) >= 0)
  //       : options.find((option) => option.value === field.value);
  //   } else {
  //     return isMulti ? [] : ('');
  //   }
  // };

  if (!isMulti) {
    return (
      <Select
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
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
        options={options}
        // getOptionValue={option => option.id}
        // getOptionLabel={option => option.name}
        isMulti={true}
        placeholder={placeholder}
      />
    )
  }
}

export default FormSelect;


