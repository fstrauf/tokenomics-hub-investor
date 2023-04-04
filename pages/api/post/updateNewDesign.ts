import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { postStatus, stringToKey } from '../../../lib/helper'

export default async function handle(req, res) {
  const { values } = req.body
  const inputFields = values

  var breakdown = inputFields.breakdown
  if (typeof inputFields.breakdown === 'object') {
    breakdown = JSON.stringify(inputFields.breakdown)
  }

  const mechanisms = inputFields.Mechanism.map((m) => {
    var postUsers = {}
    if(m?.PostUser === undefined){      

    } else {
      postUsers = {connect: m?.PostUser?.map((pu) => ({
        id: pu.postId + '_' + pu.name,
      }))}
    }

    const calculationTimeSeries =
      m?.CalculationTimeSeries?.map((cts) => ({
        phase: cts.phase,
        months: cts.months,
        tokens: cts.tokens,
      })) || {}
    return {
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
      emissionReductionPerEpoch: m.emissionReductionPerEpoch,
      color: m.color,
      CalculationTimeSeries: {
        create: calculationTimeSeries,
      },
      PostUser: postUsers,
    }
  })

  var DesignElement = inputFields.DesignElement.map((de) => {
    if (typeof de.content === 'object') {
      return {
        content: JSON.stringify(de.content),
        designPhasesId: de.designPhasesId,
      }
    } else {
      return {
        content: de.content,
        designPhasesId: de.designPhasesId,
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

  //this should delete the timeseries too
  txCalls.push(
    prisma.mechanism.deleteMany({
      where: {
        postId: inputFields?.id,
      },
    })
  )

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
        status: postStatus.draft,
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
        PostUser: {
          createMany: {
            // data: inputFields.PostUser.map(({ name, role }) => ({ name, role })),
            data: inputFields.PostUser.map((pu) => ({
              id: pu.postId + '_' + pu.name,
              name: pu.name,
              role: pu.role,
            })),
          },
        },
        Mechanism: {
          create: mechanisms,
        },
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
