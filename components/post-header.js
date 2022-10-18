// import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
export default function PostHeader({ title, coverImage, updatedAt, shortDescription, type }) {
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
      <div className="mb-6 flex">
        <h1 className='font-bold w-20'>Type:</h1>
        <h1>{type}</h1>
      </div>
      <div className="mb-6 text-lg flex">
        <h1 className='font-bold w-20'>Updated:</h1>
        <Date dateString={updatedAt} />
      </div>
    </>
  )
}
