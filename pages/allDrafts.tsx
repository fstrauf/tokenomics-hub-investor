import Layout from '../components/layout'
// import Header from '../components/header'
import React from 'react'
import prisma from '../lib/prisma'
import Drafts from '../components/drafts'
import { GetServerSideProps } from 'next'
// import { useAuth, useUser } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function AllDrafts({ posts }) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  // const role = user?.publicMetadata?.role ?? ''
  const contributor = user?.publicMetadata?.contributor || false
  // const admin = user?.publicMetadata?.admin || false

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
    include: {
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
  const users = await clerkClient.users.getUserList({ userId })

  const postsWithUserNames = posts.map((post) => {
    const username = users.find((u) => u.id === post.authorClerkId)?.username
    return {
      ...post,
      author: username,
    }
  })

  return {
    props: {
      posts: postsWithUserNames || null,
    },
    // revalidate: 1,
  }
}
