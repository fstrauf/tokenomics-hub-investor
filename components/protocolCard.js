import Image from 'next/image'

export default function ProtocolCard({ author, post }) {
//   console.log('🚀 ~ file: protocolCard.js:4 ~ ProtocolCard ~ post', post)
  return (
    <>
      <div className="m-5 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          {/* <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={post?.mainImage}
          /> */}
          {/* <div className="w-9 sm:w-16"> */}
          <div className="mb-3 h-24 w-24 rounded-full shadow-lg">
            <div className="relative m-auto h-24 w-24 rounded-lg">
              <Image
                // alt={`Cover Image for ${title}`}
                className="object-contain"
                fill={true}
                src={post?.mainImageUrl}
              />
            </div>
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {post?.title}
          </h5>
          <p>
            <a href={post?.author?.website}>Website</a>
          </p>

          <p>
            <a href={post?.author?.twitter}>Twitter</a>
          </p>

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
