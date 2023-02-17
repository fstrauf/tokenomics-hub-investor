import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body

  var Resources = values.Resources
  if (typeof values.Resources === 'object') {
    Resources = JSON.stringify(values.Resources)
  }

  const response = await prisma.designPhases.upsert({
    where: {
      id: values.id,
    },
    update: {
      id: values.id,
      name: values.name,
      parentPhaseId: values.parentPhaseId,
      Resources: Resources,
    },
    create: {
      id: values.id,
      name: values.name,
      parentPhaseId: values.parentPhaseId,
      Resources: Resources,
    },
  })

  res.json(response)
}
