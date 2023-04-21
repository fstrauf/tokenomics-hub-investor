import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
// import Layout from '../../components/layout'
import prisma from '../../lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON, headerStatus, postStatus } from '../../lib/helper'
import PostView from '../../components/PostView'
import { GetServerSideProps } from 'next/types'
import Header2 from '../../components/header2'
import Link from 'next/link'
// import HelpButton from '../../components/tdf/HelpButton'
export default function Post({ post, author }) {
  const router = useRouter()

  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    // <Layout>
    <>
      <Header2 mode={headerStatus.design}>
        <div className="flex gap-2">
          <Link
            as={`/editDesign/${post?.id}`}
            href="/editDesign/[id]]"
            className="rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80"
          >
            Edit
          </Link>
          {/* <HelpButton values={values} setIsRequestReviewOpen={setIsRequestReviewOpen} setreviewRequiredFields={setreviewRequiredFields} /> */}
        </div>
      </Header2>
      <PostView post={post} author={author} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const txCalls = []
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categories: {},
      tags: {},
      ProtocolResources: {},
      protocolTimeLine: {
        orderBy: {
          date: 'asc',
        },
      },
      Mechanism: {
        include: {
          CalculationTimeSeries: {},
          PostUser: {},
        },
      },
      PostUser: {},
      author: {},
      Calculation: {
        include: {
          CalculationRows: {},
        },
      },
    },
  })

  txCalls.push(
    prisma.post.count({
      where: {
        authorClerkId: post?.authorClerkId,
        status: postStatus.published,
      },
    })
  )

  txCalls.push(
    prisma.$queryRaw`select count(A) as count,A as cat,p.authorClerkId from _CategoryToPost join Post as p on p.id = B WHERE p.authorClerkId = ${post?.authorClerkId} AND p.status = ${postStatus.published} GROUP BY A, p.authorClerkId`
  )

  const [postCount, postCategoryCount] = await prisma.$transaction(txCalls)

  let clerkUser = {}
  try {
    clerkUser = post?.authorClerkId
      ? await clerkClient.users.getUser(post?.authorClerkId)
      : {}
  } catch (error) {}

  clerkUser = clerkConvertJSON(clerkUser || null)

  clerkUser.articleCount = postCount || 0

  clerkUser.cat = postCategoryCount || null

  return {
    props: {
      post: post || null,
      author: clerkUser || null,
    },
  }
}
