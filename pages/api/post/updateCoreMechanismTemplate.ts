import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body
  // console.log('🚀 ~ file: updateTDFDesignPhases.ts:5 ~ handle ~ values', values)
  var details = values.details
  if (typeof values.details === 'object') {
    details = JSON.stringify(values.details)
  }
  const response = await prisma.mechanism.create({
    data: {
      // phaseId: parseInt(values.phaseId),
      name: values.name,
      summary: values.summary,
      details: details,
      isSink: values.isSink,
      isTemplate: values.isTemplate,
    },
  })

  console.log('response', response)
  res.json(response)
}
