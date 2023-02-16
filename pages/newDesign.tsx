import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
// import Post2 from '../components/post2';
import { GetServerSideProps } from 'next'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { postStatus } from '../lib/helper'
// import { getAuth } from '@clerk/nextjs/server';
// import { AuthData } from '@clerk/nextjs/dist/server/types'
import TDFMain from '../components/tdf/TDFMain'

export default function NewDesign(props) {
  const { user } = useUser()

  const today = new Date().toLocaleDateString('en-CA')

  const defaultContent = {
    id: '',
    title: '',
    slug: 'tdao',
    shortDescription: '',
    categories: [],
    tags: [],
    protocolTimeLine: [],
    publishedAt: today,
    breakdown: '',
    mainImageUrl:
      'https://storage.googleapis.com/my-bucket-bbc0e24/Logo_Tokenomics_DAO.png',
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
    ProtocolResources: [],
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
        <TDFMain props={props} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetServerSideProps = async (context) => {
  const txCalls = []
  txCalls.push(
    prisma.post.findMany({
      where: { categories: { every: { label: 'defi' } } },
      take: 3,
    })
  )

  txCalls.push(
    prisma.designPhases.findMany()
  )

  const [posts, designPhases] = await prisma.$transaction(txCalls)

  return {
    props: {
      posts: posts || null,
      designPhases: designPhases || null,
    },
  }
}
