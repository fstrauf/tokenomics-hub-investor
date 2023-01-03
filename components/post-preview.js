import Link from 'next/link'

export default function PostPreview({
  title,
  url,
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
        <img
          alt={`Cover Image for logo`}
          className='rounded-lg h-10 m-auto'
          src={url}
        />
      </div>
    </div>
  )
}
