import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Drafts from '../components/drafts';
import { useSession } from "next-auth/react"
import { GetServerSideProps } from 'next';

export default function AllDrafts({ posts }) {
  const { data: session, status } = useSession();

  if (session && session.user.role === "admin") {
    return (
      <>
        <Layout>
          <Header />
          <h1 className='font-bold text-2xl mb-5'>All Unpublished Drafts</h1>
          <Drafts posts={posts} />
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

// export async function getStaticProps() {
  export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
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