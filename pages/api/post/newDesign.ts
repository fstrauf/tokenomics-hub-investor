import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { stringToKey, postStatus } from '../../../lib/helper'

export default async function handle(req, res) {
  const { values } = req.body
  const inputFields = values
  const timeLine = inputFields?.protocolTimeLine?.map((tl) => {
    return {
      ...tl,
      date: new Date(tl.date),
    }
  })

  const mechanisms = inputFields.Mechanism.map((m) => {
    var postUsers = {}
    if (m?.PostUser === undefined) {
    } else {
      postUsers = {
        connect: m?.PostUser?.map((pu) => ({
          id: pu.postId + '_' + pu.name,
        })),
      }
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
      // postId: m.postId,
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

  var breakdown = inputFields.breakdown
  if (typeof inputFields.breakdown === 'object') {
    breakdown = JSON.stringify(inputFields.breakdown)
  }

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

  var response = {}
  try {
    response = await prisma.post.create({
      data: {
        title: inputFields.title,
        slug: inputFields.slug,
        shortDescription: inputFields.shortDescription,
        publishedAt: new Date(),
        DesignElement: {
          createMany: {
            data: DesignElement,
          },
        },
        mainImageUrl: inputFields.mainImageUrl,
        breakdown: breakdown,
        tokenUtility: inputFields.tokenUtility,
        tokenUtilityStrength: inputFields.tokenUtilityStrength,
        businessModel: inputFields.businessModel,
        businessModelStrength: inputFields.businessModelStrength,
        valueCreation: inputFields.valueCreation,
        valueCreationStrength: inputFields.valueCreationStrength,
        valueCapture: inputFields.valueCapture,
        valueCaptureStrength: inputFields.valueCaptureStrength,
        demandDrivers: inputFields.demandDrivers,
        demandDriversStrength: inputFields.demandDriversStrength,
        tokenStrength: inputFields.tokenStrength,
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
        postType: inputFields.postType,
        Calculation: {
          create: {
            authorClerkId: inputFields.Calculation.authorClerkId,
            months: inputFields.Calculation.months,
            startDate: new Date(inputFields.Calculation.startDate),
            title: inputFields.Calculation.title,
            totalSupply: inputFields.Calculation.totalSupply,
          },
        },
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
            data: inputFields.ProtocolResources,
          },
        },
        PostUser: {
          createMany: {
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
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        return res.status(500).send({ error: 'Error while saving!' })
      }
    }
    // notify()
    throw e
  }
  return res.status(200).send({ id: response.id })
}
