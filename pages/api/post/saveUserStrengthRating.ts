import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { getTotalStrength } from '../../../lib/helper'

export default async function handle(req, res) {
  const { values, userId } = req.body
  console.log("🚀 ~ file: saveUserStrengthRating.ts:7 ~ handle ~ userId", userId)
  console.log("🚀 ~ file: saveUserStrengthRating.ts:7 ~ handle ~ values", values)

  //load the strength rating on slug page
  var response = {}

  const postId = values?.postId || values?.id

  const txCalls = []

  txCalls.push(prisma.userStrengthRating.upsert({
    where: {
      id: values.id,
    },
    create: {
      post: {
        connect: {
          // id: values?.id, // this is only called when not reviews exit
          id: postId,
        },
      },
      userReviewUtility: values.userReviewUtility,
      userReviewDemandDriver: values.userReviewDemandDriver,
      userReviewValueCreation: values.userReviewValueCreation,
      userReviewValueCapture: values.userReviewValueCapture,
      userReviewBusinessModel: values.userReviewBusinessModel,
      tokenUtilityStrength: values.tokenUtilityStrength,
      businessModelStrength: values.businessModelStrength,
      valueCreationStrength: values.valueCreationStrength,
      valueCaptureStrength: values.valueCaptureStrength,
      demandDriversStrength: values.demandDriversStrength,
      authorClerkId: userId,
    },
    update: {
      userReviewUtility: values.userReviewUtility,
      userReviewDemandDriver: values.userReviewDemandDriver,
      userReviewValueCreation: values.userReviewValueCreation,
      userReviewValueCapture: values.userReviewValueCapture,
      userReviewBusinessModel: values.userReviewBusinessModel,
      tokenUtilityStrength: values.tokenUtilityStrength,
      businessModelStrength: values.businessModelStrength,
      valueCreationStrength: values.valueCreationStrength,
      valueCaptureStrength: values.valueCaptureStrength,
      demandDriversStrength: values.demandDriversStrength,
      authorClerkId: userId,
    },
  }))

  txCalls.push(prisma.userStrengthRating.aggregate({
    _avg: {
      tokenUtilityStrength: true,
      businessModelStrength: true,
      valueCreationStrength: true,
      valueCaptureStrength: true,
      demandDriversStrength: true,
    },
    where: {
      postId: postId,
    }
  }))

  try {
    response = await prisma.$transaction(txCalls)
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(500).send({ error: 'Slug might already exist!' })
      }
    }
    throw e
  }
const postUpdate = await prisma.post.update({
  where: {
    // id: values.id,
    id: postId,
  },
  data: {
    tokenStrength: Number(getTotalStrength(response[1]?._avg).toFixed(1)),
    tokenUtilityStrength: Number(response[1]?.tokenUtilityStrength.toFixed(1)),
    valueCaptureStrength: Number(response[1]?.valueCaptureStrength.toFixed(1)),
    valueCreationStrength: Number(response[1]?.valueCreationStrength.toFixed(1)),
    demandDriversStrength: Number(response[1]?.demandDriversStrength.toFixed(1)),
    businessModelStrength: Number(response[1]?.businessModelStrength.toFixed(1)),
  }    
})

  return res.status(200).send({ id: response[0].id })
}
