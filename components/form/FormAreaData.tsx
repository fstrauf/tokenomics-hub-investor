import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaData = (props) => {
  const {
    values: { calculationRows, totalSupply, months },
    setFieldValue,
  } = useFormikContext()

  React.useEffect(() => {
    //calcate cumulative emissions and bring it into chart friendly format

    const chartData = getAreaData(months, calculationRows, totalSupply)


    // function getAreaData() {
    //   var chartData: object[] = []
    //   for (let i = 0; i < months; i++) {
    //     var categoryLine = {}
    //     calculationRows.forEach((bd) => {
    //       //default = no emissions
    //       var monthlyEmission = 0
    //       //locked tokens = no emissions.
    //       if (i < bd.lockupPeriod) {            
    //         monthlyEmission = 0
    //       } else {           
    //         //token not locked, releasing all
    //         if (i <= Number(bd.unlockPeriod) + Number(bd.lockupPeriod) && Number(bd.unlockPeriod)==0 ) { 
    //             monthlyEmission = (totalSupply * bd.percentageAllocation) / 100
    //         }
    //         //token not locked, but vesting
    //         if (i < Number(bd.unlockPeriod) + Number(bd.lockupPeriod)) {
    //             monthlyEmission =
    //             (totalSupply * bd.percentageAllocation) / 100 / bd.unlockPeriod   
    //         }
    //       }

    //       if (i === 0) {
    //         categoryLine[bd.category] = monthlyEmission
    //       } else {
    //         categoryLine[bd.category] =
    //           monthlyEmission + chartData[i - 1][bd.category]
    //       }
    //     })
    //     categoryLine['date'] = new Date().setMonth(new Date().getMonth() + i)
    //     chartData.push(categoryLine)
    //   }
    //   return chartData
    // }
    

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, months, calculationRows, totalSupply])

  return <></>
}

export default FormAreaData
