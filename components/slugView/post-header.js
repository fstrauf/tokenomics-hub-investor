import PostTitle from './post-title'
import { CircularProgressbar } from 'react-circular-progressbar'
import { TwitterShareButton } from 'react-share'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import Badge from '../../lib/svg/badge'

export default function PostHeader({
  title,
  updatedAt,
  shortDescription,
  cats,
  tags,
  tokenStrength,
  slug,
  ticker,
  imageUrl,
  isOfficial,
}) {
  const percentageComplete = tokenStrength || 0

  return (
    <div key={title}>
      <PostTitle title={title} imageUrl={imageUrl} />
      <div className="flex flex-col justify-between md:flex-row-reverse">
        <div className="mb-4 h-20 w-20 self-center md:h-40 md:w-40">
          <CircularProgressbar
            value={percentageComplete}
            text={`${percentageComplete}`}
          />
        </div>
        <div className="mb-6 text-lg md:basis-3/5">
          <h1>{shortDescription}</h1>
        </div>
      </div>
      <div className="flex flex-auto gap-4 text-lg">
        <h1 className="font-bold">Categories:</h1>
        {cats &&
          cats.map((cat) => (
            <p
              key={cat.value}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 shadow-sm"
            >
              {cat?.label}
            </p>
          ))}
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex flex-auto gap-4 text-lg">
            <h1 className="font-bold">Updated:</h1>
            <p>{updatedAt?.toISOString().slice(0, 10)}</p>
          </div>
          <div className="flex flex-auto gap-4 text-lg">
            <h1 className="font-bold">Tags:</h1>
            {tags &&
              tags.map((tag) => (
                <p
                  key={tag.value}
                  className="rounded-full bg-gray-600 px-3 py-1 text-sm text-white"
                >
                  {tag?.label}
                </p>
              ))}
          </div>
          <div className="flex flex-auto gap-4 text-lg">
            <h1 className="font-bold">Ticker:</h1>
            <p>{ticker?.toUpperCase()}</p>
          </div>
          <div className="mt-6 mb-2 flex w-28 items-center rounded-lg bg-[#1da1f2] px-4 py-1.5 text-sm font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 h-7 w-7"
            >
              <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
              />
            </svg>
            <TwitterShareButton
              title={`Check out the tokenomics of ${title} on Tokenomics Hub`}
              url={`${WEBSITE_URL_BASE}/posts/${slug}`}
            >
              Share
            </TwitterShareButton>
          </div>
        </div>
        <div>
          {isOfficial && (
            <>
              <div class="group relative">
                <Badge />
                <div class="absolute bottom-0 right-14 mb-6 hidden flex-col items-center group-hover:flex">
                  <span class="whitespace-no-wrap w-32 relative z-10 bg-gray-200 p-2 text-xs leading-none text-black shadow-lg">
                    This report was published by {title}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
