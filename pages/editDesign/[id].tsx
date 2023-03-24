import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
// import prisma from '../../lib/prisma'
import React from 'react'
// import Post from '../../components/post2'
// import { clerkClient } from '@clerk/nextjs/server'
// import { clerkConvertJSON } from '../../lib/helper'
// import Comments from '../../components/comments'
// import CommentForm from '../../components/commentForm'
import TDFMain from '../../components/tdf/TDFMain'
import { clerkConvertJSON, getMergedInitialCalcValues } from '../../lib/helper'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'
import { AuthData } from '@clerk/nextjs/dist/server/types'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  console.log('props in edit', props)
  return (
    <Layout>
      <TDFMain props={props} content={props} />
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
        protocolTimeLine: {},
        ProtocolResources: {},
        Comments: { orderBy: { date: 'desc' } },
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
    categories,
    tags,
    calculations,
    posts,
    designPhases,
    userCalcs,
    mechanismTemplates,
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
      categories: categories || null,
      tags: tags || null,
      post: postWithUpdatedComments || null,
      calculations: calculations || null,
      author: clerkUser || null,
      // posts: posts || null,
      designPhases: designPhases || null,
      // mechanismImpactFactors: mechanismImpactFactors || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      PostUser: PostUser || null,
      // Category: Category || null,
      // Tag: Tag || null,
    },
  }
}
