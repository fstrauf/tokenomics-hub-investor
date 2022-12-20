import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
// import Post from '../components/post';
import Post2 from '../components/post2';
// import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]'

export default function NewProtocol({ categories, tags, user }) {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <>
        <Layout>
          <Header />
          <h1>You need to log in to create a protocol</h1>
        </Layout>
      </>
    )
  }

  const today = new Date().toLocaleDateString('en-CA')

  const defaultContent =
  {
    id: '',
    title: '',
    slug: 'tdao',
    shortDescription: '',
    categories: [
      // { value: 1, label: 'DeFi' },
      // { value: 2, label: 'DAO' }
    ],
    tags: [
      // { id: 1, title: 'Great DAO' },
      // { id: 2, title: 'AMM' },
      // { id: 3, title: 'Yield Bearing' }
    ],
    protocolTimeLine: [
      // { title: 'TGE', date: today, description: 'token generation event' }
    ],
    publishedAt: today,
    breakdown: '',
    mainImageUrl: 'https://storage.googleapis.com/my-bucket-bbc0e24/Logo_Tokenomics_DAO.png',
    tokenUtility: '',
    tokenUtilityStrength: 1,
    businessModel: '',
    businessModelStrength: 1,
    valueCreation: '',
    valueCreationStrength: 1,
    valueCapture: '',
    valueCaptureStrength: 1,
    demandDrivers: '',
    demandDriversStrength: 1,
    totalTokenStrength: 1,
    threeMonthHorizon: '',
    oneYearHorizon: '',
    upside: '',
    downside: '',
    horizon: '',
    metrics: '',
    diagramUrl: '',
    ProtocolResources: [
      // { title: 'website', url: 'https://www.tokenomicshub.xyz/', internal: true }
    ],
    Author: { email: user?.email },
    strongPoints: '',
    weakPoints: '',
    problemSolution: '',
    parent: '',
  }

  return (
    <>
      <Layout>
        <Header />
        <h1 className="text-3xl font-bold">
          Submit a draft for review
        </h1>
        {/* <Post content={defaultContent} categories={categories} tags={tags} /> */}
        <Post2 content={defaultContent} categories={categories} tags={tags} />
      </Layout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  const categories = await prisma.category.findMany()
  const tags = await prisma.tag.findMany()

  var user = null
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email        
      },
    });
  }

  console.log(user)

  return {
    props: {
      categories: categories || null,
      tags: tags || null,
      user: user || null
    },
    // revalidate: 1,
  }
}