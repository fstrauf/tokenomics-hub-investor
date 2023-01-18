import Layout from '../components/layout'
import React from 'react';
import prisma from '../lib/prisma'
import Post2 from '../components/post2';
import { GetServerSideProps } from 'next';
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser';
import { postStatus } from '../lib/helper';

export default function NewProtocol({ categories, tags, calculations }) {

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
        <Post2 content={defaultContent} categories={categories} tags={tags} calculations={calculations} />
      </Layout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {

  const txCalls = []
  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  txCalls.push(prisma.calculation.findMany())

  const response = await prisma.$transaction(
    txCalls
  )

  return {
    props: {
      categories: response[0] || null,
      tags: response[1] || null,
      calculations: response[2] || null,
    },
  }
}