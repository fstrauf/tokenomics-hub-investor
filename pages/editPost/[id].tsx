import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
import prisma from '../../lib/prisma'
import React from 'react'
import Post from '../../components/post2'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON } from '../../lib/helper'
import Comments from '../../components/comments'
import CommentForm from '../../components/commentForm'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
        categories: {},
        tags: {},
        protocolTimeLine: {},
        ProtocolResources: {},
        Comments: { orderBy: { date: 'desc'} },
      },
    })
  )

  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  txCalls.push(prisma.calculation.findMany())

  const response = await prisma.$transaction(txCalls)

  let clerkUser = response[0]?.authorClerkId
    ? await clerkClient.users.getUser(response[0]?.authorClerkId)
    : {}

  clerkUser = clerkConvertJSON(clerkUser)

  const userId = response[0].Comments.map((comment) => {
    return comment.authorClerkId
  })

  let users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  const commentsWithUserNames = response[0].Comments.map((comment) => {
    const currentUser = users?.find((u) => u.id === comment.authorClerkId)

    return {
      ...comment,
      author: currentUser?.username,
    }
  })

  let postWithUpdatedComments = response[0]
  postWithUpdatedComments.Comments = commentsWithUserNames

  return {
    props: {
      categories: response[1] || null,
      tags: response[2] || null,
      post: postWithUpdatedComments || null,
      calculations: response[3] || null,
      author: clerkUser || null,
    },
  }
}

const EditPost: React.FC<PostProps> = (props) => {
  return (
    <Layout>
      <div>
        <Post
          content={props.post}
          categories={props.categories}
          tags={props.tags}
          calculations={props.calculations}
          author={props.author}
        />
        <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Comments.
        </h1>
        <CommentForm id={props?.post?.id} />
        <Comments comments={props?.post?.Comments} />
      </div>
    </Layout>
  )
}

export default EditPost
