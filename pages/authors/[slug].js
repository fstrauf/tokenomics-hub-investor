import Layout from '../../components/layout'
import Intro from '../../components/intro'
import ProjectCard from '../..//components/projectCard'
import { getAllAuthorsWithSlug, getAuthorAndPostsBySlug } from '../../lib/api'
import PostPreview from '../../components/post-preview'
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

export async function getServerSideProps({ params, preview = false }) {
    const data = await getAuthorAndPostsBySlug(params.slug, preview)

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const contract = '0x9ee89523c1b763563a0ab3f6e85336810290ea14'

    // let nftList = []
    const allNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        address: data?.author?.wallet,
        chain: EvmChain.POLYGON
    });

    // console.log(allNFTs)

    const consultingNFT = allNFTs?.raw.result.filter(nft => {
        if (nft.token_address === contract) {
            return true
        } else {
            return false
        }
    })

    // session.nftOwned = nftList.raw.result.find((nfts) => nfts.token_address === contract)

    // console.log(consultingNFT)

    return {
        props: {
            preview,
            authorPosts: data?.authorPosts || null,
            author: data?.author || null,
            consultingNFT: consultingNFT || null,
        },
        // revalidate: 1,
    }
}

// export async function getStaticPaths() {
//     const allAuthors = await getAllAuthorsWithSlug()
//     return {
//         paths:
//             allAuthors?.map((author) => ({
//                 params: {
//                     slug: author.slug,
//                 },
//             })) || [],
//         fallback: true,
//     }
// }


export default function UserProfile({ author, authorPosts, consultingNFT }) {
    return (
        <>
            <Layout>
                <Intro />
                <div className="py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="">
                                            {/* <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"> */}
                                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://i.pravatar.cc/300?img=50" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button className="bg-dao-red active:bg-dao-red uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">7</span><span className="text-sm text-blueGray-400">projects completed</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">protocols listed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {author?.name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Tokenomics DAO Contributor
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Metaverse</span>
                                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">DeFi</span>
                                        <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">DAO</span>
                                        <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">ReFi</span>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <h1 className='text-3xl mb-5'>Proof of Work</h1>
                                    <div className='flex gap-10 justify-around'>
                                        <div>
                                            <h1 className='text-3xl mb-5'>Projects Completed</h1>
                                            {consultingNFT?.map((nft) => (
                                                <ProjectCard consultingNFT={nft} />
                                            ))}
                                        </div>
                                        <div>
                                            <h1 className='text-3xl mb-5'>Content Created</h1>
                                            {authorPosts?.map((post) => (
                                                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-5">
                                                    <div className="flex justify-center px-4 pt-4">
                                                        <PostPreview
                                                            key={post.slug}
                                                            title={post.title}
                                                            coverImage={post.coverImage}
                                                            slug={post.slug}
                                                            excerpt={post.excerpt}
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
