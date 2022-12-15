import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
// import Router from "next/router";
// import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
// import Tiptap from '../../components/TipTap';
// import { generateHTML } from '@tiptap/html'
import React from 'react'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import parse from 'html-react-parser';
import Post from "../../components/post";
import Intro from "../../components/intro";

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

// async function publishPost(id: string): Promise<void> {
//   await fetch(`/api/publish/${id}`, {
//     method: "PUT",
//   });
//   await Router.push("/");
// }

// async function deletePost(id: string): Promise<void> {
//   await fetch(`/api/post/${id}`, {
//     method: "DELETE",
//   });
//   Router.push("/");
// }

const EditPost: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  let title = props.post.title;
  if (!props.post.published) {
    title = `Editing ${title} . `;
  }

  return (
    <Layout>
      <Intro />
      <div>
        <h2>{title}</h2>
        <p>By {props?.post.author?.name || "Unknown author"}</p>
        <Post content={props.post} categories={props.categories} tags={props.tags}/>
      </div>
    </Layout>
  );
};

export default EditPost;