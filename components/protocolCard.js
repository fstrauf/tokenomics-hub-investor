// import Link from 'next/link'

export default function ProtocolCard({author, post}) {
    return (
        <>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-5">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={author?.profileImageUrl} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{post?.title}</h5>                    
                        <p><a href={post?.author?.website}>Website</a></p>
                        

                        <p><a href={post?.author?.twitter}>Twitter</a></p>

                    {/* <span className="text-sm text-gray-500">Tokenomics DAO Contributor</span> */}
                    {/* <div
                        className="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                        <span className="text-center px-2">
                            <span className="font-bold text-gray-700">7</span>
                            <span className="text-gray-600"> completed Projects</span>
                        </span>
                        <span className="text-center px-2">
                            <span className="font-bold text-gray-700">{author?.articleCount}</span>
                            <span className="text-gray-600"> protocols listed</span>
                        </span>
                    </div> */}
                    {/* <div className="flex flex-wrap justify-center">
                        {author?.cat?.map(c =>{
                            return (
                                <span key={c.cat} className='mr-2 mb-2 px-3 py-1 text-sm rounded-full font-bold bg-gray-200 text-gray-700 shadow-sm'>{c.cat} ({Number(c.count)})</span>        
                            )
                        })}                       
                    </div>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <Link as={`/authors/${author?.id}`} href="/authors/[slug]" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            See Profile
                        </Link>
                    </div> */}
                </div>
            </div>
        </>
    )
}