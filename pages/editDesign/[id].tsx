import { GetServerSideProps } from 'next'
import React from 'react'
import TDFMain from '../../components/tdf/TDFMain'
import { clerkConvertJSON, formatDate, headerStatus } from '../../lib/helper'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import prisma from '../../lib/prisma'
import CommentForm from '../../components/commentForm'
import Comments from '../../components/comments'
import { useAuth } from '@clerk/nextjs'
import UnAuthenticated from '../../components/unauthenticated'
// import { validateTierAccess } from '../../lib/helper'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import Link from 'next/link'
// import SubscriptionOptions from '../../components/subscription/SubscriptionOptions'
// import SubscriptionTC from '../../components/subscription/SubscriptionTC'
// import Layout from '../../components/layout'

const EditDesign: React.FC<UpdateNewDesignProps> = (props) => {
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false
  if (Object.keys(props.post).length === 0) {
    return <div>The requested object does not exist</div>
  }

  const { isSignedIn } = useAuth()
  if (!isSignedIn) return <UnAuthenticated />

  return (
    <>
      {/* {validateTierAccess(props.Subscription, admin) ? ( */}
      <>
        <TDFMain props={props} header={props?.post?.postType} />
        <div className="m-auto max-w-md sm:max-w-2xl lg:max-w-screen-2xl">
          <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
            Comments.
          </h1>
          <CommentForm id={props?.post?.id} />
          <Comments comments={props?.post?.Comments} />
        </div>
      </>
      {/* ) : (
        <Layout mode={headerStatus.design}>
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="my-20 text-center text-2xl font-bold">
              Subscribe to get full access to the Tokenomics Design Space
            </h1>
            <Link
              href="/tokenomics-design"
              className="mt-5 rounded-md bg-dao-red px-6 py-4 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Learn More
            </Link>
            <SubscriptionOptions />
            <div className="mb-40"></div>
            <SubscriptionTC />
          </div>
        </Layout>
      )} */}
    </>
  )
}

export default EditDesign

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = getAuth(context.req) || undefined
  const processedUserId = userId !== null ? userId : ''
  const txCalls = []

  txCalls.push(
    prisma.post.findUnique({
      where: {
        id: String(context.params?.id),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
        categories: {
          select: { value: true, label: true },
        },
        tags: {
          select: { value: true, label: true },
        },
        Mechanism: {
          include: {
            CalculationTimeSeries: {},
            mechanismType: {},
            incentiveTarget: {},
            PostUser: {},
          },
        },
        DesignElement: {},
        protocolTimeLine: {},
        ProtocolResources: {},
        Comments: { orderBy: { date: 'desc' } },
        Calculation: {},
        PostUser: {},
        PostAuthor: {},
      },
    })
  )

  txCalls.push(
    prisma.mechanism.findMany({
      where: {
        isTemplate: true,
      },
    })
  )

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())

  txCalls.push(
    prisma.subscriptions.findUnique({
      where: { authorClerkId: processedUserId },
    })
  )

  const [post, mechanismTemplates, designPhases, Category, Tag, Subscription] =
    await prisma.$transaction(txCalls)

  let postWithUpdatedComments = {}

  if (post !== null) {
    let clerkUser = {}
    try {
      if (post?.authorClerkId) {
        clerkUser = await clerkClient.users.getUser(post.authorClerkId)
      }
    } catch (error) {
      console.error('Error fetching user from Clerk:', error)
      // Handle the error here, e.g. set a default user or show an error message to the user
    }

    clerkUser = clerkConvertJSON(clerkUser)

    const userIds = post?.Comments?.map((comment) => {
      return comment.authorClerkId
    })
    let users = clerkConvertJSON(
      (await clerkClient.users.getUserList({ userIds })) || null
    )

    const commentsWithUserNames =
      post?.Comments?.map((comment) => {
        const currentUser = users?.find((u) => u.id === comment.authorClerkId)

        return {
          ...comment,
          author: currentUser?.username,
        }
      }) || {}

    postWithUpdatedComments = post
    console.log(
      '🚀 ~ file: [id].tsx:134 ~ constgetServerSideProps:GetServerSideProps= ~ postWithUpdatedComments:',
      postWithUpdatedComments
    )

    postWithUpdatedComments.Comments = commentsWithUserNames || {}
    postWithUpdatedComments.protocolTimeLine =
      postWithUpdatedComments.protocolTimeLine.map((ptl) => ({
        ...ptl,
        // date: new Date(ptl.date).toLocaleDateString('en-CA'),
        date: formatDate(ptl.date),
      }))
    if (postWithUpdatedComments.Calculation === null) {
      postWithUpdatedComments.Calculation = {}
    } else {
      postWithUpdatedComments.Calculation.startDate = formatDate(
        postWithUpdatedComments?.Calculation?.startDate || new Date()
      )
    }

    postWithUpdatedComments.DesignElement =
      postWithUpdatedComments?.DesignElement?.map((de) => {
        if (de.phaseId === 105) {
          console.log(
            '🚀 ~ file: [id].tsx:155 ~ postWithUpdatedComments?.DesignElement?.map ~ de:',
            de
          )
        }
        try {
          var content = JSON.parse(de.content)
        } catch {
          var content = de.content
        }
        return {
          ...de,
          content: content,
        }
      })
  }

  return {
    props: {
      post: postWithUpdatedComments || null,
      designPhases: designPhases || null,
      mechanismTemplates: mechanismTemplates || null,
      Category: Category || null,
      Tag: Tag || null,
      Subscription: Subscription || null,
    },
  }
}
