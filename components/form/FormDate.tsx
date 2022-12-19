// import { FieldProps } from "formik";
import React from "react";
// import Select from "react-select";

export const FormDate = (props) => {
// console.log(props)
  return (
    <input
      name={props.name}
      // placeholder=''
      type='date'
      value={new Date(props.value).toLocaleDateString('en-CA')}
      // {...props}
      onChange={props.onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
    // onChange={event => handleTimeLineChange(index, event)}
    />
  )

  //   <textarea rows="4"
  //   {...props}
  //   className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  //   maxLength="250"
  // />
};

export default FormDate;


