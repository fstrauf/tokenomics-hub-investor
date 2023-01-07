import Layout from '../components/layout'
// import Intro from '../components/intro'
import React from 'react';
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server';
import { AuthData } from '@clerk/nextjs/dist/server/types';

export default function CalculationPage({ initialValues }) {

  const Calculator = dynamic(() => import('../components/calculator'), { loading: () => <p>Loading</p> })
  
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

  const calculations = await prisma.calculation.findMany({
    where: {
      authorClerkId: userId     
    },
    include: {
      CalculationRows:{
        where: {
          calculationId: calculationId,
        }
      },
    },  
  })  

  const initialValues = {
    id: '',
    totalSupply: 100,
    months: 60,
    areaData: [],
    authorClerkId: userId,
    name: '',
    calculations: calculations,
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

  const calc = calculations.filter(obj => {
    return obj.id === calculationId
  })[0]

  if (calc?.CalculationRows.length > 0) {
    initialValues.id = calc.id
    initialValues.totalSupply = calc.totalSupply
    initialValues.months= calc.months
    initialValues.name = calc.title
    initialValues.calculationRows = calc.CalculationRows
    
  }
  
  return {
    props: {
      initialValues: initialValues || null ,
      ...buildClerkProps(context.req)
    },
  }
}