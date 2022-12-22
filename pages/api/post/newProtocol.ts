import prisma from '../../../lib/prisma';
import {  Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
  const { values } = req.body;
  // const notify = () => toast('Here is your toast.');
  const inputFields = values

  // console.log(inputFields)
  // console.log("new " + inputFields.breakdown)

  const timeLine = inputFields?.protocolTimeLine?.map(tl => {
    return {
      ...tl,
      date: new Date(tl.date)
    }
  })

  var response = {}
  try {
    response = await prisma.post.create({
      data: {
        title: inputFields.title,
        slug: inputFields.slug,
        shortDescription: inputFields.shortDescription,
        breakdown: inputFields.breakdown,
        // ourTake: JSON.stringify(ourTake),
        published: false,
        publishedAt: new Date(),
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
        // author: {
        //   connect: {
        //     email: inputFields.Author.email,
        //   }
        // },
        categories: {
          connect: inputFields.categories.map(cat => { return { value: cat.value } })
        },
        tags: {
          connect: inputFields.tags.map(tag => { return { value: tag.value } })
        },
        ProtocolResources: {
          createMany: {
            data: inputFields.ProtocolResources
          }
        },
        protocolTimeLine: {
          createMany: {
            data: timeLine
          }
        }
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
