import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import Drafts from '../components/drafts'
import { GetServerSideProps } from 'next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { AuthData } from '@clerk/nextjs/dist/server/types'
import { clerkConvertJSON, headerStatus, postStatus } from '../lib/helper'
import Link from 'next/link'

export default function MyDrafts({ posts }) {

  return (
    <>
      <Layout mode={headerStatus.report}>
        {/* <Header /> */}
        <div className="flex items-center justify-between">
          <h1 className="mb-5 mt-10 text-2xl font-bold">
            My Unpublished Drafts
          </h1>{' '}
          <Link
            href="/newProtocol"
            className="w-32 self-center rounded-md bg-dao-red px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            New Draft
          </Link>
        </div>

        <Drafts posts={posts} context="myDrafts" />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { userId }: AuthData = getAuth(req)

  const posts = await prisma.post.findMany({
    where: {
      status: {
        not: postStatus.published,
      },
      authorClerkId: userId,
    },
    include: {
      categories: {
        select: {
          label: true,
        },
      },
      tags: {
        select: {
          label: true,
        },
      },
      author: {},
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  let user = userId ? await clerkClient.users.getUser(userId) : {}

  user = clerkConvertJSON(user)

  const postsWithUserNames = posts.map((post) => {
    const eA = user?.emailAddresses || []
    const authorEmail =
      eA.find((email) => email.id === user?.primaryEmailAddressId)
        ?.emailAddress || ''

    return {
      ...post,
      author: user?.username,
      authorEmail: authorEmail,
    }
  })

  return {
    props: {
      posts: postsWithUserNames || null,
      // ...buildClerkProps(req)
    },
    // revalidate: 1,
  }
}
