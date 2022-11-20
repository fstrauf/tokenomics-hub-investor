import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import OurTake from '../../components/our-take'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import TokenStrength from '../../components/token-strength'
import ProtocolStats from '../../components/protocol-stats'
import Resources from '../../components/resources'
import TimeLine from '../../components/timeline'
import { Link } from 'react-scroll'
import Diagram from '../../components/diagram'
import FeedbackPopup from '../../components/feedback-popup'
import { useState, useCallback } from 'react'
import Comments from '../../components/comments'
import Form from '../../components/form'
import { useSession } from 'next-auth/react';
import Login from '../../components/login'
import AuthorCard from '../../components/authorCard'
import EditPiece from '../../components/edit-piece'

export default function Post({ post, morePosts, preview }) {

  // console.log(post)

  const { data: session, status } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = useCallback((event) => {
    console.log(event)
    setIsOpen(false);

  }, [isOpen]);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setIsOpen(true)
  //   }, 30000);
  // }, []);

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
            <article className=''>
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
                tags={post.tags}
                tokenStrength={post.tokenStrength.tokenStrength}
              />
              <FeedbackPopup isOpen={isOpen} handleIsOpen={handleIsOpen} />
              <div className={`w-full top-3 ${isOpen ? '' : 'z-50 sticky'}`}>
                <div class="overflow-x-scroll md:px-10 bg-white border-b-2 border-black">
                  <ul className='flex'>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" activeClass="active" to="tokenStrength" spy={true} smooth={true}>Overview</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="stats" spy={true} smooth={true}>Stats</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="ourTake" spy={true} smooth={true}>Our Take</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="timeline" spy={true} smooth={true}>Timeline</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="deepDive" spy={true} smooth={true}>Deep Dive</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="diagram" spy={true} smooth={true}>Diagram</Link></li>
                    <li><Link class="flex items-center p-4 text-lg font-bold text-gray-900 text-black hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="Resources" spy={true} smooth={true}>Resources</Link></li>
                  </ul>
                </div>
              </div>
              <main className='max-w-4xl flex flex-col m-auto'>
                {/* section header */}
                <div id='tokenStrength'></div>
                <TokenStrength
                  tokenStrength={post.tokenStrength}
                />
                <div id='stats'></div>
                <ProtocolStats protocol={post.slug} />
                {!session && (
                  <div className='mt-10'>
                    <Login message="You need to sign in to see more - it's free" />
                  </div>
                )}
                <div className={`${session ? '' : 'blur-sm'}`}>
                  <div id='ourTake'></div>
                  <OurTake content={post.ourTake} investmentTake={post.investmentTake} />
                  <div id='timeline'></div>
                  <TimeLine items={post.timeline} />
                  <div id='deepDive'></div>
                  <PostBody content={post.body} />
                  <div id='diagram'></div>
                  <Diagram diagram={post.diagram} />
                  <div id='Resources'></div>
                  <Resources resources={post.resources} tpresources={post.thirdPartyResources} name='Resources' />
                  <div className='mt-10'>
                    <EditPiece />
                  </div>
                </div>
              </main>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Author.</h1>
              <AuthorCard author={post.author} />
            </article>
            <Comments comments={post.comments} />
            <Form _id={post._id} />
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