// import prisma from "../../lib/prisma";

// // PUT /api/publish/:id
// export default async function handle(req, res) {

//   console.log("req " + req.body)
//   // const postId = req.query.id;
//   const { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength } = req.body;

//   const timeLine = inputFields?.protocolTimeLine?.map(tl => {
//     return {
//       ...tl,
//       date: new Date(tl.date)
//     }
//   })
//   var response = {}
//   try {
//     response = await prisma.post.update({
//       where: { id: inputFields.id },
//       data: {
//         title: inputFields.title,
//         slug: inputFields.slug,
//         shortDescription: inputFields.shortDescription,
//         breakdown: JSON.stringify(deepDive),
//         ourTake: JSON.stringify(ourTake),
//         published: false,
//         publishedAt: new Date(inputFields.publishedAt),
//         mainImageUrl: inputFields.mainImage,
//         tokenUtility: inputFields.tokenUtility,
//         tokenUtilityStrength: inputFields.tokenUtilityStrength,
//         businessModel: inputFields.businessModel,
//         businessModelStrength: inputFields.businessModelStrength,
//         valueCreation: inputFields.valueCreation,
//         valueCreationStrength: inputFields.valueCreationStrength,
//         valueCapture: inputFields.valueCapture,
//         valueCaptureStrength: inputFields.valueCaptureStrength,
//         demandDrivers: inputFields.demandDrivers,
//         demandDriversStrength: inputFields.demandDriversStrength,
//         tokenStrength: tokenStrength,
//         threeMonthHorizon: inputFields.threeMonthHorizon,
//         oneYearHorizon: inputFields.oneYearHorizon,
//         upside: inputFields.upside,
//         downside: inputFields.downside,
//         horizon: inputFields.decisionHorizon,
//         metrics: inputFields.metrics,
//         diagramUrl: inputFields.diagramUrl,
//         author: {
//           connect: {
//             email: 'f.strauf@gmail.com',
//           }
//         },
//         categories: {
//           connect: selectedCats.map(cats => { return { id: cats.id } })
//         },
//         tags: {
//           connect: selectedTags.map(tags => { return { id: tags.id } })
//         },
//         ProtocolResources: {
//           createMany: {
//             data: inputFields.resources
//           }
//         },
//         protocolTimeLine: {
//           createMany: {
//             data: timeLine
//           }
//         }
//       }
//     });
//   } catch (e) {
//     throw e
//   }

//   res.json(response);

// }
