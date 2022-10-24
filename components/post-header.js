// import Avatar from '../components/avatar'
import Date from '../components/date'
// import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
export default function PostHeader({ title, coverImage, updatedAt, shortDescription, type, tags }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {/* <div className="hidden md:mb-12 md:block">
        <Avatar name={author?.name} picture={author?.picture} />
      </div> */}
      {/* <div className="-mx-5 mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div> */}
      {/* <div className="mx-auto max-w-2xl"> */}
      {/* <div className="mb-6 block md:hidden">
          <Avatar name={author?.name} picture={author?.picture} />
        </div> */}

      {/* </div> */}
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
