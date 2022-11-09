
import Date from '../components/date'
import PostTitle from '../components/post-title'
import { CircularProgressbar } from 'react-circular-progressbar'

export default function PostHeader({ title, updatedAt, shortDescription, type, tags, tokenStrength }) {

  const percentageComplete = tokenStrength * 10

  return (
    <>
      <PostTitle>{title}</PostTitle>

      <div className='flex flex-col md:flex-row-reverse justify-between'>
        <div className='w-20 h-20 self-center mb-4 md:w-40 md:h-40'>
          <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
        </div>
        <div className="mb-6 text-lg md:basis-96">
          <h1>{shortDescription}</h1>
        </div>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Type:</h1>
        <p className='px-3 py-1 text-sm rounded-full font-bold bg-gray-100 text-gray-700 shadow-sm text-white'>{type}</p>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Updated:</h1>
        <Date dateString={updatedAt} />
      </div>
      <div className="mb-6 text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Tags:</h1>
        {tags && tags.map((tag) => (
          <p className='px-3 py-1 text-sm rounded-full bg-gray-600 text-white'>{tag?.title}</p>
        ))}
      </div>
    </>
  )
}
