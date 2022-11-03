
import Date from '../components/date'
import PostTitle from '../components/post-title'
import { CircularProgressbar } from 'react-circular-progressbar'

export default function PostHeader({ title, updatedAt, shortDescription, type, tags, tokenStrength }) {

  const percentageComplete = tokenStrength * 10

  return (
    <>
      <PostTitle>{title}</PostTitle>

      <div className='w-20 h-20 md:w-40 md:h-40'>
        <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
      </div>
      <div className="mb-6 text-lg">
        <h1>{shortDescription}</h1>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        {/* <div className="mb-6 grid grid-cols-2 auto-cols-auto w-1/2"> */}
        <h1 className='font-bold'>Type:</h1>
        <h1>{type}</h1>
      </div>
      <div className="text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Updated:</h1>
        <Date dateString={updatedAt} />
      </div>
      <div className="mb-6 text-lg flex flex-auto gap-4">
        <h1 className='font-bold'>Tags:</h1>
        {tags && tags.map((tag) => (
          <p className='rounded-lg bg-gray-800 text-white'>{tag?.title}</p>
        ))}
      </div>
    </>
  )
}
