import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Post from '../components/post';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function NewProtocol({ categories, tags, user }) {

  const today = new Date().toLocaleDateString('en-CA')

  const defaultContent =
  {
    title: 'Tokenomics DAO',
    slug: 'tdao',
    shortDescription: 'A great place to discuss Tokenomics',
    categories: [
      { id: 1, title: 'DeFi' },
      { id: 2, title: 'DAO' }
    ],
    tags: [
      { id: 1, title: 'Great DAO' },
      { id: 2, title: 'AMM' },
      { id: 3, title: 'Yield Bearing' }
    ],
    protocolTimeLine: [
      { title: 'TGE', date: today, description: 'token generation event' }
    ],
    publishedAt: today,
    mainImageUrl: '',
    tokenUtility: 'Governance',
    tokenUtilityStrength: 50,
    businessModel: 'Consulting, Education, Content',
    businessModelStrength: 80,
    valueCreation: 'Produce great content',
    valueCreationStrength: 70,
    valueCapture: 'Holders govern over treausry',
    valueCaptureStrength: 60,
    demandDrivers: 'Decide over what happens with revenue',
    demandDriversStrength: 80,
    totalTokenStrength: 100,
    threeMonthHorizon: 'bear market',
    oneYearHorizon: 'will be over soon',
    upside: 'TDAO creates a ton of revenue',
    downside: 'tokens are a scam',
    decisionHorizon: 'very long term',
    metrics: 'revnue, profit, growth',
    diagramUrl: 'https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=tokenomics_BanklessDAO.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1w7W4n-NS7DPGq1e-2KaErjTEhjQMQFCs%26export%3Ddownload',
    ProtocolResources: [
      { title: 'website', url: 'https://www.tokenomicshub.xyz/', internal: true }
    ],
    Author: { email: user.email }
  }

  return (
    <>
      <Layout>
        <Header />
        <h1 className="text-3xl font-bold">
          Submit a draft for review
        </h1>
        <Post content={defaultContent} categories={categories} tags={tags} />
      </Layout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

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

  return {
    props: {
      categories: categories || null,
      tags: tags || null,
      user: user || null
    },
    // revalidate: 1,
  }
}