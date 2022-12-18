import React from "react";
import { useField, useFormikContext } from "formik";

export const FormId = (props) => {
    // console.log(props)
  const {
      setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField(props);

  React.useEffect(() => {
    // console.log(props.name)
    //   const tokenStrength = (businessModelStrength + demandDriversStrength + valueCaptureStrength + valueCreationStrength + tokenUtilityStrength) / 5
      setFieldValue(props.name, props.postId);
    //   setFieldValue('id', props.postId)
  }, [setFieldValue, props.name]);
    

  return (
      <>
          <input {...props} {...field} disabled={true}/>
          {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
  );
};

export default FormId;


