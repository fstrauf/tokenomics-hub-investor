import React from "react";
import { useField, useFormikContext } from "formik";

export const FormStrength = (props) => {
  const {
      values: { tokenUtilityStrength, businessModelStrength, valueCreationStrength, valueCaptureStrength, demandDriversStrength },
      touched,
      setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField(props);

  React.useEffect(() => {
      const tokenStrength = (businessModelStrength + demandDriversStrength + valueCaptureStrength + valueCreationStrength + tokenUtilityStrength) / 5
      setFieldValue(props.name, tokenStrength);
  }, [tokenUtilityStrength, businessModelStrength, valueCreationStrength, valueCaptureStrength, demandDriversStrength, setFieldValue, props.name]);

  return (
      <>
          <input {...props} {...field} disabled={true}/>
          {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
  );
};

export default FormStrength;


