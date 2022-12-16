import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
import Drafts from '../components/drafts';

export default function AllDrafts({ posts }) {

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

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
    include: {
      categories: {
        select: {
          title: true,
        }
      },
      author: {}
    }
  })

  return {
    props: {
      posts: posts || null,
    },
    revalidate: 1,
  }
}