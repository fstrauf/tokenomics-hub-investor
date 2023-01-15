import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
import prisma from '../../lib/prisma'
import React from 'react'
import Post from '../../components/post2'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON } from '../../lib/helper'

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

  return {
    props: {
      categories: response[1] || null,
      tags: response[2] || null,
      post: response[0] || null,
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
      </div>
    </Layout>
  )
}

export default EditPost
