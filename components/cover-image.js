import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage({ title, url, id }) {
  const image = (
    <div className='rounded-lg h-8 m-auto relative'>
      <Image alt={`Cover Image for ${title}`} className='object-contain' fill={true} src={url}/>
    </div>
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {id ? (
        <Link as={`/posts/${id}`} href="/posts/[id]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
