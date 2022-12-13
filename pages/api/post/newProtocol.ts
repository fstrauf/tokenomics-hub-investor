
// import { TransformStreamDefaultController } from 'node:stream/web';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength } = req.body;

  // selectedCats.map(cats => { return {id: cats.id}})
  // selectedTags.map(tags => { return {id: tags.id}})

  // console.log(inputFields.resources)

  const timeLine = inputFields?.timeLine?.map(tl => {
    return {
      ...tl,
      date: new Date(tl.date)
    }
  })

  console.log(timeLine)

  const response = await prisma.post.create({
    data: {
      title: inputFields.title,
      slug: inputFields.slug,
      shortDescription: inputFields.shortDescription,
      breakdown: JSON.stringify(deepDive),
      ourTake: JSON.stringify(ourTake),
      published: false,
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
      horizon: inputFields.decisionHorizon,
      metrics: inputFields.metrics,
      diagramUrl: inputFields.diagramUrl,
      author: {
        connect: {
          email: 'f.strauf@gmail.com',
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
          data: inputFields.resources
        }
      },
      protocolTimeLine: {
        createMany: {
          data: timeLine
        }
      }
    },
  })

  res.json(response);
}
