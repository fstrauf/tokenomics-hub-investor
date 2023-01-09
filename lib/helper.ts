export const getLableNumber = (value) => {
  if(isNaN(value)){
    return 0
  } else {
    return value
  }
}

export const stringToKey = (name) => {
  return name.trim().replace(/\s+/g, '-').toLowerCase()
}

export const groupByAuthorClerkId = (items) => {
  const groupedItems = {}
  items.forEach((item) => {
    if (!groupedItems[item.authorClerkId]) {
      groupedItems[item.authorClerkId] = []
    }
    groupedItems[item.authorClerkId].push(item)
  })
  return groupedItems
}

export const shortBigNumber = value => new Intl.NumberFormat('en', {notation: 'compact'}).format(value)

export function getAreaData(months, calculationRows, totalSupply) {
      // console.log("🚀 ~ file: helper.ts:14 ~ getAreaData ~ calculationRows", calculationRows)
      var chartData: object[] = []
      for (let i = 0; i < months; i++) {
        var categoryLine = {}
        calculationRows.forEach((bd) => {
          //default = no emissions
          var monthlyEmission = 0
          //locked tokens = no emissions.
          if (i < bd.lockupPeriod) {            
            monthlyEmission = 0
          } else {           
            //token not locked, releasing all
            if (i <= Number(bd.unlockPeriod) + Number(bd.lockupPeriod) && Number(bd.unlockPeriod)==0 ) { 
                monthlyEmission = (totalSupply * bd.percentageAllocation) / 100
            }
            //token not locked, but vesting
            if (i < Number(bd.unlockPeriod) + Number(bd.lockupPeriod)) {
                monthlyEmission =
                (totalSupply * bd.percentageAllocation) / 100 / bd.unlockPeriod   
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