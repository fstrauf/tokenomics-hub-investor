// import cn from 'classnames'
import Link from 'next/link'
// import { urlForImage } from '../lib/sanity'

export default function CoverImage({ title, url, slug }) {
  const image = (
    <img
      // width='auto'
      // height='40px'
      alt={`Cover Image for ${title}`}
      className='rounded-lg h-10 m-auto'
      // className={cn('shadow-small', {
      //   'transition-shadow duration-200 hover:shadow-medium': slug,
      // })}
      src={url}
      // src={urlForImage(imageObject)
      //   .width(40)
      //   .height(40)
      //   .url()}
    />
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
