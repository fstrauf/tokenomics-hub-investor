import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaData = (props) => {
  console.log("🚀 ~ file: FormAreaData.tsx:6 ~ FormAreaData ~ props:", props)
  const context = useFormikContext()
  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ context:", context)
  const {
    values,
    setFieldValue,
  } = useFormikContext()

  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ calculationRows:", values.calculation.calculationRows)

  React.useEffect(() => {
    const chartData = getAreaData(values.calculation.months, values.calculation.calculationRows, values.calculation.totalSupply, values.calculation.startDate)

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, values.calculation.months, values.calculation.calculationRows, values.calculation.totalSupply, values.calculation.startDate])

  return <></>
}

export default FormAreaData
