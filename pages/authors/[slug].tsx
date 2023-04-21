import Layout from '../../components/layout'
import Intro from '../../components/intro'
// import PostPreview from '../../components/post-preview'
// import Moralis from 'moralis';
// import { EvmChain } from '@moralisweb3/evm-utils';
import prisma from '../../lib/prisma'
// import { clerkClient } from '@clerk/nextjs/server'
import Link from 'next/link'
import { clerkConvertJSON, postStatus } from '../../lib/helper'
import { clerkClient } from '@clerk/nextjs/server'

export default function UserProfile({
  author,
  authorPosts,
  contentCount,
  catCount,
}) {
  return (
    <>
      <Layout>
        <Intro />
        <div className="bg-blueGray-200 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="">
                      <img
                        className="mb-3 h-24 w-24 rounded-full shadow-lg"
                        src={author?.profileImageUrl}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                    <div className="mt-32 py-6 px-3 sm:mt-0">
                      <button
                        className="mb-1 rounded bg-dao-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-dao-red sm:mr-2"
                        type="button"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                          7
                        </span>
                        <span className="text-blueGray-400 text-sm">
                          projects completed
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                          {contentCount}
                        </span>
                        <span className="text-blueGray-400 text-sm">
                          protocols listed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold leading-normal">
                    {author?.username ?? author?.firstName}
                  </h3>
                  <div className="text-blueGray-400 mt-0 mb-2 text-sm font-bold uppercase leading-normal">
                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                    Tokenomics DAO Contributor
                  </div>
                  <div className="text-blueGray-600 mb-2 mt-10">
                    {catCount?.map((c) => {
                      return (
                        // <p className='px-3 py-1 text-sm rounded-full font-bold bg-gray-100 text-gray-700 shadow-sm'>{type}</p>
                        <span
                          key={c.cat}
                          className='mr-2 px-3 py-1 text-sm rounded-full font-bold bg-gray-200 text-gray-700 shadow-sm'
                        >
                          {c.cat} ({Number(c.count)})
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
                  <h1 className="mb-5 text-3xl">Proof of Work</h1>
                  <div className="flex justify-around gap-10">
                    <div>
                      <h1 className="mb-5 text-3xl">Projects Completed</h1>
                      {/* {consultingNFT?.map((nft) => (
                        <ProjectCard consultingNFT={nft} />
                      ))} */}
                    </div>
                    <div>
                      <h1 className="mb-5 text-3xl">Content Created</h1>
                      <div className="container mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white shadow">
                        <ul className="flex w-full flex-col divide-y">
                          {authorPosts?.map((post) => (
                            <>
                              <li className="flex flex-row hover:bg-gray-50">
                                <Link
                                  as={`/posts/${post.slug}`}
                                  href="/posts/[slug]"
                                  className=""
                                >
                                  <div className="flex flex-1 cursor-pointer select-none items-center p-4">
                                    <div className="mr-4 flex h-10 w-10 flex-col items-center justify-center">
                                      <img
                                        alt="profil"
                                        src={post?.mainImageUrl}
                                        className="m-auto h-7 rounded-lg"
                                      />
                                    </div>
                                    <div className="flex-1 pl-1">
                                      <div className="font-medium">
                                        {post?.title}
                                      </div>
                                      <div className="text-sm text-gray-400">
                                        {post?.categories[0]?.label}
                                      </div>
                                    </div>                                  
                                  </div>
                                </Link>
                              </li>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const clerkUuser = params?.slug
    ? await clerkClient.users.getUser(params?.slug)
    : null

  var properJSON = {}
  try {
    properJSON = JSON.parse(JSON.stringify(clerkUuser))
  } catch {}

  // const clerkUser = await getClerkUsers(params?.slug)

  const txCalls = []
  txCalls.push(
    prisma.post.findMany({
      select: {
        title: true,
        mainImageUrl: true,
        slug: true,
        id: true,
        categories: true,
      },
      where: {
        authorClerkId: params?.slug,
        // published: true,
        status: postStatus.published,
      },
    })
  )
  txCalls.push(
    prisma.post.count({
      where: {
        authorClerkId: params?.slug,
        status: postStatus.published,
      },
    })
  )

  txCalls.push(
    prisma.$queryRaw`select count(A) as count,A as cat,p.authorClerkId from _CategoryToPost join Post as p on p.id = B WHERE p.authorClerkId = ${params?.slug} AND p.status = ${postStatus.published} GROUP BY A, p.authorClerkId`
  )

  const response = await prisma.$transaction(txCalls)
  const authorPosts = response[0] || null

  return {
    props: {
      authorPosts: authorPosts || null,
      contentCount: response[1] || null,
      catCount: response[2] || null,
      author: properJSON || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const postAuthors = await prisma.post.findMany({
    distinct: ['authorClerkId'],
    where: {
      status: postStatus.published,
    },
    select: {
      authorClerkId: true,
    },
  })

  const userId = postAuthors.map((post) => {
    return post.authorClerkId
  })

  const users = clerkConvertJSON(await clerkClient.users.getUserList({ userId }))

  return {
    paths:
    users?.map((author) => ({
        params: {
          slug: author.id,
        },
      })) || [],
    fallback: true,
  }
}
