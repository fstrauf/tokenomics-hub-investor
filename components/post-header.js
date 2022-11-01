// import Avatar from '../components/avatar'
import Date from '../components/date'
// import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
export default function PostHeader({ title, coverImage, updatedAt, shortDescription, type, tags }) {

  // https://codepen.io/nkunic/pen/jXBZWV
  const percentageComplete = 0.9
  const strokeDashOffsetValue = 100 - (percentageComplete * 100)


  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div        
        class="inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
      >
        <svg class="w-20 h-20" viewBox="-1 -1 34 34">
          {/* Background */}
          <circle
            class="text-gray-300"
            stroke-width="5"
            stroke="currentColor"
            fill="transparent"
            r="15.9155"
            cx="16"
            cy="16"
          />
          {/* Percentage value */}
          <circle
            class="text-blue-600"
            stroke-width="5"
            stroke-dasharray="100 100"
            stroke-dashoffset={strokeDashOffsetValue}
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            transition= "stroke-dashoffset 1s ease-in-out"
            r="15.9155"
            cx="16"
            cy="16"
          />
        </svg>
        <span class="absolute text-xl text-blue-700">94</span>
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
