import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import debounce from 'lodash.debounce';

export const FormAutoSave = ({ debounceMs = 20000, dirty = true }) => {
  // https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
  if (dirty) {
    const formik = useFormikContext();
    const [isSaved, setIsSaved] = useState(null);
    const debouncedSubmit = useCallback(
      debounce(() => {
        return formik.submitForm().then(() => setIsSaved(true));
      }, debounceMs),
      [formik.submitForm]
    );

    const debouncedFormik = useRef(formik);

    useEffect(() => {
      debouncedFormik.current = formik;
    }, [formik]);

    useEffect(() => {
      if (debouncedFormik.current) {
        debouncedSubmit(debouncedFormik.current.values);
      }
    }, [debouncedSubmit, debouncedFormik.current.values]);

    return <></>;
  }

  return <></>;
};

export default FormAutoSave;



// import React, { useCallback, useEffect, useState } from 'react'
// import { useFormikContext } from 'formik'
// import debounce from 'lodash.debounce'

// export const FormAutoSave = ({ debounceMs = 20000, dirty = true }) => {
//   //https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
//   if (dirty) {
//     const formik = useFormikContext()
//     const [isSaved, setIsSaved] = useState(null)
//     const debouncedSubmit = useCallback(
//       debounce(() => {
//         return formik.submitForm().then(() => setIsSaved(true))
//       }, debounceMs),
//       [formik.submitForm, debounceMs]
//     )

//     useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values])
//   }

//   return <></>
// }

// export default FormAutoSave
