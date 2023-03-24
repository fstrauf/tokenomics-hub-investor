import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import Drafts from '../components/drafts'
import { GetServerSideProps } from 'next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { AuthData } from '@clerk/nextjs/dist/server/types'
import { clerkConvertJSON, postStatus } from '../lib/helper'
import DesignCard from '../components/tdf/designCard'
import { Router } from 'next/router'
import Link from 'next/link'

export default function MyDesigns({ posts }) {
  return (
    <Layout>
      <>
        <div className="rounded-[10px] bg-[#F0F0F0]">
          <div className="m-2 mt-4">
            <div className="flex w-[100%]">
              <div className="font-semiBold mb-3 mt-2 w-[92%] sm:w-[79%] md:w-[80%] lg:w-[88%] xl:w-[88%] 2xl:w-[92%] text-xl">
                My Projects
              </div>
              <Link href={'/newDesign'}>
                <div className="ml-[10px] mt-2 h-8 cursor-pointer rounded bg-sky-400 px-4 py-[6px] text-sm text-white">
                  New Project
                </div>
              </Link>
            </div>
            <DesignCard posts={posts} context="myDrafts" />
          </div>
        </div>
        <div className="rounded-[10px] bg-[#F0F0F0]">
          <div className="m-2 mt-4">
            <h1 className="font-semiBold mb-2 mt-2 text-xl">Shared With Me</h1>
            <DesignCard posts={posts} context="myDrafts" />
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
