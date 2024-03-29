import React from "react";
import Tiptap from "../TipTap";

export const FormTipTap = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  
  return (
    <div>
      <Tiptap content={props.value}
        setContent={props.onChange} editMode={true}
      />
    </div>
  )
};

export default FormTipTap;


