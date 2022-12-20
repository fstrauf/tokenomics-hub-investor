// import { FieldProps } from "formik";
import React from "react";
// import Select from "react-select";

export const FormDivider = ({text}) => (
<div className="inline-flex justify-center items-center w-full mt-4 mb-3">
    <hr className="my-8 w-96 h-px bg-gray-200 border-0"/>
    <span className="text-xl absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2">
      {text}</span>
      {/* </hr> */}
</div>
);

export default FormDivider;


