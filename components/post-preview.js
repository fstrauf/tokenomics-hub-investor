// import Avatar from '../components/avatar'
// import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
// import { urlForImage } from '../lib/sanity'

export default function PostPreview({
  title,
  coverImage,
  // date,
  // excerpt,
  // author,
  slug,
}) {
  return (
    <div className='m-2 ml-0 mr-4'>
      <h3 className="mb-3 text-xl leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-5 rounded-lg">
        {/* <CoverImage
          slug={slug}
          title={title}
          imageObject={coverImage}
          url={urlForImage(coverImage).url()}
        /> */}
      </div>
      {/* <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      <Avatar name={author?.name} picture={author?.picture} /> */}
    </div>
  )
}
