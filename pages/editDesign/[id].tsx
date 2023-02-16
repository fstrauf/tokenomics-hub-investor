import { GetServerSideProps } from 'next'
import Layout from '../../components/layout'
// import prisma from '../../lib/prisma'
import React from 'react'
// import Post from '../../components/post2'
// import { clerkClient } from '@clerk/nextjs/server'
// import { clerkConvertJSON } from '../../lib/helper'
// import Comments from '../../components/comments'
// import CommentForm from '../../components/commentForm'
import TDFMain from '../../components/tdf/TDFMain'

const EditDesign: React.FC<PostProps> = (props) => {
  return (
    <Layout>
      <TDFMain props={props}/>      
    </Layout>
  )
}

export default EditDesign

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  // const design = await prisma.design.findUnique

  return {
    props: {
      categories: || null,
      
    },
  }
}
