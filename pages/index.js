import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'
import React, { useMemo, useState, useEffect } from "react";
// import { CMS_NAME } from '../lib/constants'
import Table from '../components/table'
// import { Tab } from '@headlessui/react'

export default function Index({ allPosts, preview }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  const morePosts = allPosts

  return (
    <>
      <Layout preview={preview}>
        <Head>
          {/* <title>Next.js Blog Example with {CMS_NAME}</title> */}
        </Head>
        <Container>
          <Intro />
          <h1 className='text-3xl text-center mb-10'>Explore, compare and evaluate tokenomics of crypto projects.</h1>
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          {/* <Table data={morePosts} /> */}
          <Table prop={morePosts} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
    revalidate: 1,
  }
}
