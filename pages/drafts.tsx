import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react';
import prisma from '../lib/prisma'
import Router from "next/router";
// import Post from '../components/post';
// import Table from '../components/table';

export default function Drafts({ posts }) {
  // <button onClick={() => Router.push("/api/post/publish/[id]", `/api/post/publish/${post.id}`)}
  const publishPost = async (id: string) => {
    console.log(id)
    await fetch(`/api/post/publish/${id}`, {
      method: "PUT",
    });
    await Router.push("/drafts");
  }

  return (
    <>
      <Layout>
        <Intro />
        <h1 className='font-bold text-2xl mb-5'>Unpublished Drafts</h1>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 mb-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Author
                </th>
                <th scope="col" className="py-3 px-6">
                </th>
                <th scope="col" className="py-3 px-6">
                </th>
                <th scope="col" className="py-3 px-6">
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post, index) => {
                return (
                  <tr key={index} className="bg-white border-b ">
                    <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                      <p>{post.title}</p>
                    </th>
                    <td className="py-2 px-3">
                      <p>{post?.author?.name}</p>
                    </td>
                    <td className="py-2 px-3">
                      <button onClick={() => Router.push("/editPost/[id]", `/editPost/${post.id}`)}
                        className="w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-3">
                      <button onClick={() => publishPost(post.id)}
                        className="w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Publish
                      </button>
                    </td>
                    <td className="py-2 px-3">
                      <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                      >
                        <svg
                          fill="white"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                        // {...props}
                        >
                          <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
    include: {
      categories: {
        select: {
          title: true,
        }
      },
      author: {}
    }
  })

  return {
    props: {
      posts: posts || null,
    },
    revalidate: 1,
  }
}