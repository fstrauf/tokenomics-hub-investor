// import { DISCORD_EDITING } from './constants'
// import { clerkClient } from '@clerk/nextjs/server'

import { start } from "repl"

export const getLableNumber = (value) => {
  if (isNaN(value)) {
    return 0
  } else {
    return value
  }
}

export enum postStatus {
  draft = 'Draft',
  reviewRequired = 'Review Required',
  reviewComplete = 'Review Complete',
  published = 'Published',
}

export const stringToKey = (name) => {
  return name.trim().replace(/\s+/g, '-').toLowerCase().replace(/&/g, 'and')
}

export const getTotalStrength = (post) => {
  return (
    (post?.tokenUtilityStrength +
      post?.demandDriversStrength +
      post?.valueCreationStrength +
      post?.valueCaptureStrength +
      post?.businessModelStrength) /
    5
  )
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
  calculationRow,
  months,
  rowAllocation,
  chartData,
  startDate
) {
  // console.log("🚀 ~ file: helper.ts:57 ~ calculationRow", calculationRow)
  // console.log("🚀 ~ file: helper.ts:57 ~ rowAllocation", rowAllocation)
  // console.log('🚀 ~ file: helper.ts:39 ~ calculationRows', calculationRows)
  // var chartData: object[] = []

  const secondsPerMonth = 2628000
  // const initialReward = 50
  let emissions = 0
  let month = 0 //1
  let emissionsPerMonth = calculationRow.initialEmissionPerSecond / secondsPerMonth //hardcode to start with
  const epochDurationInMonths = calculationRow.epochDurationInSeconds / secondsPerMonth //hardcode to start with
  const emissionReductionPerEpoch = calculationRow.emissionReductionPerEpoch
  let emissionsPerSecond = calculationRow.initialEmissionPerSecond
  // const mEmissions = 219000
  // const rewardsPerMonth = 4380
  let epochs = 0

  while (emissions < rowAllocation) {
    var categoryLine = {}

    if (chartData[month] === undefined) {      
      //always initialise the first line
      chartData[month] = {}
    }

    // console.log("🚀 ~ file: helper.ts:73 ~ chartData[month]", chartData[month])
    emissions += secondsPerMonth *  emissionsPerSecond
    // emissions += blocksPerMonth * rewardPerBlock
    // console.log("🚀 ~ file: helper.ts:80 ~ emissions", emissions)
    // console.log("🚀 ~ file: helper.ts:51 ~ emissions", emissions)

    if(month === epochDurationInMonths * (epochs + 1)){
      emissionsPerSecond = emissionsPerSecond * calculationRow.emissionReductionPerEpoch
      epochs++
    }

    // if (month === epochDurationInMonths * (halvings + 1)) {
    //   rewardPerBlock = rewardPerBlock / 2
    //   halvings++
    // }
    // categoryLine['date'] = new Date(startDate).setMonth(
    //   new Date(startDate).getMonth() + month
    // )
    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + month
      )
    }

    categoryLine[calculationRow.category] = emissions
    // console.log("🚀 ~ file: helper.ts:96 ~ categoryLine", categoryLine)

    // chartData.push(categoryLine)
    Object.assign(chartData[month], categoryLine)
    month++
  }

  // return chartData
  // console.log('🚀 ~ file: helper.ts:60 ~ chartData', chartData)
}

export function getMonthEpochAreaData(
  calculationRow,
  months,
  rowAllocation,
  chartData,
  startDate
) {

  let emissions = 0
  const secondsPerMonth = 2628000
  let emissionsPerSecond = calculationRow.initialEmissionPerSecond
  const epochDurationInMonths = calculationRow.epochDurationInSeconds / secondsPerMonth //hardcode to start with
  let epochs = 0

  for (let i = 0; i < months; i++) {
    var categoryLine = {}

    if (chartData[i] === undefined) {      
      //always initialise the first line
      chartData[i] = {}
    }

    if(emissions < rowAllocation){
      emissions += secondsPerMonth *  emissionsPerSecond
      if(i === epochDurationInMonths * (epochs + 1)){
        emissionsPerSecond = emissionsPerSecond * calculationRow.emissionReductionPerEpoch
        epochs++
      }
    }

    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + i
      )
    }

    categoryLine[calculationRow.category] = emissions
    Object.assign(chartData[i], categoryLine)
  }

}

