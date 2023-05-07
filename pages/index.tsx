import Container from '../components/generic/container'
// import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Table from '../components/table'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { headerStatus, postStatus } from '../lib/helper'
import Link from 'next/link'
import { useState } from 'react'
import XMarkIcon from '../public/svg/xmarkicon'

type Props = {
  allPosts: any
  preview: any
  categories: object[]
  tags: object[]
}

const Index: React.FC<Props> = (props) => {
  const router = useRouter()
  const [showBanner, setShowBanner] = useState(true)

  function filterCategories(newValue: MultiValue<any>): void {
    if (newValue.length === 0) {
      router.replace('/')
    } else {
      const filters = newValue.map((nv) => nv.value)
      router.replace(`/?cats=${filters}`)
    }
  }

  function filterTags(newValue: MultiValue<any>): void {
    if (newValue.length === 0) {
      router.replace('/')
    } else {
      const filters = newValue.map((nv) => nv.value)
      router.replace(`/?tags=${filters}`)
    }
  }

  // const fundRaiseBar = (
  //   <div
  //     className={`${
  //       showBanner ? 'm-auto flex items-center bg-dao-green' : 'hidden'
  //     }`}
  //   >
  //     <div className="mx-auto max-w-xl py-3 px-3 sm:px-6 lg:px-8">
  //       <p className="ml-3 self-center truncate text-center font-medium text-white">
  //         <span className="inline">🥳 We are fundraising. Interested? </span>
  //         <a
  //           href="mailto:contact@tokenomicsdao.com"
  //           className="hover:underline"
  //         >
  //           Contact us.
  //         </a>
  //       </p>
  //     </div>
  //     <button
  //       className="text-gray-200"
  //       onClick={() => {
  //         setShowBanner(false)
  //       }}
  //     >
  //       <XMarkIcon className="h-6 w-6 text-gray-200" aria-hidden="true" />
  //     </button>
  //   </div>
  // )

  return (
    <>
      {/* {fundRaiseBar} */}
      <Layout mode={headerStatus.main}>
        <Head>
          <title>Tokenomics Hub</title>
          <meta
            name="Explore, compare and evaluate tokenomics of crypto projects."
            content="Created by Tokenomics DAO"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <Container>
          <div className="m-auto mt-10 flex flex-col items-center">
            <div className="mb-10">
              <h1 className="text-center text-3xl font-bold">
                Explore, compare and evaluate tokenomics of crypto projects.
              </h1>
              <p className="text-center text-xl">
                Tokenomics Hub shows you the need-to-know tokenomic information
                per project{' '}
              </p>
            </div>
            <div className="flex max-w-6xl justify-center gap-32 rounded-lg bg-gradient-to-r from-dao-green to-dao-red p-5">
              <div className="flex w-3/4 max-w-lg flex-col rounded-lg text-white">
                <h1 className="mb-5 text-center text-2xl font-bold">
                  A tokenomics centric platform
                </h1>
                <p className="mb-5 text-center">
                  No matter if you’re an avid crypto user, a fellow degen or a
                  protocol owner/team member, anyone can contribute to
                  Tokenomics Hub by listing a token
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/newPost"
                    className="w-36 self-center rounded-md border-2 border-dark-tdao bg-white px-4 py-2 text-center text-sm font-medium text-dark-tdao hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    List a Token
                  </Link>
                </div>
              </div>
              <div className="flex w-3/4 max-w-lg flex-col rounded-lg text-white">
                <h1 className="mb-5 text-center text-2xl font-bold">
                  Want to design a token?
                </h1>
                <p className="mb-5 text-center">
                  Tokenomics Hub offers entrepreneurs an industry leading
                  framework with a built in suite of tools to help you create
                  sustainable tokenomics (in beta)
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/tdsLandingPage"
                    className="w-36 self-center rounded-md border-2 border-dark-tdao bg-white px-4 py-2 text-center text-sm font-medium text-dark-tdao hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Design a Token
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-10 flex justify-center gap-4 text-center"></div>
          <div className="m-auto flex w-1/2 max-w-5xl">
            <Select
              defaultValue={[]}
              id="cat-select"
              isMulti
              placeholder="filter categories"
              name="categories"
              options={props.categories}
              className="mr-3 w-1/2 text-xs"
              // classNamePrefix="select"
              onChange={filterCategories}
            />
            <Select
              defaultValue={[]}
              id="tag-select"
              placeholder="filter tags"
              isMulti
              name="tags"
              className="w-1/2 text-xs"
              options={props.tags}
              onChange={filterTags}
            />
          </div>
          <Table prop={props.allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const categories = await prisma.category.findMany()
  const tags = await prisma.tag.findMany()

  const filterCats = context?.query?.cats?.split(',') || ''
  const filterTags = context?.query?.tags?.split(',') || ''
  const filterCatsQuery =
    filterCats.length > 0
      ? {
          categories: {
            some: {
              value: { in: filterCats },
            },
          },
        }
      : {}

  const filterTagsQuery =
    filterTags.length > 0
      ? {
          tags: {
            some: {
              value: { in: filterTags },
            },
          },
        }
      : {}

  const allPosts = await prisma.post.findMany({
    where: {
      status: postStatus.published,
      ...filterCatsQuery,
      ...filterTagsQuery,
    },
    select: {
      mainImageUrl: true,
      title: true,
      tokenStrength: true,
      slug: true,
      id: true,
      ticker: true,
      id: true,
      categories: {
        select: {
          label: true,
        },
      },
    },
    orderBy: { title: 'asc' },
  })

  return {
    props: {
      allPosts,
      categories: categories || null,
      tags: tags || null,
    },
  }
}
