import Layout from '../components/layout'
import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import { initialCalculatorValues, getMergedInitialCalcValues } from '../lib/helper'

export default function CalculationPage({ preloadInitialValues }) {  
  const Calculator = dynamic(() => import('../components/calculator'), {
    loading: () => <p>Loading</p>,
  })

  return (
    <>
      <Layout>
        <Calculator preloadInitialValues={preloadInitialValues} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
// console.log("🚀 ~ file: calculator.tsx:25 ~ constgetServerSideProps:GetServerSideProps= ~ context:", context.req)

  // const initialValues = initialCalculatorValues

  const calculationId: string = context?.query?.id || ''

  const { userId }: AuthData = getAuth(context.req)

  const txCalls = []
  //get users calculations
  txCalls.push(
    prisma.calculation.findMany({
      where: {
        authorClerkId: userId,
      },
    })
  )

  txCalls.push(
    prisma.calculation.findUnique({
      where: {
        id: calculationId,
      },
      include: {
        CalculationRows: true,
      },
    })
  )

  const [userCalcs, detailedCalc] = await prisma.$transaction(txCalls)

  // var preloadInitialValues = initialValues

  // preloadInitialValues.calculations = userCalcs
  // preloadInitialValues.authorClerkId = userId

  // if (detailedCalc !== null) {
  //   preloadInitialValues.id = detailedCalc.id
  //   preloadInitialValues.totalSupply = detailedCalc.totalSupply
  //   preloadInitialValues.months = detailedCalc.months
  //   preloadInitialValues.startDate = new Date(
  //     detailedCalc.startDate
  //   ).toLocaleDateString('en-CA')
  //   preloadInitialValues.name = detailedCalc.title
  //   preloadInitialValues.calculationRows = detailedCalc.CalculationRows
  // }

  return {
    props: {
      // preloadInitialValues: preloadInitialValues || null,
      preloadInitialValues: getMergedInitialCalcValues(userCalcs, userId, detailedCalc) || null,
      ...buildClerkProps(context.req),
    },
  }
}
