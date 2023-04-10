import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaData = (props) => {
  const {
    values: { calculationRows, totalSupply, months, startDate },    
    setFieldValue,
  } = useFormikContext()

  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ startDate:", startDate)
  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ months:", months)
  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ totalSupply:", totalSupply)
  console.log("🚀 ~ file: FormAreaData.tsx:8 ~ FormAreaData ~ calculationRows:", calculationRows)

  React.useEffect(() => {
    const chartData = getAreaData(months, calculationRows, totalSupply, startDate)

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, months, calculationRows, totalSupply, startDate])

  return <></>
}

export default FormAreaData