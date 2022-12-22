import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import prisma from "../../lib/prisma";
import React from 'react'
import Post from "../../components/post2";
import Header from '../../components/header'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
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
  });


  const categories = await prisma.category.findMany()
  const tags = await prisma.tag.findMany()

  return {
    props: {
      categories: categories || null,
      tags: tags || null,
      post: post || null,
    }
  };
};

const EditPost: React.FC<PostProps> = (props) => {

  let title = props.post.title;
  if (!props.post.published) {
    title = `Editing Draft ${title}.`;
  }

  return (
    <Layout>
      <Header />
      <div>
        <h2 className="text-4xl">{title} </h2>
        <p>By {props?.post.author?.name || "Unknown author"}</p>
        <Post content={props.post} categories={props.categories} tags={props.tags} />
      </div>
    </Layout>
  );
};

export default EditPost;