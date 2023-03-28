import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { AuthData } from '@clerk/nextjs/dist/server/types'
import { clerkConvertJSON, headerStatus, postStatus } from '../lib/helper'
import DesignCard from '../components/tdf/designCard'
import Link from 'next/link'

export default function MyDesigns({ posts }) {
  return (
    <Layout mode={headerStatus.design}>
      <>
        <div className="mt-4 mb-4 rounded-lg bg-gray-100 p-1">
          <div className="flex items-center justify-between rounded-lg p-2 py-2">
            <p className="text-xl font-bold">My Designs</p>
            <div className="flex gap-1">
              {' '}
              <Link href='/newDesign' className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40">
                New Design
              </Link>
            </div>
          </div>
          <div className="">
            <div className="static overflow-x-auto rounded-lg bg-white px-8 py-6">
              <div className="mb-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
                {posts?.map((post, index) => {
                  return (
                    <div key={index}>
                      <DesignCard post={post} context="myDrafts" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
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
