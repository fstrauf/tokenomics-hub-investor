import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react'
import prisma from '../lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import AuthorCard from '../components/authorCard'

export default function ExpertsPage(props) {

  return (
    <>
      <Layout>
        <Intro />
        <div className="flex flex-wrap m-auto justify-center">
          {props.experts.map((e) => {
            return <AuthorCard author={e} />
          })}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  
  const postAuthors = await prisma.post.groupBy({
    by: ['authorClerkId'],
    _count:{
      title: true,
    },   
    where: {
      published: true,
    }
  })  

  const catCountPerExpert =
    await prisma.$queryRaw`select count(A) as count,A as cat,p.authorClerkId from _CategoryToPost join Post as p on p.id = B GROUP BY A, p.authorClerkId`
  // const tagCountPerExpert =
  //   await prisma.$queryRaw`SELECT count(B) as count, B as tag, authorClerkId from _PostToTag join Post as p on p.id = A GROUP BY B, authorClerkId`

  const groupByAuthorClerkId = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      if (!groupedItems[item.authorClerkId]) {
        groupedItems[item.authorClerkId] = [];
      }
      groupedItems[item.authorClerkId].push(item);
    });
    return groupedItems;
  }

  const groupedArray = groupByAuthorClerkId(catCountPerExpert);

  const userId = postAuthors.map((post) => {
    return post.authorClerkId
  })
  const users = await clerkClient.users.getUserList({ userId })

  var properJSON = []
  try {
    properJSON = JSON.parse(JSON.stringify(users))
  } catch {
  }

  const experts = properJSON.map(j => {
    return{
      ...j,
      cat: groupedArray[j.id],
      articleCount: postAuthors.find(f => (f.authorClerkId === j.id))?._count?.title 
    }    
  })

  return {
    props: {
      experts: experts || null,
    },
  }
}
