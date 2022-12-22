import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Drafts from '../components/drafts';
import { GetServerSideProps } from 'next';
import { useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

export default function AllDrafts({ posts }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const role = user?.publicMetadata?.role ?? "" 

  if (isSignedIn && role === "contributor") {
    return (
      <>
        <Layout>
          <Header />
          <h1 className='font-bold text-2xl mb-5'>All Unpublished Drafts</h1>
          <Drafts posts={posts} context='allDrafts' role={role} />
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