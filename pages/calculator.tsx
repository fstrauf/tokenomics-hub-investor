import Layout from '../components/layout'
// import Intro from '../components/intro'
import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server'
import { AuthData } from '@clerk/nextjs/dist/server/types'

export default function CalculationPage({ initialValues }) {
  const Calculator = dynamic(() => import('../components/calculator'), {
    loading: () => <p>Loading</p>,
  })

  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <Calculator initialValues={initialValues} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const initialValues = {
    id: '',
    totalSupply: 100,
    months: 60,
    areaData: [],
    authorClerkId: userId,
    name: '',
    startDate: new Date().toLocaleDateString('en-CA'),
    calculations: response[0],
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

  if (response[1] !== null) {
    initialValues.id = response[1].id
    initialValues.totalSupply = response[1].totalSupply
    initialValues.months = response[1].months
    initialValues.startDate = new Date(
      response[1].startDate
    ).toLocaleDateString('en-CA')
    initialValues.name = response[1].title
    initialValues.calculationRows = response[1].CalculationRows
  }

  return {
    props: {
      initialValues: initialValues || null,
      ...buildClerkProps(context.req),
    },
  }
}
