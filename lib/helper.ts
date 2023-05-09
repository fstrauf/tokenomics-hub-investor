export const formatDate = (date) => {
  const oldDate = new Date(date)
  var getYear = oldDate.toLocaleString('default', { year: 'numeric' })
  var getMonth = oldDate.toLocaleString('default', { month: '2-digit' })
  var getDay = oldDate.toLocaleString('default', { day: '2-digit' })

  return getYear + '-' + getMonth + '-' + getDay
}

export const getMergedInitialCalcValues = (userCalcs, userId, detailedCalc) => {
  var preloadInitialValues = initialCalculatorValues

  preloadInitialValues.calculations = userCalcs
  preloadInitialValues.authorClerkId = userId

  if (detailedCalc !== null) {
    preloadInitialValues.id = detailedCalc.id
    preloadInitialValues.totalSupply = detailedCalc.totalSupply
    preloadInitialValues.months = detailedCalc.months
    preloadInitialValues.startDate = new Date(
      detailedCalc.startDate
    ).toLocaleDateString('en-CA')
    preloadInitialValues.name = detailedCalc.title
    preloadInitialValues.calculationRows = detailedCalc.CalculationRows
  }

  return preloadInitialValues
}

export const initialCalculatorValues = {
  id: '',
  totalSupply: 100000000,
  months: 60,
  areaData: [],
  authorClerkId: '',
  name: '',
  startDate: new Date().toLocaleDateString('en-CA'),
  calculations: '',
  calculationRows: [
    {
      category: 'Treasury',
      lockupPeriod: 5,
      unlockPeriod: 12,
      percentageAllocation: 30,
      color: '#FF6666',
      isEpochDistro: false,
      epochDurationInSeconds: 0,
      initialEmissionPerSecond: 0,
      emissionReductionPerEpoch: 0,
    },
    {
      category: 'Team',
      lockupPeriod: 0,
      unlockPeriod: 12,
      percentageAllocation: 15,
      color: '#028090',
      isEpochDistro: false,
      epochDurationInSeconds: 0,
      initialEmissionPerSecond: 0,
      emissionReductionPerEpoch: 0,
    },
    {
      category: 'Investors',
      lockupPeriod: 0,
      unlockPeriod: 12,
      percentageAllocation: 15,
      color: '#66FFB3',
      isEpochDistro: false,
      epochDurationInSeconds: 0,
      initialEmissionPerSecond: 0,
      emissionReductionPerEpoch: 0,
    },
    {
      category: 'Advisors',
      lockupPeriod: 0,
      unlockPeriod: 12,
      percentageAllocation: 10,
      color: '#996EFF',
      isEpochDistro: false,
      epochDurationInSeconds: 0,
      initialEmissionPerSecond: 0,
      emissionReductionPerEpoch: 0,
    },
    {
      category: 'Airdrops',
      lockupPeriod: 0,
      unlockPeriod: 12,
      percentageAllocation: 30,
      color: '#333C45',
      isEpochDistro: true,
      epochDurationInSeconds: 126144000,
      initialEmissionPerSecond: 0.2397,
      emissionReductionPerEpoch: 0.5,
    },
  ],
}

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
  example = 'Example',
}

export enum designElementStatus {
  new = 'new',
  in_progress = 'in progress',
  completed = 'completed',
}

export enum headerStatus {
  main = 'main',
  design = 'design',
  report = 'report',
}

export enum postType {
  report = 'report',
  design = 'design',
}

export enum subTiers {
  genesis = 'prod_NpDbT4LFoUtZ1l',
  navigator = '',
  frontier = '',
  inactive = '',
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

export const getActiveDesignPhase = (designPhases, activePhase) => {
  return designPhases.find((adp) => adp.phaseId === activePhase)
}

export const shortBigNumber = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(value)

export function getMonthEpochAreaData(
  calculationRow,
  months,
  rowAllocation,
  chartData,
  startDate,
  supplyDemandTotals
) {
  let emissions = 0
  const secondsPerMonth = 2628000
  let emissionsPerSecond = calculationRow.initialEmissionPerSecond
  // console.log("🚀 ~ file: helper.ts:110 ~ emissionsPerSecond", emissionsPerSecond)
  const epochDurationInMonths = Math.floor(
    calculationRow.epochDurationInSeconds / secondsPerMonth
  ) //hardcode to start with
  let epochs = 0

  for (let i = 0; i < months; i++) {
    var categoryLine = {}

    if (chartData[i] === undefined) {
      //always initialise the first line
      chartData[i] = {}
    }
    //prevent over-emitting
    if (emissions + secondsPerMonth * emissionsPerSecond < rowAllocation) {
      emissions += secondsPerMonth * emissionsPerSecond

      if (i === epochDurationInMonths * (epochs + 1)) {
        emissionsPerSecond =
          emissionsPerSecond *
          (1 - calculationRow.emissionReductionPerEpoch / 100)
        epochs++
      }
    }

    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + i
      )
    }

