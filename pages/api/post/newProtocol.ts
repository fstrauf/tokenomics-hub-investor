import prisma from '../../../lib/prisma';
// import {  Prisma } from '@prisma/client'

export default async function handle(req, res) {
  const { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength } = req.body;

  console.log(inputFields)

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
        breakdown: JSON.stringify(deepDive),
        ourTake: JSON.stringify(ourTake),
        published: false,
        publishedAt: new Date(inputFields.publishedAt),
        mainImageUrl: inputFields.mainImage,
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
        horizon: inputFields.decisionHorizon,
        metrics: inputFields.metrics,
        diagramUrl: inputFields.diagramUrl,
        author: {
          connect: {
            email: inputFields.Author.email,
          }
        },
        categories: {
          connect: selectedCats.map(cats => { return { id: cats.id } })
        },
        tags: {
          connect: selectedTags.map(tags => { return { id: tags.id } })
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
    throw e
  }

  res.json(response);
}
