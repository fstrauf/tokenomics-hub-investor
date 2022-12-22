import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import OurTake from '../../components/our-take'
// import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
// import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
// import Head from 'next/head'
import TokenStrength from '../../components/token-strength'
import ProtocolStats from '../../components/protocol-stats'
import Resources from '../../components/resources'
import TimeLine from '../../components/timeline'
import { Link } from 'react-scroll'
import Diagram from '../../components/diagram'
import FeedbackPopup from '../../components/feedback-popup'
import { useState, useCallback } from 'react'
// import Comments from '../../components/comments'
// import Form from '../../components/form'
// import { useSession } from 'next-auth/react';
import Login from '../../components/login'
import AuthorCard from '../../components/authorCard'
import EditPiece from '../../components/edit-piece'
// import { HOME_OG_IMAGE_URL } from '../../lib/constants'
import prisma from '../../lib/prisma'
import Router from "next/router";
import { useForm } from "react-hook-form";
import PostMeta from '../../components/postMeta'
// import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
// import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { clerkClient } from "@clerk/nextjs/server";
// import type{ AuthData } from '@clerk/nextjs/dist/server/types'

export default function Post({ post, morePosts, author }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { handleSubmit, formState } = useForm();

  // console.log(author)

  // const role = user?.publicMetadata?.role ?? "" 

  // console.log("user " + user)
  var userIsAuthor = false
  if(user?.id === post?.authorClerkId)
  {
    userIsAuthor = true
  }

  // var buttoHidden = !(!userIsAuthor || !(user?.publicMetadata?.role === 'contributor'))  || !isSignedIn || formState.isSubmitting
  // console.log("button "+buttoHidden)
  // console.log("role "+user?.publicMetadata?.role)
  // console.log("bool "+ !(userIsAuthor || (user?.publicMetadata?.role === 'contributor')))
  // console.log("bool " + !isSignedIn)
  // console.log("bool "+ formState.isSubmitting)
  // console.log("bool "+ (user?.publicMetadata?.role !== 'contributor'))

  // console.log(user?.publicMetadata?.role)
  // const { pathname } = useRouter();

  // Check if the current route matches a public page
  // const isPublicPage = publicPages.includes(pathname);

  // console.log(post)

  

  // const { data: session, status } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = useCallback((event) => {
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
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className=''>
              <PostMeta title={post.title} content={post.shortDescription} />

              <PostHeader
                title={post.title}
                slug={post.slug}
                updatedAt={post.publishedAt}
                shortDescription={post.shortDescription}
                type={post.categories[0]?.label}
                tags={post.tags}
                tokenStrength={post.tokenStrength}
              />
              {/* <p>{(!userIsAuthor && !(role === 'contributor'))}  {!isSignedIn} {formState.isSubmitting} {role ==! 'contributor'}</p> */}
              <button onClick={handleSubmit(() => Router.push("/editPost/[id]", `/editPost/${post.id}`))}
                // disabled={!(role === 'contributor') || !isSignedIn || formState.isSubmitting || !userIsAuthor}
                disabled={!(userIsAuthor || (user?.publicMetadata?.role === 'contributor'))  || !isSignedIn || formState.isSubmitting}
                // disabled={(!userIsAuthor && !(user?.publicMetadata?.role === 'contributor')) || !isSignedIn || formState.isSubmitting || user?.publicMetadata?.role ==! 'contributor'}
                // disabled={buttoHidden}
                // false && true = false || false || false ||  true
                className="disabled:opacity-40 mb-3 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Edit
              </button>
              <FeedbackPopup isOpen={isOpen} handleIsOpen={handleIsOpen} />
              <div className={`w-full top-3 ${isOpen ? '' : 'z-50 sticky'}`}>
                <div className="overflow-x-scroll md:px-10 bg-white border-b-2 border-black">
                  <ul className='flex'>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" activeClass="active" to="tokenStrength" spy={true} smooth={true}>Overview</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="stats" spy={true} smooth={true}>Stats</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="ourTake" spy={true} smooth={true}>Our Take</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="timeline" spy={true} smooth={true}>Timeline</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="deepDive" spy={true} smooth={true}>Deep Dive</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="diagram" spy={true} smooth={true}>Diagram</Link></li>
                    <li><Link className="flex items-center p-4 text-lg font-bold text-gray-900 hover:rounded hover:text-white hover:bg-gray-700 no-underline" to="Resources" spy={true} smooth={true}>Resources</Link></li>
                  </ul>
                </div>
              </div>
              <main className='max-w-4xl flex flex-col m-auto'>
                {/* section header */}
                <div id='tokenStrength'></div>
                <TokenStrength
                  tokenStrength={post}
                />
                <div id='stats'></div>
                <ProtocolStats protocol={post.slug} />
                {!isSignedIn && (
                  <div className='mt-10'>
                    <Login message="You need to sign in to see more - it's free" />
                  </div>
                )}
                <div className={`${isSignedIn ? '' : 'blur-sm'}`}>
                  <div id='ourTake'></div>
                  <OurTake content={post} />
                  <div id='timeline'></div>
                  <TimeLine items={post.protocolTimeLine} />
                  <div id='deepDive'></div>
                  <PostBody content={post.breakdown} />
                  <div id='diagram'></div>
                  <Diagram diagram={post.diagramUrl} />
                  <div id='Resources'></div>
                  <Resources resources={post.ProtocolResources} />
                  <div className='mt-10'>
                    <EditPiece />
                  </div>
                </div>
              </main>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Author.</h1>
              
              <AuthorCard author={author} />
            </article>
            {/* <Comments comments={post.comments} /> */}
            {/* <Form _id={post._id} /> */}
            <SectionSeparator />
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  // const data = await getPostAndMorePosts(params.slug, preview)
  // const user = userId ? await clerkClient.users.getUser('') : null;
  // console.log(params)
  const data = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      categories: {},
      tags: {},
      ProtocolResources: {},
      protocolTimeLine: {},
      author: {},      
    }
  })
  
  const clerkUuser = data?.authorClerkId ? await clerkClient.users.getUser(data?.authorClerkId) : null;
  
  var properJSON = {}
  try{
    properJSON = JSON.parse(JSON.stringify(clerkUuser))
  } catch {
    // properJSON = {}
  }

  return {
    props: { 
      post: data || null,
      morePosts: data?.morePosts || null,
      // ...buildClerkProps(params.req)
      author: properJSON || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {

  const allPosts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  })

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