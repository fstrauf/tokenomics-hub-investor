import Layout from '../components/layout'
// import Intro from '../components/intro'
import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server'
import { AuthData } from '@clerk/nextjs/dist/server/types'

export default function CalculationPage({ preloadInitialValues }) {  
  const Calculator = dynamic(() => import('../components/calculator'), {
    loading: () => <p>Loading</p>,
  })

  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <Calculator preloadInitialValues={preloadInitialValues} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const initialValues = {
    id: '',
    totalSupply: 100,
    months: 60,
    areaData: [],
    // authorClerkId: userId,
    authorClerkId: '',
    name: '',
    startDate: new Date().toLocaleDateString('en-CA'),
    // calculations: response[0],
    calculations: '',  
    calculationRows: [
      {
        category: 'Treasury',
        lockupPeriod: 5,
        unlockPeriod: 12,
        percentageAllocation: 30,
        color: '#FF6666',
      },
      {
        category: 'Team',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 15,
        color: '#028090',
      },
      {
        category: 'Investors',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 15,
        color: '#66FFB3',
      },
      {
        category: 'Advisors',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 10,
        color: '#996EFF',
      },
      {
        category: 'Airdrops',
        lockupPeriod: 0,
        unlockPeriod: 12,
        percentageAllocation: 30,
        color: '#333C45',
      },
    ],
  }

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

  const response = await prisma.$transaction(txCalls)

  var preloadInitialValues = initialValues

  preloadInitialValues.calculations = response[0]
  preloadInitialValues.authorClerkId = userId

  if (response[1] !== null) {
    preloadInitialValues.id = response[1].id
    preloadInitialValues.totalSupply = response[1].totalSupply
    preloadInitialValues.months = response[1].months
    preloadInitialValues.startDate = new Date(
      response[1].startDate
    ).toLocaleDateString('en-CA')
    preloadInitialValues.name = response[1].title
    preloadInitialValues.calculationRows = response[1].CalculationRows
  }

  return {
    props: {
      preloadInitialValues: preloadInitialValues || null,
      ...buildClerkProps(context.req),
    },
  }
}
