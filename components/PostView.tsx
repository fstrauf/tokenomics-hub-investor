import { useRouter } from 'next/router'
import Container from './container'
import PostTitle from './slugView/post-title'
import PostMeta from './postMeta'
import { getTotalStrength } from '../lib/helper'
import PostHeader from './slugView/post-header'
import { useCallback, useState } from 'react'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import FeedbackPopup from './feedback-popup'
import TokenStrength from './slugView/token-strength'

import { Link } from 'react-scroll'
import OurTake from './slugView/our-take'
import TimeLine from './slugView/timeline'

import UserViewer from './slugView/UserViewer'
import Resources from './slugView/resources'
import EditPiece from './edit-piece'
import SectionSeparator from './section-separator'
import dynamic from 'next/dynamic'
import Login from './login'

export default function PostView({ post, author }) {
  const [isSubmitting, setSubmitting] = useState(false)
  const router = useRouter()
  function editPost() {
    setSubmitting(true)
    router.push('/editDesign/[id]', `/editDesign/${post.id}`)
    setSubmitting(false)
  }
  const { user } = useUser()
  var userIsAuthor = false
  if (user?.id === post?.authorClerkId) {
    userIsAuthor = true
  }
  const contributor = user?.publicMetadata?.contributor || false
  const { isSignedIn } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = useCallback(
    (event) => {
      setIsOpen(false)
    },
    [isOpen]
  )
  const PostBody = dynamic(() => import('./slugView/post-body'), {
    loading: () => <p>Loading</p>,
  })
  const AuthorCard = dynamic(() => import('./authorCard'), {
    loading: () => <p>Loading</p>,
  })
  const ProtocolCard = dynamic(() => import('./protocolCard'), {
    loading: () => <p>Loading</p>,
  })
  const ProtocolStats = dynamic(() => import('./slugView/protocol-stats'), {
    loading: () => <p>Loading</p>,
  })
  const Diagram = dynamic(() => import('./slugView/diagram'), {
    loading: () => <p>Loading</p>,
  })

  const MechanismViewer = dynamic(() => import('./slugView/MechanismViewer'), {
    loading: () => <p>Loading</p>,
  })

  return (
    <Container>
      {/* <Header /> */}
      {router.isFallback ? (
        <PostTitle title={undefined} imageUrl={undefined}>
          Loading…
        </PostTitle>
      ) : (
        <>
          <article className="mt-10">
            <PostMeta title={post.title} description={undefined} />

            <PostHeader
              title={post.title}
              slug={post.slug}
              updatedAt={post.publishedAt}
              shortDescription={post.shortDescription}
              cats={post.categories}
              tags={post.tags}
              tokenStrength={Number(getTotalStrength(post?._avg).toFixed(1))}
              ticker={post.ticker}
              imageUrl={post.mainImageUrl}
              isOfficial={post.isOfficial}
            />
            <button
              onClick={editPost}
              disabled={
                !(userIsAuthor || contributor) || !isSignedIn || isSubmitting
              }
              className="mb-3 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
            >
              Edit
            </button>
            <FeedbackPopup isOpen={isOpen} handleIsOpen={handleIsOpen} />
            <div className={`top-3 w-full ${isOpen ? '' : ''}`}>
              <div className="overflow-x-auto border-b-2 border-black bg-white">
                <ul className="flex justify-evenly gap-3 py-2 text-xs">
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      activeClass="active"
                      to="tokenStrength"
                      spy={true}
                      smooth={true}
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="stats"
                      spy={true}
                      smooth={true}
                    >
                      Stats
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="ourTake"
                      spy={true}
                      smooth={true}
                    >
                      Our Take
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="timeline"
                      spy={true}
                      smooth={true}
                    >
                      Timeline
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="deepDive"
                      spy={true}
                      smooth={true}
                    >
                      Deep Dive
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="diagram"
                      spy={true}
                      smooth={true}
                    >
                      Diagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="supplyDemand"
                      spy={true}
                      smooth={true}
                    >
                      Supply and Demand
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="users"
                      spy={true}
                      smooth={true}
                    >
                      Ecosystem Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                      to="Resources"
                      spy={true}
                      smooth={true}
                    >
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <main className="m-auto flex max-w-7xl flex-col">
              {/* section header */}
              <div id="tokenStrength"></div>
              <TokenStrength post={post} contributor={contributor} />
              <div id="stats"></div>
              <ProtocolStats protocol={post.slug} />

              {!isSignedIn && (
                <div className="mt-10">
                  <Login message="You need to sign in to see more - it's free" />
                </div>
              )}
              <div className={`${isSignedIn ? '' : 'blur-sm'}`}>
                <div id="ourTake"></div>
                <OurTake content={post} />
                <div id="timeline"></div>
                <TimeLine items={post.protocolTimeLine} />
                <div id="deepDive"></div>
                <PostBody content={post.breakdown} />
                <div id="diagram"></div>
                <Diagram diagram={post.diagramUrl} />
                <div id="supplyDemand"></div>
                <MechanismViewer post={post} />
                <div id="users"></div>
                <UserViewer users={post.PostUser} />
                <div id="Resources"></div>
                <Resources resources={post.ProtocolResources} />
                <div className="mt-10">
                  <EditPiece />
                </div>
              </div>
            </main>
            <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
              Author.
            </h1>

            {!post.isOfficial ? (
              <AuthorCard author={author} />
            ) : (
              <ProtocolCard author={author} post={post} />
            )}
          </article>
          <SectionSeparator />
        </>
      )}
    </Container>
  )
}
