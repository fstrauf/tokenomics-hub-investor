// import { FieldProps } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import debounce from 'lodash.debounce'
// import Select from "react-select";

export const FormAutoSave = ({ debounceMs = 20000 }) => {
        //https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
        const formik = useFormikContext();
        const [isSaved, setIsSaved] = useState(null);
        const debouncedSubmit = useCallback(
            debounce(() => {
                return formik.submitForm().then(() => setIsSaved(true));
            }, debounceMs),
            [formik.submitForm, debounceMs],
        );

        useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values]);

        return (
            <></>
        );
    };

export default FormAutoSave;