    categoryLine[calculationRow.name || calculationRow.category] = emissions
    categoryLine['emissionsPerSecond'] = emissionsPerSecond
    categoryLine['monthlyEmissions'] = secondsPerMonth * emissionsPerSecond
    Object.assign(chartData[i], categoryLine)

    if (supplyDemandTotals[i] === undefined) {
      supplyDemandTotals[i] = {
        date: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        supply: Number(
          categoryLine[calculationRow.name || calculationRow.category]
        ),
      }
    } else {
      if (supplyDemandTotals[i].supply === undefined) {
        supplyDemandTotals[i].supply = 0
      }
      supplyDemandTotals[i].supply += Number(
        categoryLine[calculationRow.name || calculationRow.category]
      )
    }
  }
}

export function getAreaData(months, calculationRows, totalSupply, startDate) {
  var props = { chartData: [], supplyDemandTotals: [] }

  calculationRows?.forEach((cr) => {
    const rowAllocation = (totalSupply * cr.percentageAllocation) / 100
    if (cr?.isSink) {
      // sum up the demand data for supplydemand totals
      getDemandAreaData(cr, months, props.supplyDemandTotals, startDate)
    } else {
      if (cr.isEpochDistro) {
        // add supply for the supplydemand totals
        getMonthEpochAreaData(
          cr,
          months,
          rowAllocation,
          props.chartData,
          startDate,
          props.supplyDemandTotals
        )
      } else {
        getLinearAreaData(
          cr,
          months,
          rowAllocation,
          props.chartData,
          startDate,
          props.supplyDemandTotals
        )
      }
    }
  })
  // console.log('🚀 ~ file: helper.ts:285 ~ getAreaData ~ props:', props)
  return props
}

export function getDemandAreaData(
  calculationRow,
  months,
  supplyDemandTotals,
  startDate
) {
  if (calculationRow.CalculationTimeSeries !== undefined) {
    const inputData = calculationRow.CalculationTimeSeries || []
    let currentMonth = 0

    for (let i = 0; i < inputData.length; i++) {
      const row = inputData[i]
      let endMonth = currentMonth + row.months - 1

      if (endMonth >= months) {
        endMonth = months - 1
      }

      for (let j = currentMonth; j <= endMonth; j++) {
        if (supplyDemandTotals[j] === undefined) {
          supplyDemandTotals[j] = {
            date: new Date(startDate).setMonth(
              new Date(startDate).getMonth() + j
            ),
            demand: row.tokens,
          }
        } else {
          if (supplyDemandTotals[j].demand === undefined) {
            supplyDemandTotals[j].demand = 0
          }
          supplyDemandTotals[j].demand += row.tokens
        }
      }
      currentMonth = endMonth + 1
    }

    for (let i = currentMonth; i < months; i++) {
      if (supplyDemandTotals[i] === undefined) {
        supplyDemandTotals[i] = {
          date: new Date(startDate).setMonth(
            new Date(startDate).getMonth() + i
          ),
          demand: inputData[inputData.length - 1]?.tokens || 0,
        }
      } else {
        if (supplyDemandTotals[i].demand === undefined) {
          supplyDemandTotals[i].demand = 0
        }
        supplyDemandTotals[i].demand +=
          inputData[inputData.length - 1]?.tokens || 0
      }
    }
  }
}

