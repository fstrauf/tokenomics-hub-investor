import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData, getEpochAreaData } from '../../lib/helper'

export const FormAreaData = (props) => {
  const {
    values: { calculationRows, totalSupply, months, startDate },    
    setFieldValue,
  } = useFormikContext()

  React.useEffect(() => {

    // console.log(getEpochAreaData(months, calculationRows, totalSupply, startDate))
    // const chartData = getAreaData(months, calculationRows, totalSupply, startDate)
    const chartData = getEpochAreaData(months, calculationRows, totalSupply, startDate)
    // console.log("🚀 ~ file: FormAreaData.tsx:15 ~ React.useEffect ~ chartData", chartData)

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, months, calculationRows, totalSupply, startDate])

  return <></>
}

export default FormAreaData
