import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body

  var Resources = values.Resources
  if (typeof values.Resources === 'object') {
    Resources = JSON.stringify(values.Resources)
  }

  const parentPhase = values.parentPhaseId
    ? {
        parentPhase: {connect: { phaseId: parseInt(values.parentPhaseId) }},
      }
    : {}

  const response = await prisma.designPhases.upsert({
    where: {
      phaseId: parseInt(values.phaseId),
    },
    update: {
      name: values.name,
      phaseId: parseInt(values.phaseId),
      ...parentPhase,
      Resources: Resources,
    },
    create: {
      phaseId: parseInt(values.phaseId),
      name: values.name,
      ...parentPhase,
      Resources: Resources,
    },
  })

  res.json(response)
}
