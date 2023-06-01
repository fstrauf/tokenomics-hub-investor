import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
// import Layout from '../../components/layout'
import Layout from '../components/layout'
// import prisma from '../../lib/prisma'
import prisma from '../lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
// import { clerkConvertJSON, postStatus } from '../../lib/helper'
import { clerkConvertJSON, postStatus } from '../lib/helper'
import PostView from '../components/slugView/PostView'

export default function Post({ post, author }) {
  const router = useRouter()

  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <PostView post={post} author={author} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
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

  // txCalls.push(
  //   prisma.userStrengthRating.aggregate({
  //     _avg: {
  //       tokenUtilityStrength: true,
  //       businessModelStrength: true,
  //       valueCreationStrength: true,
  //       valueCaptureStrength: true,
  //       demandDriversStrength: true,
  //     },
  //     where: {
  //       postId: post.id,
  //     },
  //   })
  // )

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
      // post: Object.assign(post, response[2]) || null,
      post: post || null,
      author: clerkUser || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await prisma.post.findMany({
    where: {
      status: postStatus.published,
    },
    select: {
      id: true,
    },
  })

  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          id: post.id,
        },
      })) || [],
    fallback: true,
  }
}
