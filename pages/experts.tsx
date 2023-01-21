import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
import AuthorCard from '../components/authorCard'
import { groupByAuthorClerkId, clerkConvertJSON, postStatus } from '../lib/helper'
import Link from 'next/link'
import { clerkClient } from '@clerk/nextjs/server'

export default function ExpertsPage(props) {

  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <div className="m-auto flex flex-col justify-center">
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
            Find who the right expert to support you project
          </h1>
          <Link href='/bookAnExpert' className="w-36 self-center rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Book an Expert
          </Link>
        </div>
        <div className="m-auto flex flex-wrap justify-center">
          {props.experts.map((e) => {
            return <AuthorCard key={e.username} author={e} />
          })}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const postAuthors = await prisma.post.groupBy({
    by: ['authorClerkId'],
    _count: {
      title: true,
    },
    where: {
      status: postStatus.published,
    },
  })

  const catCountPerExpert =
    await prisma.$queryRaw`select count(A) as count,A as cat, p.authorClerkId from _CategoryToPost join Post as p on p.id = B WHERE p.status = ${postStatus.published} GROUP BY A, p.authorClerkId`

  const groupedArray = groupByAuthorClerkId(catCountPerExpert)

  const userId = postAuthors.map((post) => {
    return post.authorClerkId
  })
  const users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  const experts = users.map((j) => {
    return {
      ...j,
      cat: groupedArray[j.id],
      articleCount: postAuthors.find((f) => f.authorClerkId === j.id)?._count
        ?.title,
    }
  })

  return {
    props: {
      experts: experts || null,
    },
  }
}
