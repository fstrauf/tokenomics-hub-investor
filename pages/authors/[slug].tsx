import Layout from '../../components/layout'
import Intro from '../../components/intro'
import PostPreview from '../../components/post-preview'
// import Moralis from 'moralis';
// import { EvmChain } from '@moralisweb3/evm-utils';
import prisma from '../../lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'



export default function UserProfile({ author, authorPosts }) {
  console.log("🚀 ~ file: [slug].tsx:12 ~ UserProfile ~ author", author)
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
                          10
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
                    <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                      Metaverse
                    </span>
                    <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      DeFi
                    </span>
                    <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
                      DAO
                    </span>
                    <span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
                      ReFi
                    </span>
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
                      {authorPosts?.map((post) => (
                        <div
                          key={post.id}
                          className="m-5 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md"
                        >
                          <div className="flex justify-center px-4 pt-4">
                            <PostPreview
                              // key={post.slug}
                              title={post.title}
                              url={post.mainImageUrl}
                              slug={post.slug}
                              // excerpt={post.excerpt}
                            />
                          </div>
                        </div>
                      ))}
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
  } catch {
    // properJSON = {}
  }

  const authorPost = await prisma.post.findMany({
    where: {
        authorClerkId: params?.slug,
        published: true,
    }
  })

  
  return {
    props: {
      authorPosts: authorPost || null,
    //   morePosts: data?.morePosts || null,
      // ...buildClerkProps(params.req)
      author: properJSON || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const postAuthors = await prisma.post.findMany({
    distinct: ['authorClerkId'],
    where: {
      published: true,
    },
    select: {
      authorClerkId: true,
    },
  })

  const userId = postAuthors.map((post) => {
    return post.authorClerkId
  })

  const users = await clerkClient.users.getUserList({ userId })

  var properJSON = []
  try {
    properJSON = JSON.parse(JSON.stringify(users))
  } catch {}

  return {
    paths:
      properJSON?.map((author) => ({
        params: {
          slug: author.id,
        },
      })) || [],
    fallback: true,
  }
}


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//     // const data = await getAuthorAndPostsBySlug(params.slug, preview)
//     const { userId }: AuthData = getAuth(req)
//     // const clerkUuser = userId ? await clerkClient.users.getUser(userId) : null;

// //get authorclerkid and select posts by that

//     const result = await prisma.post.findMany({
//         where: {
//             authorClerkId: userId
//         },
//       })

//     //   console.log(result)

//     // const data = await prisma.user.findUnique({
//     //     where: {
//     //         slug: params.slug,
//     //     },
//     //     include: {
//     //         posts: {},
//     //     },
//     // })

//     // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

//     // const contract = '0x9ee89523c1b763563a0ab3f6e85336810290ea14'

//     // var consultingNFT
//     // try{
//     //     const allNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
//     //         address: data?.author?.wallet,
//     //         chain: EvmChain.POLYGON
//     //     });

//     //     consultingNFT = allNFTs?.raw.result.filter(nft => {
//     //         if (nft.token_address === contract) {
//     //             return true
//     //         } else {
//     //             return false
//     //         }
//     //     })
//     // }catch{

//     // }

//     return {
//         props: {
//             // preview,
//             authorPosts: result || null,
//             // author: data?.author || null,
//             consultingNFT: null //consultingNFT || null,
//         },
//         // revalidate: 1,
//     }
// }