import Layout from '../components/layout'
import React from 'react'
import prisma from '../lib/prisma'
// import AuthorCard from '../components/authorCard'
// import {
//   groupByAuthorClerkId,
//   clerkConvertJSON,
//   postStatus,
// } from '../lib/helper'
// import Link from 'next/link'
// import { clerkClient } from '@clerk/nextjs/server'
import Tiptap from '../components/TipTap'
import BreakdownBox from '../components/slugView/breakdown-box'

export default function TDF(props) {
  return (
    <>
      <Layout>
        <div className="mt-5 mb-5 flex flex-row">
          <div className="h-140 rounded-lg border-2 p-2">
            <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                1. Business Assessment
              </h5>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  1.1 Problem Statement
                </h5>
              </a>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  1.2. Value Proposition and Value Creation
                </h5>
              </a>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  1.3. Growth & Evolution
                </h5>
              </a>
            </div>
            <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                2. Token Evaluation
              </h5>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  2.1 Token Improvement
                </h5>
              </a>
            </div>
            <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                3. Users
              </h5>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  3.1 Who and What
                </h5>
              </a>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  3.2 Why (Motivation)
                </h5>
              </a>
              <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
              >
                <h5 className="text-base tracking-tight text-gray-900 ">
                  3.3 Value Creation
                </h5>
              </a>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
            <div className="col-span-2">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                1. Business Assessment - Problem Statement
              </h5>
              <div className="bg-slate-100 text-xs">
                <p>In 1-2 sentences describe the problem and your solution. </p>
                <p>Ask yourself:</p>
                <p>📜 What is the problem your project is solving?</p>
                <p>📜 How does your project solve the problem?</p>
              </div>
              <div className="mt-2 rounded-lg border-2">
                <Tiptap
                  content={props.value}
                  setContent={props.onChange}
                  editMode={true}
                />
              </div>
            </div>
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Resources
              </h5>
              <ul className="bg-slate-100 text-xs">
                <li>How to write an effective problem statement</li>
                <li>
                  How to develop a viable, sustainable and profitable
                  blockchain-based business model
                </li>
                <li>10 questions for founders</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                References
              </h5>
              {props.posts.map((post) => (
                <>
                  <div key={post.id}>{post.title}</div>
                  <BreakdownBox
                    value={post?.businessModel}
                    strength={post?.businessModelStrength}
                    title="Business Model:"
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    where: { categories: { every: { label: 'defi' } } },
    take: 3,
  })
  console.log('🚀 ~ file: tdf.tsx:149 ~ getStaticProps ~ posts', posts)

  return {
    props: {
      posts: posts || null,
    },
  }
}
