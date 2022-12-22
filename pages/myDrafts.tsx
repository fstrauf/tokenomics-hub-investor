import Layout from '../components/layout'
import Header from '../components/header'
import React from 'react';
import prisma from '../lib/prisma'
// import Router from "next/router";
import Drafts from '../components/drafts';
import { GetServerSideProps } from 'next';
// import { unstable_getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]'
// import { useSession } from "next-auth/react"
import { useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import type{ AuthData } from '@clerk/nextjs/dist/server/types'

export default function MyDrafts({ posts }) {
  // const { data: session, status } = useSession();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const role = user?.publicMetadata?.role ?? "" 

  // if (!session) {
  //   return (
  //     <>
  //       <Layout>
  //         <Header />
  //         <h1>You need to log in to view drafts</h1>
  //       </Layout>
  //     </>
  //   )
  // }

  return (
    <>
      <Layout>
        <Header />
        <h1 className='font-bold text-2xl mb-5'>My Unpublished Drafts</h1>
        <Drafts posts={posts} context='myDrafts' role={role} />    
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await unstable_getServerSession(req, res, authOptions);
  const { userId }: AuthData = getAuth(req)
  // const clerkUuser = userId ? await clerkClient.users.getUser(userId) : null;

  // console.log(userId)
  // const primaryEmail = clerkUuser.emailAddresses.find(element => element.id === clerkUuser.primaryEmailAddressId).emailAddress
  // var userEmail = clerkUuser?.emailAddresses[0].emailAddress ?? ''

  const posts = await prisma.post.findMany({
    where: {
      published: false,
      // authorEmail: primaryEmail
      authorClerkId: userId     
      // author:{
      //   email: primaryEmail,
      // }
    },
    include: {
      categories: {
        select: {
          label: true,
        }
      },
      author: {}
    }
  })

  return {
    props: {
      posts: posts || null,
      // ...buildClerkProps(req)
    },
    // revalidate: 1,
  }
}