import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body

  var Resources = values.Resources
  if (typeof values.Resources === 'object') {
    Resources = JSON.stringify(values.Resources)
  }

  const response = await prisma.designPhases.upsert({
    where: {
      phaseId: parseInt(values.phaseId),
    },
    update: {
      // id: parseInt(values.id),
      name: values.name,
      phaseId: parseInt(values.phaseId),
      parentPhase: { connect: { phaseId: parseInt(values.parentPhaseId) } },
      Resources: Resources,
    },
    create: {
      // id: parseInt(values.id),
      phaseId: parseInt(values.phaseId),
      name: values.name,
      parentPhase: { connect: { phaseId: parseInt(values.parentPhaseId) } },
      Resources: Resources,
    },
  })

  res.json(response)
}
