import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
// import prisma from '../../lib/prisma'
import React from 'react'
import TDFMain from '../../components/tdf/TDFMain'
import {
  clerkConvertJSON,
  getMergedInitialCalcValues,
  initialCalculatorValues,
  postStatus,
} from '../../lib/helper'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  console.log('props in edit', props)
  const today = new Date().toLocaleDateString('en-CA')
  const { user } = useUser()

  const editContent = {
    id: props.post.id,
    title: props.post.title,
    authorClerkId: props.post.authorClerkId,
    status: props.post.status,
    DesignElement: props.post.DesignElement.filter(
      (dp) => dp.designPhasesId
    ).map((dp) => {
      return {
        id: dp.id,
        content: dp.content,
        designPhasesId: dp.designPhasesId,
      }
    }),
    calculation: initialCalculatorValues,
    Mechanism: props.post.Mechanism.map((mt) => {
      return {
        name: mt.name,
        summary: mt.summary,
        details: mt.details,
        isSink: mt.isSink,
        isTemplate: mt.isTemplate,
      }
    }),
    // PostUser: props.PostUser.map((pu) => {
    //   return { id: pu.id, name: pu.name, role: pu.role, postId: pu.postId }
    // }),
    PostUser: [{ name: '', role: '' }],
    slug: props.post.slug,
    shortDescription: props.post.shortDescription,
    categories: props.post.categories.map((cd) => {
      return {
        value: cd.value,
        label: cd.label,
      }
    }),
    // tags: [],
    tags: props.post.tags.map((td) => {
      return {
        value: td.value,
        label: td.label,
      }
    }),
    protocolTimeLine: [],
    publishedAt: today,
    breakdown: props.post.breakdown,
    mainImageUrl: props.post.mainImageUrl,
    tokenUtility: props.post.tokenUtility,
    tokenUtilityStrength: props.post.tokenUtilityStrength,
    businessModel: props.post.businessModel,
    businessModelStrength: props.post.businessModelStrength,
    valueCreation: props.post.valueCreation,
    valueCreationStrength: props.post.valueCreationStrength,
    valueCapture: props.post.valueCapture,
    valueCaptureStrength: props.post.valueCaptureStrength,
    demandDrivers: props.post.demandDrivers,
    demandDriversStrength: props.post.demandDriversStrength,
    totalTokenStrength: props.post.totalTokenStrength,
    threeMonthHorizon: props.post.threeMonthHorizon,
    oneYearHorizon: props.post.oneYearHorizon,
    upside: props.post.upside,
    downside: props.post.downside,
    horizon: props.post.horizon,
    metrics: props.post.metrics,
    diagramUrl: props.post.diagramUrl,
    ProtocolResources: [],
    // Author: { email: user?.email },
    strongPoints: props.post.strongPoints,
    weakPoints: props.post.weakPoints,
    problemSolution: props.post.problemSolution,
    parent: props.post.parent,
    ticker: props.post.ticker,
  }

  return (
    <Layout>
      <TDFMain props={props} content={editContent} />
    </Layout>
  )
}

export default EditDesign

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const txCalls = []
  txCalls.push(
    prisma.post.findUnique({
      where: {
        id: String(params?.id),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
        categories: {
          select: { value: true, label: true },
        },

        tags: {
          select: { value: true, label: true },
        },
        Mechanism: {},
        DesignElement: {},
        protocolTimeLine: {},
        ProtocolResources: {},
        Comments: { orderBy: { date: 'desc' } },
        // calculationId: {},
        calculation: {},
        UserStrengthRating: {},
        PostUser: {},
        PostAuthor: {},
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

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(
    prisma.tag.findMany({
      where: {},
    })
  )

  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  txCalls.push(prisma.calculation.findMany())

  const [
    post,
    userCalcs,
    mechanismTemplates,
    designPhases,
    PostUser,
    Category,
    Tag,
  ] = await prisma.$transaction(txCalls)

  let clerkUser = post?.authorClerkId
    ? await clerkClient.users.getUser(post?.authorClerkId)
    : {}

  clerkUser = clerkConvertJSON(clerkUser)

  const userId = post.Comments.map((comment) => {
    return comment.authorClerkId
  })

  let users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  const commentsWithUserNames = post.Comments.map((comment) => {
    const currentUser = users?.find((u) => u.id === comment.authorClerkId)

    return {
      ...comment,
      author: currentUser?.username,
    }
  })

  let postWithUpdatedComments = post
  postWithUpdatedComments.Comments = commentsWithUserNames
  postWithUpdatedComments.protocolTimeLine =
    postWithUpdatedComments.protocolTimeLine.map((ptl) => ({
      ...ptl,
      date: new Date(ptl.date).toLocaleDateString('en-CA'),
    }))

  return {
    props: {
      // categories: categories || null,
      // tags: tags || null,
      post: post || null,
      designPhases: designPhases || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      PostUser: PostUser || null,
      Category: Category || null,
      Tag: Tag || null,
    },
  }
}