export function getAreaData(months, calculationRows, totalSupply, startDate) {
  var chartData: object[] = []

  // console.log(getOldAreaData(months, calculationRows, totalSupply, startDate))
  calculationRows.forEach((cr) => {
    // chartData.push({})
    const rowAllocation = (totalSupply * cr.percentageAllocation) / 100
    if (cr.isEpochDistro) {
      getMonthEpochAreaData(cr, months, rowAllocation, chartData, startDate)
    } else {
      getLinearAreaData(cr, months, rowAllocation, chartData, startDate)      
    }
  })

  // a.map((obj, index) => ({
  //   ...obj,
  //   ...b[index]
  // }))
  console.log('🚀 ~ file: helper.ts:110 ~ getAreaData ~ chartData', chartData)
  return chartData
}

export function getLinearAreaData(
  calculationRow,
  months,
  rowAllocation,
  chartData,
  startDate
) {
  // var chartRow: object[] = []
  for (let i = 0; i < months; i++) {
    var monthlyEmission = 0
    if (i < calculationRow.lockupPeriod) {
      monthlyEmission = 0
    } else {
      //token not locked, releasing all
      if (
        i <=
          Number(calculationRow.unlockPeriod) +
            Number(calculationRow.lockupPeriod) &&
        Number(calculationRow.unlockPeriod) == 0
      ) {
        monthlyEmission = rowAllocation
      }
      //token not locked, but vesting
      if (
        i <
        Number(calculationRow.unlockPeriod) +
          Number(calculationRow.lockupPeriod)
      ) {
        monthlyEmission = rowAllocation / calculationRow.unlockPeriod
      }
    }
    var categoryLine = {}

    if (chartData[i] === undefined) {
      //always initialise the first line
      chartData[i] = {}
    }
    if (i === 0) {
      categoryLine[calculationRow.category] = monthlyEmission
    } else {
      categoryLine[calculationRow.category] =
        monthlyEmission + chartData[i - 1][calculationRow.category]
    }

    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + i
      )
    }

    Object.assign(chartData[i], categoryLine)
  }
}

export async function notifyStatusUpdate(
  authorEmail,
  newStatus: postStatus,
  url: string
) {
  if (authorEmail === '') {
    return
  }
  // console.log("🚀 ~ file: helper.ts:118 ~ url", url)
  let message = ''
  // const draftMessage =
  switch (newStatus) {
    case postStatus.draft: {
      message = `Thanks for creating a report.\n Access it here ${url}.\n Submit it for review once the minumum content is filled.`
      break
    }
    case postStatus.reviewRequired: {
      message = `Your report has been sent for review.\n We'll get back with feedback shortly.`
      notifyDiscord(url, postStatus.reviewRequired)
      break
    }
    case postStatus.reviewComplete: {
      message = `Your report has been reviewed.\n Access it here ${url}.\n Please implement the requested changes and send it back to review.`
      break
    }
    case postStatus.published: {
      message = `Your report has been published here ${url}.\n`
      notifyDiscord(url, postStatus.published)
      break
    }
  }

  const msg = {
    to: authorEmail,
    from: 'contact@tokenomicsdao.com',
    subject: `Your Tokenomics Hub report was moved to ${newStatus}`,
    text: message,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  const body = { msg }
  fetch('/api/sendEmail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function notifyDiscord(url: string, status: postStatus) {
  const body = { url, status }

  fetch('/api/sendDiscord', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function clerkConvertJSON(input) {
  var properJSON
  if (Array.isArray(input)) {
    properJSON = []
    try {
      properJSON = JSON.parse(JSON.stringify(input)) || []
    } catch {}
  } else {
    properJSON = {}
    try {
      properJSON = JSON.parse(JSON.stringify(input)) || {}
    } catch {
      properJSON = {}
    }
  }
  return properJSON
}

export function mandatoryFormValidate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required!'
    errors.mainInfo = true
  }
  if (!values.shortDescription) {
    errors.shortDescription = 'Required!'
    errors.mainInfo = true
  }
  if (values?.categories?.length === 0) {
    errors.categories = 'Required!'
    errors.mainInfo = true
  }
  if (values?.tags?.length === 0) {
    errors.tags = 'Required!'
    errors.mainInfo = true
  }
  if (!values.tokenUtility) {
    errors.tokenUtility = 'Required!'
    errors.tokenStrength = true
  }
  if (!values.businessModel) {
    errors.businessModel = 'Required!'
    errors.tokenStrength = true
  }
  if (!values.valueCreation) {
    errors.valueCreation = 'Required!'
    errors.tokenStrength = true
  }
  if (!values.valueCapture) {
    errors.valueCapture = 'Required!'
    errors.tokenStrength = true
  }

  if (!values.demandDrivers) {
    errors.demandDrivers = 'Required!'
    errors.tokenStrength = true
  }
  if (!values.breakdown && values?.calculation === undefined) {
    if (!values.breakdown) {
      errors.breakdown = 'Required!'
    }
    if (values?.calculation === undefined) {
      errors.calculation = 'Required!'
    }
    errors.deepDive = true
  }

  return errors
}
