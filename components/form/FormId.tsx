import React from "react";
import { useField, useFormikContext } from "formik";

export const FormId = (props) => {
  // console.log(props)
  const {
    values: { id },
    setFieldValue,
  } = useFormikContext();

  
  // console.log(id)
  const [field, meta] = useField(props);
  // console.log('field ' + JSON.stringify(field))

  React.useEffect(() => {
    // console.log('name ' +props.name)
    //   const tokenStrength = (businessModelStrength + demandDriversStrength + valueCaptureStrength + valueCreationStrength + tokenUtilityStrength) / 5
    setFieldValue(props.name, props.postId);
      // setFieldValue('id', 'clbu79yf000oaemta903ptop5')
  }, [setFieldValue, props.name, props.postId]);

  // console.log('field ' + JSON.stringify(field))

  return (
    <>
      {/* <input {...props} {...field} disabled={true} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>} */}
    </>
  );
};

export default FormId;


