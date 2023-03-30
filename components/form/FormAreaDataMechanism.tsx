import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaDataMechanism = (props) => {
  console.log("🚀 ~ file: FormAreaDataMechanism.tsx:6 ~ FormAreaDataMechanism ~ props:", props)
  // console.log("🚀 ~ file: FormAreaData.tsx:6 ~ FormAreaData ~ props:", props)
  // const context = useFormikContext()
  // console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ context:", context)
  const {
    values,
    setFieldValue,
  } = useFormikContext()
    console.log("🚀 ~ file: FormAreaData.tsx:13 ~ FormAreaData ~ values:", values)

  // console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ calculationRows:", values.calculation.calculationRows)

  React.useEffect(() => {
    // const chartData = getAreaData(values.calculation.months, values.calculation.calculationRows, values.calculation.totalSupply, values.calculation.startDate)
    const chartProps = getAreaData(values?.calculation?.months, values?.Mechanism, values.calculation?.totalSupply, values.calculation?.startDate)

    setFieldValue(props.name, chartProps)
  }, [setFieldValue, props.name, values?.calculation?.months, values?.Mechanism, values.calculation?.totalSupply, values?.calculation?.startDate])

  return <></>
}

export default FormAreaDataMechanism
