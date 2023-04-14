import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { getMergedInitialCalcValues, postStatus, postType } from '../lib/helper'
import TDFMain from '../components/tdf/TDFMain'
import { getAuth } from '@clerk/nextjs/server'
import { AuthData } from '@clerk/nextjs/dist/server/types'

export default function NewDesign(props) {
  return (
    <>
      <Layout mode="design">
        <TDFMain props={props} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId: string = context?.query?.id || ''

  const { userId }: AuthData = getAuth(context.req)

  const txCalls = []

  // txCalls.push(
  //   prisma.post.findMany({
  //     where: {
  //       categories: { every: { label: 'defi' } },
  //       AND: {
  //         status: postStatus.published,
  //       },
  //     },
  //     take: 20,
  //   })
  // )

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))
  // txCalls.push(prisma.designPhases.findUnique({ where: { id: postId } }))

  txCalls.push(
    prisma.calculation.findMany({
      where: {
        authorClerkId: userId,
      },
    })
  )

  txCalls.push(
    prisma.mechanism.findMany({
      where: {
        isTemplate: true,
      },
    })
  )

  txCalls.push(
    prisma.postUser.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.category.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.tag.findMany({
      where: {},
    })
  )

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

  const [
    // posts,
    designPhases,
    userCalcs,
    mechanismTemplates,
    PostUser,
    Category,
    Tag,
  ] = await prisma.$transaction(txCalls)

  // console.log("🚀 ~ file: newDesign.tsx:183 ~ constgetServerSideProps:GetServerSideProps= ~ userCalcs:", userCalcs)
  // const preloadInitialCalcValues = null
  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: userId,
    status: postStatus.draft,
    DesignElement: designPhases
      .filter((dp) => dp.parentPhaseId)
      .map((dp) => {
        return {
          id: '',
          content: '',
          designPhasesId: String(dp.phaseId),
          designElementStatus: '',
        }
      }),
    Calculation: {
      id: '',
      title: '',
      authorClerkId: '',
      months: 60,
      totalSupply: 100000000,
      startDate: new Date().toLocaleDateString('en-CA'),
      areaData: [],
      calculationRows: [],
    },
    Mechanism: [],
    mechanismTemplates: mechanismTemplates || [],
    // PostUser: props.PostUser.map((pu) => {
    //   return { id: pu.id, name: pu.name, role: pu.role, postId: pu.postId }
    // }),
    PostUser: [{ id: 0, name: '', role: '' }],
    slug: '',
    shortDescription: '',
    categories: [],
    // categories: Category?.map((cd) => {
    //   return {
    //     value: cd.value,
    //     label: cd.label,
    //   }
    // }),
    tags: [],
    protocolTimeLine: [],
    publishedAt: new Date().toLocaleDateString('en-CA'),
    breakdown: '',
    mainImageUrl: '',
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
    postType: postType.design,
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
  }

  return {
    props: {
      // posts: posts || null,
      post: defaultContent,
      designPhases: designPhases || null,
      // mechanismImpactFactors: mechanismImpactFactors || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      PostUser: PostUser || null,
      Category: Category || null,
      Tag: Tag || null,
    },
  }
}
