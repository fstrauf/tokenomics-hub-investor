
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength } = req.body;

  // console.log(inputFields)

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
      breakdown: JSON.stringify(deepDive),
      ourTake: JSON.stringify(ourTake),
      // published: false,
      publishedAt: new Date(inputFields.publishedAt),
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
      tokenStrength: tokenStrength,
      threeMonthHorizon: inputFields.threeMonthHorizon,
      oneYearHorizon: inputFields.oneYearHorizon,
      upside: inputFields.upside,
      downside: inputFields.downside,
      horizon: inputFields.horizon,
      metrics: inputFields.metrics,
      diagramUrl: inputFields.diagramUrl,
      // author: {
      //   connect: {
      //     email: 'f.strauf@gmail.com',
      //   }
      // },
      categories: {
        connect: selectedCats.map(cats => { return { id: cats.id } })
      },
      tags: {
        connect: selectedTags.map(tags => { return { id: tags.id } })
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
