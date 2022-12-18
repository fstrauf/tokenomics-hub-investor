import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Router from "next/router";
import Drafts from '../components/drafts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useSession } from "next-auth/react"

export default function MyDrafts({ posts }) {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <>
        <Layout>
          <Header />
          <h1>You need to log in to view drafts</h1>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout>
        <Header />
        <h1 className='font-bold text-2xl mb-5'>All Unpublished Drafts</h1>
        <Drafts posts={posts} />    
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  const posts = await prisma.post.findMany({
    where: {
      published: false,      
      author:{
        email: session?.user?.email,
      }
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
    },
    // revalidate: 1,
  }
}