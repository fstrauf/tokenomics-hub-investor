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
        <div className="rounded-lg bg-slate-200">
          <div className="m-2 mt-4">
            <div className="flex w-full">
              <div className="font-semiBold mb-3 mt-2 w-11/12 text-xl sm:w-9/12 md:w-9/12 lg:w-10/12 xl:w-10/12 2xl:w-11/12">
                My Projects
              </div>
              <Link href={'/newDesign'}>
                <div className="ml-2 mt-2 h-8 cursor-pointer rounded bg-dao-red px-4 py-2 text-sm text-white">
                  New Design
                </div>
              </Link>
            </div>
            <div className="static overflow-x-auto rounded-[10px] bg-white px-8 py-6">
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
