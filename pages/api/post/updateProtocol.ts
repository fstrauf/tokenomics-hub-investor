
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { values } = req.body;


  const inputFields = values

  // console.log(inputFields.tags.map(tag => {
  //   return {
  //     value: tag.value
  //   }
  // }
  // ))


  const timeLine = inputFields?.protocolTimeLine?.map(tl => {
    return {
      // ...tl,
      title: tl.title,
      date: new Date(tl.date),
      description: tl.description,
    }
  })

  const resource = inputFields?.ProtocolResources?.map(tl => {
    return {
      title: tl.title,
      url: tl.url,
      internal: tl.internal,
    }
  })

  var response = {}

  const txCalls = []

  txCalls.push(prisma.protocolTimeLine.deleteMany({
    where: {
      postId: inputFields?.id,
    }
  }))
  txCalls.push(prisma.protocolResources.deleteMany({
    where: {
      postId: inputFields?.id,
    }
  }))
  txCalls.push(prisma.post.update({
    where: {
      id: inputFields?.id,
    },
    data: {
      title: inputFields.title,
      slug: inputFields.slug,
      shortDescription: inputFields.shortDescription,
      breakdown: JSON.stringify(inputFields.breakdown),
      // ourTake: JSON.stringify(ourTake),
      // published: false,
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
      // author: {
      //   connect: {
      //     email: 'f.strauf@gmail.com',
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
          data: resource,
        }
      },
      protocolTimeLine: {
        createMany: {
          data: timeLine
        }
      }
    },
  }))

  try {
    response = await prisma.$transaction(
      txCalls
    )

  } catch (e) {
    throw e
  }

  res.json(response);
}
