import { GetServerSideProps } from 'next'
import React from 'react'
import TDFMain from '../../components/tdf/TDFMain'
import { clerkConvertJSON, formatDate } from '../../lib/helper'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'
import CommentForm from '../../components/commentForm'
import Comments from '../../components/comments'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  if (Object.keys(props.post).length === 0) {
    return <div>The request object does not exist</div>
  }

  return (
    <>
      <TDFMain props={props} header={props?.post?.postType} />
      <div className="m-auto max-w-md sm:max-w-2xl lg:max-w-screen-2xl">
        <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Comments.
        </h1>
        <CommentForm id={props?.post?.id} />
        <Comments comments={props?.post?.Comments} />
      </div>
    </>
  )
}

export default EditDesign

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = getAuth(context.req) || undefined
  const processedUserId = userId !== null ? userId : ''
  const txCalls = []
  txCalls.push(
    prisma.post.findUnique({
      where: {
        id: String(context.params?.id),
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

  txCalls.push(
    prisma.subscriptions.findUnique({
      where: { authorClerkId: processedUserId },
    })
  )

  const [post, mechanismTemplates, designPhases, Category, Tag, Subscription] =
    await prisma.$transaction(txCalls)
  let postWithUpdatedComments = {}

  if (post !== null) {
    let clerkUser = {}
    try {
      if (post?.authorClerkId) {
        clerkUser = await clerkClient.users.getUser(post.authorClerkId)
      }
    } catch (error) {
      console.error('Error fetching user from Clerk:', error)
      // Handle the error here, e.g. set a default user or show an error message to the user
    }

    clerkUser = clerkConvertJSON(clerkUser)

    const userIds = post?.Comments?.map((comment) => {
      return comment.authorClerkId
    })
    let users = clerkConvertJSON(
      (await clerkClient.users.getUserList({ userIds })) || null
    )

    const commentsWithUserNames =
      post?.Comments?.map((comment) => {
        const currentUser = users?.find((u) => u.id === comment.authorClerkId)

        return {
          ...comment,
          author: currentUser?.username,
        }
      }) || {}

    postWithUpdatedComments = post

    postWithUpdatedComments.Comments = commentsWithUserNames || {}
    postWithUpdatedComments.protocolTimeLine =
      postWithUpdatedComments.protocolTimeLine.map((ptl) => ({
        ...ptl,
        // date: new Date(ptl.date).toLocaleDateString('en-CA'),
        date: formatDate(ptl.date),
      }))
    if (postWithUpdatedComments.Calculation === null) {
      postWithUpdatedComments.Calculation = {}
    } else {
      postWithUpdatedComments.Calculation.startDate = formatDate(
        postWithUpdatedComments?.Calculation?.startDate || new Date()
      )
    }
    // postWithUpdatedComments.Calculation.startDate = new Date(
    //   postWithUpdatedComments?.Calculation?.startDate || ''
    // ).toLocaleDateString('en-CA')

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
  }

  return {
    props: {
      post: postWithUpdatedComments || null,
      designPhases: designPhases || null,
      mechanismTemplates: mechanismTemplates || null,
      Category: Category || null,
      Tag: Tag || null,
      Subscription: Subscription || null,
    },
  }
}
