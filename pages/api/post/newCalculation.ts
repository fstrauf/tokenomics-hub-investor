import prisma from '../../../lib/prisma';
import {  Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
  const { values } = req.body;
  // console.log("🚀 ~ file: newCalculation.ts:21 ~ handle ~ values.CalculationRows", values.calculationRows)

  var response = {}
  try {
    response = await prisma.calculation.create({
      data: {
        title: values.name,
        authorClerkId: values.authorClerkId,
        months: values.months,
        startDate: new Date(values.startDate),
        totalSupply: values.totalSupply,
        CalculationRows: {
          createMany: {
            data: values.calculationRows,
          }
            
        }
      }
    })
  
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(500).send({ error: 'Entry already exists!' })
      }
    }
    throw e
  }

  return res.status(200).send({ id: response.id })
  // console.log(response)
  // return res.json(response);
  // return res.status(200)
}
