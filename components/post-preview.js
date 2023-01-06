import Link from 'next/link'

export default function PostPreview({
  title,
  url,
  slug,
}) {
  return (
    <div className=''>
      <h3 className="mb-3 text-lg leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-2 rounded-lg">
        <img
          alt={`Cover Image for logo`}
          className='rounded-lg h-7 m-auto'
          src={url}
        />
      </div>
    </div>
  )
}
