import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { stringToKey, postStatus } from '../../../lib/helper'

export default async function handle(req, res) {
  const { values } = req.body
  const inputFields = values
  console.log('values NewDesign', values)
  const timeLine = inputFields?.protocolTimeLine?.map((tl) => {
    return {
      ...tl,
      date: new Date(tl.date),
    }
  })

  var breakdown = inputFields.breakdown
  if (typeof inputFields.breakdown === 'object') {
    breakdown = JSON.stringify(inputFields.breakdown)
  }

  var response = {}
  try {
    response = await prisma.post.create({
      data: {
        title: inputFields.title,
        slug: inputFields.slug,
        shortDescription: inputFields.shortDescription,
        breakdown: inputFields.breakdown,
        // published: false,
        // PostUser: inputFields.PostUser,
        publishedAt: new Date(),
        Mechanism: {
          createMany: {
            data: inputFields.Mechanism,
          },
        },
        DesignElement: {
          createMany: {
            data: inputFields.DesignElement,
          },
        },
        mainImageUrl: inputFields.mainImageUrl,
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
        calculationId: inputFields.calculation,
        ProtocolResources: {
          createMany: {
            data: inputFields.ProtocolResources,
          },
        },
        PostUser: {
          createMany: {
            data: inputFields.PostUser,
          },
        },
        protocolTimeLine: {
          createMany: {
            data: timeLine,
          },
        },
        UserStrengthRating: {
          create: {
            authorClerkId: inputFields.authorClerkId,
            userReviewUtility: 'initial',
            userReviewBusinessModel: 'initial',
            userReviewDemandDriver: 'initial',
            userReviewValueCapture: 'initial',
            userReviewValueCreation: 'initial',
            tokenUtilityStrength: inputFields.tokenUtilityStrength,
            businessModelStrength: inputFields.businessModelStrength,
            valueCaptureStrength: inputFields.valueCaptureStrength,
            valueCreationStrength: inputFields.valueCreationStrength,
            demandDriversStrength: inputFields.demandDriversStrength,
          },
        },
      },
    })
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Slug might already exist!' })
        // console.log(
        //   'There is a unique constraint violation, a new user cannot be created with this email'
        // )
      }
    }
    // notify()
    throw e
  }

  console.log(response)
  // return res.json(response);
  return res.status(200).send({ id: response.id })
}
