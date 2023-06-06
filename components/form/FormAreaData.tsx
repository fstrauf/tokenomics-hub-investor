import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaData = (props) => {
  console.log("🚀 ~ file: FormAreaData.tsx:6 ~ FormAreaData ~ props:", props)
  const {
    values: { calculationRows, totalSupply, months, startDate },    
    setFieldValue,
  } = useFormikContext()

  React.useEffect(() => {
    const chartData = getAreaData(months, calculationRows, totalSupply, startDate)
    console.log("🚀 ~ file: FormAreaData.tsx:13 ~ React.useEffect ~ chartData:", chartData)

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, months, calculationRows, totalSupply, startDate])

  return <></>
}

export default FormAreaData