import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body
  var details = values.details
  
  if (typeof values.details === 'object') {
    details = JSON.stringify(values.details)
  }

  const response = await prisma.mechanism.upsert({
    where: { 
      id: values.id
    },
    update: {
      name: values.name,
      summary: values.summary,
      details: details,
      isSink: values.isSink,
      isTemplate: values.isTemplate,
    },
    create: {
      name: values.name,
      summary: values.summary,
      details: details,
      isSink: values.isSink,
      isTemplate: values.isTemplate,
    },
  })
  res.json(response)
}
