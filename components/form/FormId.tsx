import React from "react";
import { useField, useFormikContext } from "formik";

export const FormId = (props) => {
  const {
    values: { id },
    setFieldValue,
  } = useFormikContext();

  
  const [field, meta] = useField(props);

  React.useEffect(() => {
    setFieldValue(props.name, props.postId);
  }, [setFieldValue, props.name, props.postId]);

  return (
    <>
    </>
  );
};

export default FormId;


