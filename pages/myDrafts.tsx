import Layout from '../components/layout'
import React from 'react';
import prisma from '../lib/prisma'
import Drafts from '../components/drafts';
import { GetServerSideProps } from 'next';
import {clerkClient, getAuth } from "@clerk/nextjs/server";
import type{ AuthData } from '@clerk/nextjs/dist/server/types'
import { clerkConvertJSON } from '../lib/helper';

export default function MyDrafts({ posts }) {

  return (
    <>
      <Layout>
        {/* <Header /> */}
        <h1 className='font-bold text-2xl mb-5 mt-10'>My Unpublished Drafts</h1>
        <Drafts posts={posts} context='myDrafts'  />    
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { userId }: AuthData = getAuth(req)

  const posts = await prisma.post.findMany({
    where: {
      published: false,
      authorClerkId: userId     
    },
    include: {
      categories: {
        select: {
          label: true,
        }
      },
      tags: {
        select: {
          label: true,
        }
      },
      author: {}
    }
  })

  let user = userId
  ? await clerkClient.users.getUser(userId)
  : {}

  user = clerkConvertJSON(user)

  const postsWithUserNames = posts.map((post) => {
    const eA = user?.emailAddresses || []
    const authorEmail = eA.find((email) => email.id === user?.primaryEmailAddressId)?.emailAddress || ''

    return {
      ...post,
      author: user?.username,
      authorEmail: authorEmail
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