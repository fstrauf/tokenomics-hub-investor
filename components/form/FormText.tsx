// import { FieldProps } from "formik";
import React from "react";
// import Select from "react-select";

export const FormText = (props) => (
  <textarea rows="4"
  {...props}
  className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  maxLength="400"
/>
);

export default FormText;


