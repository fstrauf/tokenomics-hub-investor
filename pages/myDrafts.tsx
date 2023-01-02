import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Drafts from '../components/drafts';
import { GetServerSideProps } from 'next';
// import { useAuth } from '@clerk/nextjs';
// import { useUser } from '@clerk/nextjs';
import {getAuth } from "@clerk/nextjs/server";
import type{ AuthData } from '@clerk/nextjs/dist/server/types'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser';

export default function MyDrafts({ posts }) {
  const { user } = useUser();

  const role = user?.publicMetadata?.role ?? "" 

  return (
    <>
      <Layout>
        <Header />
        <h1 className='font-bold text-2xl mb-5'>My Unpublished Drafts</h1>
        <Drafts posts={posts} context='myDrafts' role={role} />    
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
      author: {}
    }
  })

  return {
    props: {
      posts: posts || null,
      // ...buildClerkProps(req)
    },
    // revalidate: 1,
  }
}