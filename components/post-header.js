import PostTitle from '../components/post-title'
import { CircularProgressbar } from 'react-circular-progressbar'
import { TwitterShareButton } from 'react-share'

export default function PostHeader({ title, updatedAt, shortDescription, type, tags, tokenStrength, slug }) {

  const percentageComplete = tokenStrength
  
  return (
    <div key={title}>
      <PostTitle>{title}</PostTitle>
      <div className='flex flex-col md:flex-row-reverse justify-between'>
        <div className='w-20 h-20 self-center mb-4 md:w-40 md:h-40'>
          <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
        </div>
        <div className="mb-6 text-lg md:basis-3/5">
          <h1>{shortDescription}</h1>
        </div>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Categories:</h1>
        <p className='px-3 py-1 text-sm rounded-full font-bold bg-gray-100 text-gray-700 shadow-sm'>{type}</p>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Updated:</h1>
        <p>{updatedAt?.toISOString().slice(0, 10)}</p>      
      </div>
      <div className="mb-6 text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Tags:</h1>
        {tags && tags.map((tag) => (
          <p className='px-3 py-1 text-sm rounded-full bg-gray-600 text-white'>{tag?.label}</p>
        ))}
      </div>
      <div className='px-4 py-1.5 mb-2 w-28 text-white font-medium text-sm leading-tight uppercase rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex items-center bg-[#1da1f2]'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 mr-2">
          <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>
        <TwitterShareButton title={`Check out the tokenomics of ${title} on Tokenomics Hub`} url={`https://www.tokenomicshub.xyz/posts/${slug}`}>
          Share
        </TwitterShareButton>
      </div>
    </div>
  )
}
