import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
import React from 'react'
import TDFMain from '../../components/tdf/TDFMain'
import {
  clerkConvertJSON,
  getMergedInitialCalcValues,
  headerStatus,
} from '../../lib/helper'
import { clerkClient } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  // console.log("🚀 ~ file: [id].tsx:19 ~ props:", props)

  return (
    <Layout mode={headerStatus.design}>
      <TDFMain props={props} />
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
        Mechanism: {
          include: {
            CalculationTimeSeries: {},
          },
        },
        DesignElement: {},
        protocolTimeLine: {},
        ProtocolResources: {},
        Comments: { orderBy: { date: 'desc' } },
        Calculation: {},
        // UserStrengthRating: {},
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

  // txCalls.push(
  //   prisma.postUser.findMany({
  //     where: {},
  //   })
  // )

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  // txCalls.push(
  //   prisma.tag.findMany({
  //     where: {},
  //   })
  // )

  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  // txCalls.push(prisma.calculation.findMany())

  const [
    post,
    mechanismTemplates,
    designPhases,
    Category,
    Tag,
    // calculation
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
  postWithUpdatedComments.Calculation.startDate = new Date(
    postWithUpdatedComments.Calculation.startDate
  ).toLocaleDateString('en-CA')

  return {
    props: {
      // categories: categories || null,
      // tags: tags || null,
      post: postWithUpdatedComments || null,
      designPhases: designPhases || null,
      // preloadInitialCalcValues:
      //   getMergedInitialCalcValues(calculation, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      // PostUser: PostUser || null,
      Category: Category || null,
      Tag: Tag || null,
    },
  }
}
