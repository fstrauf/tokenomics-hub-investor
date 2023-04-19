import { designElementStatus } from './helper'

export function designElementStatusUpdate(values, phaseID, setFieldValue) {
  console.log("🚀 ~ file: designElementStatusField.tsx:4 ~ designElementStatusUpdate ~ setFieldValue:", setFieldValue)
  console.log("🚀 ~ file: designElementStatusField.tsx:4 ~ designElementStatusUpdate ~ phaseID:", phaseID)
  console.log("🚀 ~ file: designElementStatusField.tsx:4 ~ designElementStatusUpdate ~ values:", values)
  const designElementIndex = values?.DesignElement?.findIndex(
    (de) => de.designPhasesId.toString() === phaseID.toString()
  )
  if (designElementIndex !== -1) {
    const designElement = values.DesignElement[designElementIndex]
    if (designElement.designElementStatus !== designElementStatus.completed) {
      setFieldValue(
        `DesignElement.${designElementIndex}.designElementStatus`,
        designElementStatus.in_progress
      )
    }
  }
}
