// import cn from 'classnames'
import Link from 'next/link'
// import { urlForImage } from '../lib/sanity'
import Image from 'next/image'

export default function CoverImage({ title, url, slug }) {
  const image = (
    <div className='rounded-lg h-10 m-auto relative'>
      <Image alt={`Cover Image for ${title}`} className='object-contain' fill={true} src={url}/>
    </div>
    // <img
    //   alt={`Cover Image for ${title}`}
    //   className='rounded-lg h-10 m-auto'
    //   src={url}
    // />
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
