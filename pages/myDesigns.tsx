import React from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { AuthData } from '@clerk/nextjs/dist/server/types'
import {
  clerkConvertJSON,
  headerStatus,
  postStatus,
  postType,
} from '../lib/helper'
import DesignCard from '../components/tdf/designCard'
import Link from 'next/link'
import InfoSection from '../components/InfoSection'
import Layout from '../components/layout'

export default function MyDesigns({ posts }) {
  return (
    <Layout mode={headerStatus.main}>
      <>
        <div className="my-10 w-full">
          <div className="flex justify-between rounded-lg bg-gradient-to-r from-dao-red to-dao-green p-2 gap-4 items-center">
            
            <p className="text-center text-white">
              Upgrade your Token Design - use expert help and unlock the demand
              builder!
            </p>
            <div className="flex gap-3">
              <Link
                href="/manage-subscriptions"
                className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                Upgrade to Premium
              </Link>
              <Link
                href="/manage-subscriptions"
                className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                Manage Subscription
              </Link>
            </div>
          </div>
          <div className="w-72"> </div>
        </div>
        <div className="mt-4 mb-4 rounded-lg bg-gray-100 p-1">
          <div className="flex items-center justify-between rounded-lg p-2 py-2">
            <p className="text-xl font-bold">My Designs</p>
            <div className="flex gap-1">
              {' '}
              <Link
                href="/newDesign"
                className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                New Design
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg bg-white">
            <div className="flex flex-wrap items-center justify-center">
              {posts?.filter((p) => p.postType === postType.design).length ===
              0 ? (
                <div className="pb-5">
                  <InfoSection
                    text="Tokenomics Hub offers entrepreneurs an industry leading framework with a built in suite of tools to help you create sustainable tokenomics (in beta)"
                    title="Want to design a token?"
                  >
                    <div className="flex justify-center">
                      <Link
                        href="/tokenomics-design"
                        className="w-36 self-center rounded-md border-2 border-dark-tdao bg-white px-4 py-2 text-center text-sm font-medium text-dark-tdao hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        Design a Token
                      </Link>
                    </div>
                  </InfoSection>
                </div>
              ) : (
                <></>
              )}
              {posts
                ?.filter((p) => p.postType === postType.design)
                .map((post, index) => {
                  return (
                    <div key={index}>
                      <DesignCard post={post} context="myDrafts" />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4 rounded-lg bg-gray-100 p-1">
          <div className="flex items-center justify-between rounded-lg p-2 py-2">
            <p className="text-xl font-bold">My Reports</p>
            <div className="flex gap-1">
              {' '}
              <Link
                href="/newPost"
                className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                New Report
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg bg-white">
            <div className="flex flex-wrap items-center justify-center">
              {posts?.filter((p) => p.postType === postType.report).length ===
              0 ? (
                <div className="pb-5">
                  <InfoSection
                    text="Tokenomics Hub is a community driven platform showcasing the need-to-know tokenomics information per project. No matter if you’re an avid user, a fellow degen or a protocol owner/team member, anyone can list a token"
                    title="Contribute to Tokenomics Hub"
                  >
                    {' '}
                    <div className="flex justify-center">
                      <Link
                        href="/newPost"
                        className="w-36 self-center rounded-md border-2 border-dark-tdao bg-white px-4 py-2 text-center text-sm font-medium text-dark-tdao hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        List a Token
                      </Link>
                    </div>
                  </InfoSection>
                </div>
              ) : (
                <></>
              )}
              {posts
                ?.filter((p) => p.postType === postType.report)
                .map((post, index) => {
                  return (
                    <div key={index}>
                      <DesignCard post={post} context="myDrafts" />
                    </div>
                  )
                })}
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
    take: 20,
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
