import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
  const { values } = req.body
  // console.log("🚀 ~ file: newCalculation.ts:7 ~ handle ~ values", values)

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
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Entry already exists!' })
        // console.log(
        //   'There is a unique constraint violation, a new user cannot be created with this email'
        // )
      }
    }
    // notify()
    throw e
  }

  // console.log(response)
  return res.json(response)
  // return res.status(200)
}
