import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
// import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'
import Table from '../components/table'
// import prisma from '../lib/prisma';
import Link from 'next/link';
import prisma from '../lib/prisma'

type Props = {
  // rewardRound: any;
  allPosts: any;
  preview: any;
}

const Index: React.FC<Props> = (props) => {
  // export default function Index({ allPosts, preview }) {
  // const morePosts = allPosts

  return (
    <>
      <Layout preview={props.preview}>
        <Head>
          <title>Tokenomics Hub</title>
          <meta name="Explore, compare and evaluate tokenomics of crypto projects." content="Created by Tokenomics DAO" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <Container>
          <Intro />
          <h1 className='text-2xl md:text-3xl text-center mb-10'>Explore, compare and evaluate tokenomics of crypto projects.</h1>
          {/* <div className="w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Link href="/newProtocol" >
              New Protocol
            </Link>
          </div> */}
          <Table prop={props.allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  // const allPosts = await getAllPostsForHome(preview)

  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      mainImageUrl: true,
      title: true,
      tokenStrength: true,
      slug: true,
      categories: {
        select: {
          title: true,
        }
      }
    },
  })
  // console.log(allPosts)


  // const rewardRound = await prisma.rewardRound.findMany({
  //   take: 3,
  //   include: {
  //     Content: {
  //       include: {
  //         ContentAuthor: {
  //           include: {
  //             user: { }
  //           }

  //         }
  //       }
  //     },
  //     Payout: {
  //       include: {
  //         user: { },
  //       }
  //     }
  //   },
  //   orderBy: [
  //     {
  //       monthYear: 'desc',
  //     },
  //   ]
  // });

  // console.log(rewardRound)


  return {
    props: {
      allPosts, preview,
      // rewardRound 
    },
    revalidate: 1,
  }
}
