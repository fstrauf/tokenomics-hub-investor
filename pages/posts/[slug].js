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


export default function Post({ post, morePosts, preview }) {

  // const timerId = setTimeout(() => {
  //   console.log('Will be called after 2 seconds');
  // }, 10000);

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

                    <div class="top-0 z-50 sticky">
                    <div class="overflow-y-auto md:px-3 bg-gray-50 rounded bg-gray-800">
                      <ul className='flex'>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" activeClass="active" to="tokenStrength" spy={true} smooth={true}>Overview</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="stats" spy={true} smooth={true}>Stats</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="ourTake" spy={true} smooth={true}>Our Take</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="timeline" spy={true} smooth={true}>Timeline</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="deepDive" spy={true} smooth={true}>Deep Dive</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="Resources" spy={true} smooth={true}>Resources</Link></li>
                        <li><Link class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 no-underline" to="diagram" spy={true} smooth={true}>Diagram</Link></li>
                      </ul> 
                      </div>
                    </div>

                    <main className='w-full'>
                      {/* section header */}
                      <div id='tokenStrength'></div>
                      <TokenStrength
                        tokenStrength={post.tokenStrength}
                      />
                      <div id='stats'></div>
                      <ProtocolStats protocol={post.slug} />
                      <div id='ourTake'></div>
                      <OurTake content={post.ourTake} investmentTake={post.investmentTake} />
                      <div id='timeline'></div>
                      <TimeLine items={post.timeline} />
                      <div id='deepDive'></div>
                      <PostBody content={post.body} />
                      <div id='diagram'></div>
                      <Diagram diagram={post.diagram}/>
                      <div id='Resources'></div>
                      <Resources resources={post.resources} tpresources={post.thirdPartyResources} name='Resources' />                                           
                    </main>
       
            </article>

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



// import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
// import Container from '../../components/container'
// import PostBody from '../../components/post-body'
// import OurTake from '../../components/our-take'
// import MoreStories from '../../components/more-stories'
// import Header from '../../components/header'
// import PostHeader from '../../components/post-header'
// // import Comments from '../../components/comments'
// import SectionSeparator from '../../components/section-separator'
// import Layout from '../../components/layout'
// import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
// import PostTitle from '../../components/post-title'
// import Head from 'next/head'
// // import { CMS_NAME } from '../../lib/constants'
// // import Form from '../../components/form'
// import ProtocolBreakdown from '../../components/protocol-breakdown'
// import ProtocolStats from '../../components/protocol-stats'
// import Resources from '../../components/resources'
// // import Tab from '../../components/tab'
// import { Tab } from '@headlessui/react'
// import { Fragment } from 'react'
// import TimeLine from '../../components/timeline'
// import { Link } from 'react-scroll'

// export default function Post({ post, morePosts, preview }) {
//   const router = useRouter()
//   if (!router.isFallback && !post?.slug) {
//     return <ErrorPage statusCode={404} />
//   }
//   return (
//     <Layout preview={preview}>
//       <Container>
//         <Header />
//         {router.isFallback ? (
//           <PostTitle>Loading…</PostTitle>
//         ) : (
//           <>
//             <article>
//               <Head>
//                 <title>{post.title}</title>
//                 {/* <meta property="og:image" content={post.ogImage.url} /> */}
//               </Head>
//               <PostHeader
//                 title={post.title}
//                 coverImage={post.coverImage}
//                 updatedAt={post.date}
//                 shortDescription={post.shortDescription}
//                 type={post.catTitle?.title}
//               />
//               <div className=''>
//                 <Tab.Group as="nav" className='' defaultIndex={0} >
//                   <Tab.List className='bg-gray-800 h-20 rounded-lg grid gap-4 grid-cols-3'>
//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <button
//                           className={
//                             selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
//                           }
//                         >
//                           Overview
//                         </button>
//                       )}</Tab>
//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <button
//                           className={
//                             selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
//                           }
//                         >
//                           Deep Dive
//                         </button>
//                       )}</Tab>
//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <button
//                           className={
//                             selected ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-800 text-white rounded-lg'
//                           }
//                         >
//                           Resources
//                         </button>
//                       )}</Tab>
//                   </Tab.List>
//                   <div class="flex">
//                     <aside class="h-screen sticky top-0">
//                     <ul>
//                         <li><Link activeClass="active" to="tokenStrength" spy={true} smooth={true}>Token Strength</Link></li>
//                         <li><Link to="stats" spy={true} smooth={true}>Stats</Link></li>
//                         <li><Link to="ourTake" spy={true} smooth={true}>Our Take</Link></li>
//                         <li><Link to="timeline" spy={true} smooth={true}>Tokenomics Changelog</Link></li>
//                       </ul>
//                     </aside>

//                     <main>
//                     <Tab.Panels>
//                     {/* Overview */}
//                     <Tab.Panel>

//                       <ProtocolBreakdown
//                         utility={post.tokenUtility}
//                         demand={post.demandDrivers}
//                         capture={post.valueCapture}
//                         creation={post.valueCreation}
//                       />
//                       <ProtocolStats protocol={post.slug} />
//                       <OurTake content={post.ourTake} />
//                       <TimeLine items={post.timeline} />
//                     </Tab.Panel>
//                     {/* Deep Dive */}
//                     <Tab.Panel>
//                       <PostBody content={post.body} />
//                     </Tab.Panel>
//                     {/* Resources */}
//                     <Tab.Panel>
//                       <Resources resources={post.resources} name='Resources' />
//                       <Resources resources={post.thirdPartyResources} name='Third Party Resources' />
//                     </Tab.Panel>
//                   </Tab.Panels>
//                     </main>
//                   </div>
                  
//                 </Tab.Group>
//               </div>
//             </article>

//             {/* <Comments comments={post.comments} />
//             <Form _id={post._id} /> */}

//             <SectionSeparator />
//             {morePosts.length > 0 && <MoreStories posts={morePosts} />}
//           </>
//         )}
//       </Container>
//     </Layout>
//   )
// }

// export async function getStaticProps({ params, preview = false }) {
//   const data = await getPostAndMorePosts(params.slug, preview)
//   return {
//     props: {
//       preview,
//       post: data?.post || null,
//       morePosts: data?.morePosts || null,
//     },
//     revalidate: 1,
//   }
// }

// export async function getStaticPaths() {
//   const allPosts = await getAllPostsWithSlug()
//   return {
//     paths:
//       allPosts?.map((post) => ({
//         params: {
//           slug: post.slug,
//         },
//       })) || [],
//     fallback: true,
//   }
// }

