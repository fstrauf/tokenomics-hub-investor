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

export function getEpochAreaData(
  calculationRow,
  rowAllocation,
  chartData,
  startDate
) {
  const secondsPerMonth = 2628000
  let emissions = 0
  let month = 0 //1
  const epochDurationInMonths =
    calculationRow.epochDurationInSeconds / secondsPerMonth //hardcode to start with
  let emissionsPerSecond = calculationRow.initialEmissionPerSecond
  let epochs = 0

  while (emissions < rowAllocation) {
    var categoryLine = {}

    if (chartData[month] === undefined) {
      //always initialise the first line
      chartData[month] = {}
    }

    emissions += secondsPerMonth * emissionsPerSecond

    if (month === epochDurationInMonths * (epochs + 1)) {
      emissionsPerSecond =
        emissionsPerSecond * calculationRow.emissionReductionPerEpoch
      epochs++
    }

    if (categoryLine['date'] === undefined) {
      categoryLine['date'] = new Date(startDate).setMonth(
        new Date(startDate).getMonth() + month
      )
    }

    categoryLine[calculationRow.category] = emissions

    Object.assign(chartData[month], categoryLine)
    month++
  }
}

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

    categoryLine[calculationRow.category] = emissions
    categoryLine['emissionsPerSecond'] = emissionsPerSecond
    categoryLine['monthlyEmissions'] = secondsPerMonth * emissionsPerSecond
    Object.assign(chartData[i], categoryLine)
    console.log('🚀 ~ file: helper.ts:226 ~ categoryLine:', categoryLine)

    if (supplyDemandTotals[i] === undefined) {
      supplyDemandTotals[i] = {
        date: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        supply: Number(categoryLine[calculationRow.category]),
      }
      console.log(
        '🚀 ~ file: helper.ts:233 ~ Number(categoryLine[calculationRow.category]):',
        Number(categoryLine[calculationRow.category])
      )
    } else {
      if (supplyDemandTotals[i].supply === undefined) {
        supplyDemandTotals[i].supply = 0
      }
      supplyDemandTotals[i].supply += Number(
        categoryLine[calculationRow.category]
      )
    }
  }
}

export function getAreaData(months, calculationRows, totalSupply, startDate) {
  var props = { chartData: [], supplyDemandTotals: [] }
  // var chartData: object[] = []
  // var supplyDemandTotals: object[] = []

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

  console.log(
    '🚀 ~ file: helper.ts:269 ~ calculationRows?.forEach ~ supplyDemandTotals:',
    props
  )

  // console.log('🚀 ~ file: helper.ts:155 ~ getAreaData ~ chartData', chartData)
  return props
}

export function getDemandAreaData(
  calculationRow,
  months,
  supplyDemandTotals,
  startDate
) {
  const inputData = calculationRow.CalculationTimeSeries

  // const dataset = []
  let currentMonth = 0

  for (let i = 0; i < inputData.length; i++) {
    const row = inputData[i]
    const endMonth = currentMonth + row.months - 1
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
        date: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        demand: inputData[inputData.length - 1].tokens,
      }
    } else {
      if (supplyDemandTotals[i].demand === undefined) {
        supplyDemandTotals[i].demand = 0
      }
      supplyDemandTotals[i].demand += inputData[inputData.length - 1].tokens
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
    // console.log("🚀 ~ file: helper.ts:378 ~ categoryLine[calculationRow.category]:", categoryLine)
    if (supplyDemandTotals[i] === undefined) {
      supplyDemandTotals[i] = {
        date: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        supply: Number(categoryLine[calculationRow.category]),
      }
      // console.log("🚀 ~ file: helper.ts:379 ~ Number(categoryLine[calculationRow.category]):", Number(categoryLine[calculationRow.category]))
    } else {
      if (supplyDemandTotals[i].supply === undefined) {
        supplyDemandTotals[i].supply = 0
      }
      supplyDemandTotals[i].supply += Number(
        categoryLine[calculationRow.category]
      )
      // supplyDemandTotals[i].supply += Number(categoryLine[calculationRow.category]) || 0
      // console.log("🚀 ~ file: helper.ts:383 ~ supplyDemandTotals[i].supply:", supplyDemandTotals[i].supply)
      // console.log("🚀 ~ file: helper.ts:384 ~ Number(categoryLine[calculationRow.category]):", Number(categoryLine[calculationRow.category]))
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
