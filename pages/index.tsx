import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Table from '../components/table'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { postStatus } from '../lib/helper'

type Props = {
  // rewardRound: any;
  allPosts: any
  preview: any
  categories: object[]
  tags: object[]
}

const Index: React.FC<Props> = (props) => {
  // console.log('🚀 ~ file: index.tsx:20 ~ props', props.allPosts)
  const router = useRouter()

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

  return (
    <>
      <Layout>
        <Head>
          <title>Tokenomics Hub</title>
          <meta
            name="Explore, compare and evaluate tokenomics of crypto projects."
            content="Created by Tokenomics DAO"
          />
          {/* <link rel="icon" href="/favicon.ico" /> */}
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
          <Intro />
          <h1 className="mb-10 text-center text-2xl md:text-3xl">
            Explore, compare and evaluate tokenomics of crypto projects.
          </h1>
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
    // take: 20,
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
      ticker: true,
      id: true,
      categories: {
        select: {
          label: true,
        },
      },
    },
  })

  // const aggregate = await prisma.userStrengthRating.groupBy({
  //   by: ['postId'],    
  //   _avg: {
  //     tokenUtilityStrength: true,
  //     businessModelStrength: true,
  //     valueCreationStrength: true,
  //     valueCaptureStrength: true,
  //     demandDriversStrength: true,
  //   },
  // })
  // console.log("🚀 ~ file: index.tsx:167 ~ constgetServerSideProps:GetServerSideProps= ~ aggregate", aggregate)

  return {
    props: {
      allPosts,
      categories: categories || null,
      tags: tags || null,
      // rewardRound
    },
    // revalidate: 1,
  }
}
