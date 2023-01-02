import prisma from '../../../lib/prisma';
// import {  Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
    const { calculationId } = req.body;

    const calcRows = await prisma.calculation.findUnique({
        where: {
            id: calculationId
        },
        include: {
            CalculationRows:{},
        }
    })
    // console.log("🚀 ~ file: getCalculationRows.ts:13 ~ handle ~ calcRows", calcRows)

    return res.status(200).send(calcRows)
    // return res.json(calcRows);
}