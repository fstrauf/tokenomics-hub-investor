import Link from 'next/link'

export default function AuthorCard({ author }) {
  return (
    <div className="m-5 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={author?.profileImageUrl}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {author?.username ?? author?.firstName}
        </h5>
        <span className="text-sm text-gray-500">
          Tokenomics DAO Contributor
        </span>
        <div className="flex w-full items-center justify-center divide-x divide-solid divide-gray-400 py-4">
          <span className="px-2 text-center">
            <span className="font-bold text-gray-700">7</span>
            <span className="text-gray-600"> completed Projects</span>
          </span>
          <span className="px-2 text-center">
            <span className="font-bold text-gray-700">
              {author?.articleCount}
            </span>
            <span className="text-gray-600"> protocols listed</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center">
          {author?.cat?.map((c) => {
            return (
              <span
                key={c.cat}
                className="mr-2 mb-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-bold text-gray-700 shadow-sm"
              >
                {c.cat} ({Number(c.count)})
              </span>
            )
          })}
        </div>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <Link
            as={`/authors/${author?.id}`}
            href="/authors/[slug]"
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            See Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
