import Layout from '../../components/layout'
import React from 'react'
import prisma from '../../lib/prisma'
import Drafts from '../../components/drafts'
import { GetServerSideProps } from 'next'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON, postStatus } from '../../lib/helper'
import UnAuthorised from '../../components/unauthorised'

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
        <UnAuthorised />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const posts = await prisma.post.findMany({
    where: {
      status: {
        not: postStatus.published,
      },
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
    orderBy:{
      publishedAt: 'desc',
    }
  })

  const userId = posts
    .map((post) => post.authorClerkId)
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
  // console.log('🚀 ~ file: allDrafts.tsx:63 ~ userId ~ userId:', userId)

  // const userIds = [
  //   'user_2OJS2phbZM5AJNjFnbiXo3PuXwz',
  //   'user_2OJRzKpH0GPtDjo0iW7tDJwHOLf',
  //   'user_2OJS2j1GeN2xU72jMKKn9Y5bFK9',
  //   'user_2OJRuO9IJgTS2peegG9vCJTsj5b',
  //   'user_2OJRuTxpGorVmbMf9Gz1SHQNBkU',
  //   'user_2OJRxISYvcPpcn1UBUnlxcDA45S',
  //   'user_2OJRuXBPHux5Wq5p7p5tqxPmSQR',
  //   'user_2OJRrxSZl3p6LZLOa2w2gsHSsJC',
  //   'user_2OJRs1Aaa0rPwsncLwkvl0Lv4RU',
  //   'user_2OJRry3Pifnu0MhMlx1DCVZtuAa',
  //   'user_2OJRzK7LGVn0EUOEMiSAFCDKWTu',
  //   'user_2OJRjLTgYyRIaa19eNCsCwXSrOd',
  //   'user_2OJRrzUzefFztHyvOpsxX6NOZMi',
  //   'user_2OJRrwQnFr66L0WgdSpQQe6cwRs',
  //   'user_2OJRzQZiYRMy8b444GSUW5ayb4T',]

  let users = clerkConvertJSON(
    await clerkClient.users.getUserList({ limit: 500, userId: userId })
  )
  // console.log("🚀 ~ file: allDrafts.tsx:65 ~ constgetServerSideProps:GetServerSideProps= ~ users:", users.length)

  const postsWithUserNames = posts.map((post) => {
    const currentUser = users?.find((u) => u.id === post.authorClerkId)
    const eA = currentUser?.emailAddresses || []
    // console.log("🚀 ~ file: allDrafts.tsx:70 ~ postsWithUserNames ~ eA:", eA)
    const authorEmail =
      eA.find((email) => email.id === currentUser?.primaryEmailAddressId)
        ?.emailAddress || ''

    return {
      ...post,
      author: currentUser?.username,
      authorEmail: authorEmail,
    }
  })
  // console.log("🚀 ~ file: allDrafts.tsx:103 ~ postsWithUserNames ~ postsWithUserNames:", postsWithUserNames)

  return {
    props: {
      posts: postsWithUserNames || null,
    },
    // revalidate: 1,
  }
}
