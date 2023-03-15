import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { getMergedInitialCalcValues, postStatus } from '../lib/helper'
import TDFMain from '../components/tdf/TDFMain'
import { getAuth } from '@clerk/nextjs/server'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import { initialCalculatorValues } from '../lib/helper'

export default function NewDesign(props) {
  // console.log("🚀 ~ file: newDesign.tsx:10 ~ NewDesign ~ props", props)
  const { user } = useUser()

  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: user.id,
    status: postStatus.draft,
    DesignElement: props.designPhases
      .filter((dp) => dp.parentPhaseId)
      .map((dp) => {
        return { id: '', content: '', designPhaseId: dp.phaseId }
      }),
    calculation: initialCalculatorValues,
    Mechanism: [],
    PostUser: [{id: 1,name: 'Athlete', role: 'Build and audience on the platform'}]
  }

  return (
    <>
      <Layout>
        <TDFMain props={props} content={defaultContent} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("🚀 ~ file: newDesign.tsx:35 ~ constgetStaticProps:GetServerSideProps= ~ context:", context.req)

  const { userId }: AuthData = getAuth(context.req)

  // const userId = null
  const txCalls = []
  txCalls.push(
    prisma.post.findMany({
      where: { categories: { every: { label: 'defi' } } },
      take: 3,
    })
  )

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  // txCalls.push(prisma.mechanismImpactFactors.findMany({}))

  txCalls.push(
    prisma.calculation.findMany({
      where: {
        authorClerkId: userId,
      },
    })
  )

  txCalls.push(prisma.mechanism.findMany({
    where: {
      isTemplate: true
    }
  }))

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

  const [posts, designPhases, userCalcs, mechanismTemplates] =
    await prisma.$transaction(txCalls)

  // const preloadInitialCalcValues = null

  return {
    props: {
      posts: posts || null,
      designPhases: designPhases || null,
      // mechanismImpactFactors: mechanismImpactFactors || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
    },
  }
}
