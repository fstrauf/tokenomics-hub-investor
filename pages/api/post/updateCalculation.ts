import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
  const { values } = req.body

  var response = {}
  const txCalls = []

  const calcRows = values?.calculationRows?.map(cr => {
    return {
      category: cr.category,
      lockupPeriod: cr.lockupPeriod,
      unlockPeriod: cr.unlockPeriod,
      percentageAllocation: cr.percentageAllocation,
      color: cr.color, 
      isEpochDistro: cr.isEpochDistro,
      epochDurationInSeconds: cr.epochDurationInSeconds,
      initialEmissionPerSecond: cr.initialEmissionPerSecond,
      emissionReductionPerEpoch: cr.emissionReductionPerEpoch,
    }
  })

  txCalls.push(
    prisma.calculationRows.deleteMany({
      where: {
        calculationId: values.id,
      },
    })
  )

  txCalls.push(
    prisma.calculation.update({
      where: {
        id: values.id,
      },
      data: {
        title: values.name,
        authorClerkId: values.authorClerkId,
        months: values.months,
        startDate: new Date(values.startDate),
        totalSupply: values.totalSupply,
        CalculationRows: {
          createMany: {
            data: calcRows,
          },
        },
      },
    })
  )
  try {
    response = await prisma.$transaction(txCalls)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Entry already exists!' })
  
      }
    }
    // notify()
    throw e
  }

  return res.json(response)
  // return res.status(200)
}
