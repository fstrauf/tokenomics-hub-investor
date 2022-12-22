import React from "react";
import Tiptap from "../TipTap";

export const FormTipTap = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  // console.log(props)
  
  return (
    <div>
      <Tiptap content={props.value}
        setContent={props.onChange}
      />
    </div>
  )
};

export default FormTipTap;


