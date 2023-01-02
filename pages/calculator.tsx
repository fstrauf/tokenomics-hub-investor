import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react';
// import Calculator from '../components/calculator';
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server';
import { AuthData } from '@clerk/nextjs/dist/server/types';

export default function CalculationPage({ calculations, userId }) {

  const Calculator = dynamic(() => import('../components/calculator'), { loading: () => <p>Loading</p> })
  
  return (
    <>
      <Layout>
        <Intro />
        <Calculator userId={userId} calculations={calculations}/>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const { userId }: AuthData = getAuth(req)

  const calculations = await prisma.calculation.findMany({
    where: {
      authorClerkId: userId     
    },    
  })
  
  return {
    props: {
      calculations: calculations || null,
      userId: userId || null,
      ...buildClerkProps(req)
    },
    // revalidate: 1,
  }
}