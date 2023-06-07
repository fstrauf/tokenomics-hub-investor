import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { stringToKey } from '../../../lib/helper'

export default async function handle(req, res) {
  const { values } = req.body
  console.log("🚀 ~ file: updateNewDesign.ts:7 ~ handle ~ values:", values)
  const inputFields = values

  var breakdown = inputFields.breakdown
  if (typeof inputFields.breakdown === 'object') {
    breakdown = JSON.stringify(inputFields.breakdown)
  }

  let calculation = inputFields.Calculation
  if (Object.keys(calculation).length > 0) {
    delete calculation?.areaData
    delete calculation?.postId
    delete calculation?.calculationRows
    calculation.startDate = new Date(calculation?.startDate)

    if (calculation?.id) {
      calculation = { update: calculation }
    } else {
      calculation = { create: calculation }
    }
  }

  const postUser = inputFields.PostUser.map((pu) => ({
    id: inputFields?.id + '_' + pu.name,
    name: pu.name,
    role: pu.role,
  }))

  //i could save the incentivedesign in a similar as the postusers
  const mechanisms = inputFields.Mechanism.map((m) => {
    var postUsers = {}
    if (m?.PostUser === undefined) {
    } else {
      postUsers = {
        connect: m?.PostUser?.map((pu) => ({
          id: inputFields?.id + '_' + pu.name,
        })),
      }
    }

    var incentiveTargets = {}
    
    if (m?.incentiveTarget === undefined) {
    } else {
      if (m?.incentiveTarget.length>0) {
        
        incentiveTargets = {
          connect: {
            id: inputFields?.id + '_' + stringToKey(m?.incentiveTarget?.name),
          },
        }
      }
    }

    const calculationTimeSeries =
      m?.CalculationTimeSeries?.map((cts) => ({
        phase: cts.phase,
        months: cts.months,
        tokens: cts.tokens,
      })) || {}
    return {
      id: inputFields?.id + '_' + stringToKey(m.name),
      name: m.name,
      summary: m.summary,
      details: m.details,
      isSink: m.isSink,
      token: m.token,
      isTemplate: false,
      category: m.category,
      lockupPeriod: m.lockupPeriod,
      unlockPeriod: m.unlockPeriod,
      percentageAllocation: m.percentageAllocation,
      isEpochDistro: m.isEpochDistro,
      epochDurationInSeconds: m.epochDurationInSeconds,
      initialEmissionPerSecond: m.initialEmissionPerSecond,
      percentageUnlockTGE: m.percentageUnlockTGE,
      emissionReductionPerEpoch: m.emissionReductionPerEpoch,
      color: m.color,
      CalculationTimeSeries: {
        create: calculationTimeSeries,
      },
      mechanismTypeId: m.mechanismType?.id,
      PostUser: postUsers,
      supplyDemandType: m.supplyDemandType,
      incentiveTarget: incentiveTargets,
    }
  })

  mechanisms.sort((a, b) => {
    if (a.isSink && !b.isSink) {
      return 1; // a should come after b
    }
    if (!a.isSink && b.isSink) {
      return -1; // a should come before b
    }
    return 0; // no change in order
  });

  var DesignElement = inputFields.DesignElement.map((de) => {
    if (typeof de.content === 'object') {
      return {
        content: JSON.stringify(de.content),
        designPhasesId: de.designPhasesId,
        designElementStatus: de.designElementStatus,
      }
    } else {
      return {
        content: de.content,
        designPhasesId: de.designPhasesId,
        designElementStatus: de.designElementStatus,
      }
    }
  })

  const timeLine = inputFields?.protocolTimeLine?.map((tl) => {
    return {
      title: tl.title,
      date: new Date(tl.date),
      description: tl.description,
    }
  })

  const resource = inputFields?.ProtocolResources?.map((tl) => {
    return {
      title: tl.title,
      url: tl.url,
      internal: tl.internal,
    }
  })

  var response = {}

  const txCalls = []

  txCalls.push(
    prisma.protocolTimeLine.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )

  //disconnect
  txCalls.push(
    prisma.post.update({
      where: {
        id: inputFields?.id,
      },
      data: {
        categories: { set: [] },
        tags: { set: [] },
      },
    })
  )

  txCalls.push(
    prisma.designElement.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )

  txCalls.push(
    prisma.postUser.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )

  txCalls.push(
    prisma.mechanism.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )

  // txCalls.push(
  //   prisma.calculation.deleteMany({
  //     where: {
  //       id: inputFields?.Calculation?.id,
  //     },
  //   })
  // )

  txCalls.push(
    prisma.protocolResources.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )
  txCalls.push(
    prisma.post.update({
      where: {
        id: inputFields?.id,
      },
      data: {
        title: inputFields.title,
        slug: inputFields.slug,
        shortDescription: inputFields.shortDescription,
        breakdown: breakdown,
        publishedAt: new Date(),
        DesignElement: {
          createMany: {
            data: DesignElement,
          },
        },
        mainImageUrl: inputFields.mainImageUrl,
        tokenUtility: inputFields.tokenUtility,
        businessModel: inputFields.businessModel,
        valueCreation: inputFields.valueCreation,
        valueCapture: inputFields.valueCapture,
        demandDrivers: inputFields.demandDrivers,
        threeMonthHorizon: inputFields.threeMonthHorizon,
        oneYearHorizon: inputFields.oneYearHorizon,
        upside: inputFields.upside,
        downside: inputFields.downside,
        horizon: inputFields.horizon,
        metrics: inputFields.metrics,
        diagramUrl: inputFields.diagramUrl,
        strongPoints: inputFields.strongPoints,
        weakPoints: inputFields.weakPoints,
        problemSolution: inputFields.problemSolution,
        parent: inputFields.parent,
        authorClerkId: inputFields.authorClerkId,
        // status: postStatus.draft,
        postType: inputFields.postType,
        ticker: inputFields.ticker,
        categories: {
          connectOrCreate: inputFields.categories.map((category) => {
            return {
              where: { value: category.value },
              create: {
                value: category.value,
                label: category.label,
              },
            }
          }),
        },
        tags: {
          connectOrCreate: inputFields.tags.map((tag) => {
            return {
              where: { value: stringToKey(tag.label) },
              create: { value: stringToKey(tag.label), label: tag.label },
            }
          }),
        },
        ProtocolResources: {
          createMany: {
            data: resource,
          },
        },
        PostUser: { create: postUser },
        Mechanism: {
          create: mechanisms,
        },
        Calculation: calculation,
        protocolTimeLine: {
          createMany: {
            data: timeLine,
          },
        },
      },
    })
  )

  // txCalls.push(
  //   prisma.mechanism.createMany({
  //     data: mechanisms,
  //   })
  // )

  try {
    response = await prisma.$transaction(txCalls)
  } catch (e) {
    console.log('🚀 ~ file: updateNewDesign.ts:252 ~ handle ~ e:', e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Slug might already exist!' })
      }
    }
    throw e
  }

  res.json(response)
}
