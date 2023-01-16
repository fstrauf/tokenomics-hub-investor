import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import Drafts from '../components/drafts'
import { GetServerSideProps } from 'next'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON } from '../lib/helper'

export default function AllDrafts({ posts }) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const contributor = user?.publicMetadata?.contributor || false

  if (isSignedIn && contributor) {
    return (
      <>
        <Layout>
          {/* <Header /> */}
          <h1 className="mb-5 mt-10 text-2xl font-bold">
            All Unpublished Drafts
          </h1>
          <Drafts posts={posts} context="allDrafts" />
        </Layout>
      </>
    )
  } else {
    return (
      <>
        <Layout>
          <Header />
          <h1>You are not authorized to view this page!</h1>
        </Layout>
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
    select: {
      authorClerkId: true,
      id: true,
      title: true,
      status: true,
      categories: {
        select: {
          label: true,
        },
      },
      author: {},
    },
  })

  const userId = posts.map((post) => {
    return post.authorClerkId
  })

  let users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  const postsWithUserNames = posts.map((post) => {
    const currentUser = users?.find((u) => u.id === post.authorClerkId)
    const eA = currentUser?.emailAddresses || []
    const authorEmail = eA.find((email) => email.id === currentUser?.primaryEmailAddressId)?.emailAddress || ''
    
    return {
      ...post,
      author: currentUser?.username,
      authorEmail: authorEmail
    }
  })

  return {
    props: {
      posts: postsWithUserNames || null,
    },
    // revalidate: 1,
  }
}
