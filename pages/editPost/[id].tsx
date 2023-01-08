import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import prisma from "../../lib/prisma";
import React from 'react'
import Post from "../../components/post2";
// import Header from '../../components/header'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {


  const txCalls = []
  txCalls.push(prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      categories: {},
      tags: {},
      protocolTimeLine: {},
      ProtocolResources: {},
    },
  }))


  txCalls.push(prisma.category.findMany())
  txCalls.push(prisma.tag.findMany())
  txCalls.push(prisma.calculation.findMany())

  const response = await prisma.$transaction(
    txCalls
  )

  return {
    props: {
      categories: response[1] || null,
      tags: response[2] || null,
      post: response[0] || null,
      calculations: response[3] || null,
    }
  };
};

const EditPost: React.FC<PostProps> = (props) => {

  let title = props?.post?.title;
  if (!props?.post?.published) {
    title = `Editing Draft ${title}.`;
  }

  return (
    <Layout>
      {/* <Header /> */}
      <div>
        <h2 className="text-4xl mt-10">{title} </h2>
        <p className="mb-10">By {props?.post.author?.name || "Unknown author"}</p>
        <Post content={props.post} categories={props.categories} tags={props.tags} calculations={props.calculations} />
      </div>
    </Layout>
  );
};

export default EditPost;