export function getLinearAreaData(
  calculationRow,
  months,
  rowAllocation,
  chartData,
  startDate,
  supplyDemandTotals
) {
  let totalRowAllocation = rowAllocation
  for (let i = 0; i < months; i++) {
    var monthlyEmission = 0
    //tge unlock
    if (i === 0 && calculationRow.percentageUnlockTGE > 0) {
      monthlyEmission = (totalRowAllocation * calculationRow.percentageUnlockTGE) / 100
      totalRowAllocation = totalRowAllocation * (1 - (calculationRow.percentageUnlockTGE/100))
    } else {
      if (i < calculationRow.lockupPeriod) {
        //still locking, no emissions
        monthlyEmission = 0
      } else {
        //token not locked, releasing all
        if (
          i <=
            Number(calculationRow.unlockPeriod) +
              Number(calculationRow.lockupPeriod) &&
          Number(calculationRow.unlockPeriod) == 0
        ) {
          monthlyEmission = totalRowAllocation
        }
        //token not locked, but vesting
        if (
          i <
          Number(calculationRow.unlockPeriod) +
            Number(calculationRow.lockupPeriod)
        ) {
          monthlyEmission = totalRowAllocation / calculationRow.unlockPeriod
        }
      }
    }

    var categoryLine = {}

    if (chartData[i] === undefined) {
      //always initialise the first line
      chartData[i] = {}
    }
    if (i === 0) {
      categoryLine[calculationRow.name || calculationRow.category] =
        monthlyEmission
    } else {
      categoryLine[calculationRow.name || calculationRow.category] =
        monthlyEmission +
        chartData[i - 1][calculationRow.name || calculationRow.category]
    }

    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + i
      )
    }

    Object.assign(chartData[i], categoryLine)

    if (supplyDemandTotals[i] === undefined) {
      supplyDemandTotals[i] = {
        date: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        supply: Number(
          categoryLine[calculationRow.name || calculationRow.category]
        ),
      }
    } else {
      if (supplyDemandTotals[i].supply === undefined) {
        supplyDemandTotals[i].supply = 0
      }
      supplyDemandTotals[i].supply += Number(
        categoryLine[calculationRow.name || calculationRow.category]
      )
    }
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
  let message = ''
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
    errors['11'] = true
  }
  if (!values.shortDescription) {
    errors.shortDescription = 'Required!'
    errors['11'] = true
  }
  if (values?.categories?.length === 0) {
    errors.categories = 'Required!'
    errors['11'] = true
  }
  // if (values?.Mechanism?.length === 0) {
  //   errors.Mechanism = 'Required!'
  //   errors['502'] = true
  // }
  if (values?.tags?.length === 0) {
    errors.tags = 'Required!'
    errors['11'] = true
  }
  if (!values.tokenUtility) {
    errors.tokenUtility = 'Required!'
    errors['801'] = true
  }
  if (!values.businessModel) {
    errors.businessModel = 'Required!'
    errors['104'] = true
  }
  if (!values.valueCreation) {
    errors.valueCreation = 'Required!'
    errors['103'] = true
  }
  if (!values.valueCapture) {
    errors.valueCapture = 'Required!'
    errors['801'] = true
  }

  if (!values.demandDrivers) {
    errors.demandDrivers = 'Required!'
    errors['801'] = true
  }
  if (!values.breakdown && values?.Mechanism?.length === 0) {
    if (!values.breakdown) {
      errors.breakdown = 'Required!'
      errors['802'] = true
    }
    if (values?.Mechanism?.length === 0) {
      errors.Mechanism = 'Required!'
      errors['502'] = true
    }
  }

  return errors
}

export async function upDateFirstTimeVisit(
  userId: string,
  prop: string,
  newVal: any
) {
  const body = { userId, prop, newVal }

  try {
    await fetch('/api/setPublicMetaData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    // toast.success('Message sent', { position: 'bottom-right' })
    return true
  } catch (error) {
    console.error(error)
    // toast.error('An error occurred', { position: 'bottom-right' })
    return false
  }
}

export function validateTierAccess(subscription: any, admin: boolean =false): boolean {
  console.log("🚀 ~ file: helper.ts:560 ~ validateTierAccess ~ subscription:", subscription)
  console.log("🚀 ~ file: helper.ts:560 ~ validateTierAccess ~ admin:", admin)
  
    
    if(subscription?.tier === subTiers.genesis || subscription?.tier === subTiers.frontier || subscription?.tier === subTiers.navigator ){
      console.log('user has subscriptiom')
      return true
    }else{
      //still testing subscriptions
      if(admin){
        console.log('No subscription and admin')
        return false
      } else {
        console.log('No subscription but normal user (we are still testing)')
        return true
      }
    }  
  }