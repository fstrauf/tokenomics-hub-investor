import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import OurTake from '../../components/our-take'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
// import Comments from '../../components/comments'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
// import { CMS_NAME } from '../../lib/constants'
// import Form from '../../components/form'
import ProtocolBreakdown from '../../components/protocol-breakdown'
import ProtocolStats from '../../components/protocol-stats'
import Resources from '../../components/resources'
// import Tab from '../../components/tab'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title}</title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                updatedAt={post.date}
                shortDescription={post.shortDescription}
                type={post.catTitle?.title}
              />
              <div className=''>
              <Tab.Group as="nav" className='' defaultIndex={0} >
                <Tab.List className='bg-gray-800 h-20 rounded-lg grid gap-4 grid-cols-3'>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
                        }
                      >
                        Overview
                      </button>
                    )}</Tab>
                    <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
                        }
                      >
                        Deep Dive
                      </button>
                    )}</Tab>
                    <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
                        }
                      >
                        Resources
                      </button>
                    )}</Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <ProtocolBreakdown
                      utility={post.tokenUtility}
                      demand={post.demandDrivers}
                      capture={post.valueCapture}
                      creation={post.valueCreation}
                    />
                    <ProtocolStats protocol={post.slug} />
                    <OurTake content={post.ourTake} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <PostBody content={post.body} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Resources resources={post.resources} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              </div>
            </article>

            {/* <Comments comments={post.comments} />
            <Form _id={post._id} /> */}

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  }
}
