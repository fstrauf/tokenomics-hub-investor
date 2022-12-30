import React from 'react'
import { useFormikContext } from 'formik'

export const FormAreaData = (props) => {
  const {
    values: { breakdown, totalSupply, months },
    setFieldValue,
  } = useFormikContext()

  React.useEffect(() => {
    //calcate cumulative emissions and bring it into chart friendly format

    const chartData = getAreaData()

    function getAreaData() {
      var chartData: object[] = []
      for (let i = 0; i < months; i++) {
        var categoryLine = {}
        breakdown.forEach((bd) => {
          //default = no emissions
          var monthlyEmission = 0
          //locked tokens = no emissions.
          if (i < bd.lockedMonths) {            
            monthlyEmission = 0
          } else {           
            //token not locked, releasing all
            if (i <= Number(bd.vestedMonths) + Number(bd.lockedMonths) && Number(bd.vestedMonths)==0 ) { 
                monthlyEmission = (totalSupply * bd.allocationP) / 100
            }
            //token not locked, but vesting
            if (i < Number(bd.vestedMonths) + Number(bd.lockedMonths)) {
                monthlyEmission =
                (totalSupply * bd.allocationP) / 100 / bd.vestedMonths   
            }
          }

          if (i === 0) {
            categoryLine[bd.category] = monthlyEmission
          } else {
            categoryLine[bd.category] =
              monthlyEmission + chartData[i - 1][bd.category]
          }
        })
        categoryLine['date'] = new Date().setMonth(new Date().getMonth() + i)
        chartData.push(categoryLine)
      }
      return chartData
    }

    setFieldValue(props.name, chartData)
  }, [setFieldValue, props.name, months, breakdown, totalSupply])

  return <></>
}

export default FormAreaData
