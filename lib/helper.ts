// import { DISCORD_EDITING } from './constants'
// import { clerkClient } from '@clerk/nextjs/server'

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
  return name.trim().replace(/\s+/g, '-').toLowerCase().replace(/&/g, "and")
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
  let rewardPerBlock = initialReward
  const epochDurationInMonths = months
  // const mEmissions = 219000
  const blocksPerMonth = 4380
  let halvings = 0

  while (emissions < totalSupply) {
    var categoryLine = {}
    emissions += blocksPerMonth * rewardPerBlock
    // console.log("🚀 ~ file: helper.ts:51 ~ emissions", emissions)
    if (month === epochDurationInMonths * (halvings + 1)) {
      rewardPerBlock = rewardPerBlock / 2
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
      notifyReviewers(url)
      break
    }
    case postStatus.reviewComplete: {
      message = `Your report has been reviewed.\n Access it here ${url}.\n Please implement the requested changes and send it back to review.`
      break
    }
    case postStatus.published: {
      message = `Your report has been published here ${url}.\n`
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

export async function notifyReviewers(url: string) {
  const body = { url }

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
  if (values.categories.length === 0) {
    errors.categories = 'Required!'
    errors.mainInfo = true
  }
  if (values.tags.length === 0) {
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

  console.log("🚀 ~ file: helper.ts:231 ~ mandatoryFormValidate ~ values", values)
  if (!values.breakdown && values?.calculation === undefined) {    
    
    if (!values.breakdown){
      errors.breakdown = 'Required!'
    }
    if(values?.calculation === undefined)
    {
      errors.calculation = 'Required!'
    }
    errors.deepDive = true
  }

  return errors
}