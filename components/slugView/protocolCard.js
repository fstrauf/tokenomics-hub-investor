import Image from 'next/image'

export default function ProtocolCard({ post }) {
  return (
    <>
      <div className="m-5 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <div className="mb-3 h-24 w-24 rounded-full shadow-lg">
            <div className="relative m-auto h-24 w-24 rounded-lg">
            {post?.mainImageUrl !=='' && (
              <Image
                alt={`Cover Image for ${post?.title}`}
                className="object-contain"
                fill={true}
                src={post?.mainImageUrl}
              />
            )}
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
        </div>
      </div>
    </>
  )
}
