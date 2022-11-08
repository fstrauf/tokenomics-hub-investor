import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'
import Table from '../components/table'

export default function Index({ allPosts, preview }) {
  const morePosts = allPosts

  return (
    <>
      <Layout preview={preview}>
        <Head>
        </Head>
        <Container>
          <Intro />
          <h1 className='text-2xl md:text-3xl text-center mb-10'>Explore, compare and evaluate tokenomics of crypto projects.</h1>
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
