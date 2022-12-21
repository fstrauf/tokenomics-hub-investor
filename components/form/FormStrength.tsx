import React from "react";
import { useField, useFormikContext } from "formik";
import { CircularProgressbar } from 'react-circular-progressbar';

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
            <div className='w-10 h-10 mb-5'>
                <CircularProgressbar value={field.value} text={`${field.value}`} />
            </div>
            {/* <input {...props} {...field} disabled={true} /> */}
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default FormStrength;


