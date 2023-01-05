import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react'
import prisma from '../lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import AuthorCard from '../components/authorCard'

export default function ExpertsPage(props) {
  // console.log('🚀 ~ file: experts.tsx:9 ~ ExpertsPage ~ props', props.experts)

  return (
    <>
      <Layout>
        <Intro />
        <div className='flex flex-wrap'>
        {props.experts.map((e) => {
          return <AuthorCard author={e} />
        })}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const postAuthors = await prisma.post.findMany({
    distinct: ['authorClerkId'],
    where: {
      published: true,
    },
    select: {
      authorClerkId: true,
    },
  })

  const userId = postAuthors.map((post) => {
    return post.authorClerkId
  })
  const users = await clerkClient.users.getUserList({ userId })

  var properJSON = {}
  try {
    properJSON = JSON.parse(JSON.stringify(users))
  } catch {
    // properJSON = {}
  }
  // console.log("🚀 ~ file: experts.tsx:34 ~ getStaticProps ~ users", properJSON)

  return {
    props: {
      experts: properJSON || null,
    }, // will be passed to the page component as props
  }
}
