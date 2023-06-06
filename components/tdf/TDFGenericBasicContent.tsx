import { Field, useFormikContext } from 'formik'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
// import ExampleSection from './ExampleSection'
// import { designElementStatusUpdate } from '../../lib/designElementStatusField'
// import { useEffect } from 'react'
// import FormGenerateButton from './FormGenerateButton'
// import FormFormatButton from './FormFormatButton'
// import WalkthroughSection from './WalkthroughSection'
// import FormErrorMessage from '../form/FormErrorMessage'

export default function TDFGenericBasicContent({
  // props,
  // activePhase,
  // placeholder,
  // values,
  // format = null,
  children,
}) {
  // const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  // const { setFieldValue, dirty } = useFormikContext()

  // useEffect(() => {
  //   if (dirty) {
  //     designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  //   }
  // }, [dirty])

  return <div className="flex flex-col">{children}</div>
}
