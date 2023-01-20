import Layout from '../components/layout'
import React from 'react';
import prisma from '../lib/prisma'
import Post2 from '../components/post2';
import { GetServerSideProps } from 'next';
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser';
import { postStatus } from '../lib/helper';
import { getAuth } from '@clerk/nextjs/server';
import { AuthData } from '@clerk/nextjs/dist/server/types'

export default function NewProtocol({ categories, tags, calculations, preloadInitialValues }) {

  const { user } = useUser();

  const today = new Date().toLocaleDateString('en-CA')

  const defaultContent =
  {
    id: '',
    title: '',
    slug: 'tdao',
    shortDescription: '',
    categories: [
    ],
    tags: [
    ],
    protocolTimeLine: [
    ],
    publishedAt: today,
    breakdown: '',
    mainImageUrl: 'https://storage.googleapis.com/my-bucket-bbc0e24/Logo_Tokenomics_DAO.png',
    tokenUtility: '',
    tokenUtilityStrength: 0,
    businessModel: '',
    businessModelStrength: 0,
    valueCreation: '',
    valueCreationStrength: 0,
    valueCapture: '',
    valueCaptureStrength: 0,
    demandDrivers: '',
    demandDriversStrength: 0,
    totalTokenStrength: 0,
    threeMonthHorizon: '',
    oneYearHorizon: '',
    upside: '',
    downside: '',
    horizon: '',
    metrics: '',
    diagramUrl: '',
    ProtocolResources: [
    ],
    // Author: { email: user?.email },
    strongPoints: '',
    weakPoints: '',
    problemSolution: '',
    parent: '',
    authorClerkId: user.id,
    status: postStatus.draft,
    // isMinimal: true,
  }

  return (
    <>
      <Layout>        
        {/* <Post2 content={defaultContent} categories={categories} tags={tags} calculations={calculations} preloadInitialValues={preloadInitialValues} /> */}
        <Post2 content={defaultContent} categories={categories} tags={tags} calculations={calculations} />
      </Layout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  // const initialValues = {
  //   id: '',
  //   totalSupply: 100,
  //   months: 60,
  //   areaData: [],
  //   // authorClerkId: userId,
  //   authorClerkId: '',
  //   name: '',
  //   startDate: new Date().toLocaleDateString('en-CA'),
  //   // calculations: response[0],
  //   calculations: '',  
  //   calculationRows: [
  //     {
  //       category: 'Treasury',
  //       lockupPeriod: 5,
  //       unlockPeriod: 12,
  //       percentageAllocation: 30,
  //       color: '#FF6666',
  //     },
  //     {
  //       category: 'Team',
  //       lockupPeriod: 0,
  //       unlockPeriod: 12,
  //       percentageAllocation: 15,
  //       color: '#028090',
  //     },
  //     {
  //       category: 'Investors',
  //       lockupPeriod: 0,
  //       unlockPeriod: 12,
  //       percentageAllocation: 15,
  //       color: '#66FFB3',
  //     },
  //     {
  //       category: 'Advisors',
  //       lockupPeriod: 0,
  //       unlockPeriod: 12,
  //       percentageAllocation: 10,
  //       color: '#996EFF',
  //     },
  //     {
  //       category: 'Airdrops',
  //       lockupPeriod: 0,
  //       unlockPeriod: 12,
  //       percentageAllocation: 30,
  //       color: '#333C45',
  //     },
  //   ],
  // }

  // const calculationId: string = context?.query?.id || ''

  // const { userId }: AuthData = getAuth(context.req)




  //old stuff
  const txCalls = []
  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  txCalls.push(prisma.calculation.findMany())
  // txCalls.push(
  //   prisma.calculation.findUnique({
  //     where: {
  //       id: calculationId,
  //     },
  //     include: {
  //       CalculationRows: true,
  //     },
  //   })
  // )

  const response = await prisma.$transaction(
    txCalls
  )

  // var preloadInitialValues = initialValues

  // preloadInitialValues.calculations = response[2]
  // preloadInitialValues.authorClerkId = userId

  // if (response[3] !== null) {
  //   preloadInitialValues.id = response[3].id
  //   preloadInitialValues.totalSupply = response[3].totalSupply
  //   preloadInitialValues.months = response[3].months
  //   preloadInitialValues.startDate = new Date(
  //     response[3].startDate
  //   ).toLocaleDateString('en-CA')
  //   preloadInitialValues.name = response[3].title
  //   preloadInitialValues.calculationRows = response[3].CalculationRows
  // }

  return {
    props: {
      categories: response[0] || null,
      tags: response[1] || null,
      calculations: response[2] || null,
      // preloadInitialValues: preloadInitialValues || null,
      // ...buildClerkProps(context.req),
    },
  }
}