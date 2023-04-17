import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaDataMechanism = (props) => {
  
  const {
    values,
    setFieldValue,
  } = useFormikContext()
  
  React.useEffect(() => {
    // const chartData = getAreaData(values.calculation.months, values.calculation.calculationRows, values.calculation.totalSupply, values.calculation.startDate)
    const chartProps = getAreaData(values?.Calculation?.months, values?.Mechanism, values.Calculation?.totalSupply, values.Calculation?.startDate)

    setFieldValue(props.name, chartProps)
  }, [setFieldValue, props.name, values?.Calculation?.months, values?.Mechanism, values.Calculation?.totalSupply, values?.Calculation?.startDate])

  return <></>
}

export default FormAreaDataMechanism
