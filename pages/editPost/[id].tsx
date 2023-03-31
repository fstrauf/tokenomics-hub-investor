 import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
import prisma from '../../lib/prisma'
import React from 'react'
import Post from '../../components/post2'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON } from '../../lib/helper'
import Comments from '../../components/comments'
import CommentForm from '../../components/commentForm'

const EditPost: React.FC<PostProps> = (props) => {
  console.log("🚀 ~ file: [id].tsx:12 ~ props", props)
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

  const [post, categories, tags, calculations] = await prisma.$transaction(txCalls)

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
  postWithUpdatedComments.protocolTimeLine = postWithUpdatedComments.protocolTimeLine.map(ptl => ({...ptl, date: new Date(ptl.date).toLocaleDateString('en-CA')}) )

  return {
    props: {
      categories: categories || null,
      tags: tags || null,
      post: postWithUpdatedComments || null,
      calculations: calculations || null,
      author: clerkUser || null,
    },
  }
}
