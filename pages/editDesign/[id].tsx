import { GetServerSideProps } from 'next'
// import Layout from '../../components/layout'
import React from 'react'
import TDFMain from '../../components/tdf/TDFMain'
import {
  clerkConvertJSON,
  // getMergedInitialCalcValues,
  // headerStatus,
} from '../../lib/helper'
import { clerkClient } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  return (
    // <Layout mode={headerStatus.design}>
      <TDFMain props={props} />
    // </Layout>
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

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())

  const [post, mechanismTemplates, designPhases, Category, Tag] =
    await prisma.$transaction(txCalls)

  let clerkUser = post?.authorClerkId
    ? await clerkClient.users.getUser(post?.authorClerkId)
    : {}

  clerkUser = clerkConvertJSON(clerkUser)

  const userId = post?.Comments?.map((comment) => {
    return comment.authorClerkId
  })

  let users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  const commentsWithUserNames = post?.Comments?.map((comment) => {
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
  if (postWithUpdatedComments.Calculation === null) {
    postWithUpdatedComments.Calculation = {}
  }
  postWithUpdatedComments.Calculation.startDate = new Date(
    postWithUpdatedComments?.Calculation?.startDate || ''
  ).toLocaleDateString('en-CA')
  postWithUpdatedComments.DesignElement =
    postWithUpdatedComments?.DesignElement?.map((de) => {
      try {
        var content = JSON.parse(de.content)
      } catch {}
      return {
        ...de,
        content: content,
      }
    })

  return {
    props: {
      post: postWithUpdatedComments || null,
      designPhases: designPhases || null,
      mechanismTemplates: mechanismTemplates || null,
      Category: Category || null,
      Tag: Tag || null,
    },
  }
}
