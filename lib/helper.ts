export const getLableNumber = (value) => {
  if (isNaN(value)) {
    return 0
  } else {
    return value
  }
}

export enum postStatus {
  draft = 'draft',
  review = 'review',
  published = 'published',
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

export const shortBigNumber = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(value)

export function getEpochAreaData(
  months,
  calculationRows,
  totalSupply,
  startDate
) {
  // console.log('🚀 ~ file: helper.ts:39 ~ calculationRows', calculationRows)
  var chartData: object[] = []
  const initialReward = 50
  let emissions = 0
  let month = 1
  let reward = initialReward
  const epochDurationInMonths = months
  // const mEmissions = 219000
  const rewardsPerMonth = 4380
  let halvings = 0

  while (emissions < totalSupply) {
    var categoryLine = {}
    emissions += rewardsPerMonth * reward
    // console.log("🚀 ~ file: helper.ts:51 ~ emissions", emissions)
    if (month === epochDurationInMonths * (halvings + 1)) {
      reward = reward / 2
      halvings++
    }
    categoryLine['date'] = new Date(startDate).setMonth(
      new Date(startDate).getMonth() + month
    )
    categoryLine[calculationRows[0].category] = emissions

    chartData.push(categoryLine)
    month++
  }

  return chartData
  // console.log('🚀 ~ file: helper.ts:60 ~ chartData', chartData)
}

export function getAreaData(months, calculationRows, totalSupply, startDate) {
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
        if (
          i <= Number(bd.unlockPeriod) + Number(bd.lockupPeriod) &&
          Number(bd.unlockPeriod) == 0
        ) {
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
    categoryLine['date'] = new Date(startDate).setMonth(
      new Date(startDate).getMonth() + i
    )
    chartData.push(categoryLine)
  }
  return chartData
}
