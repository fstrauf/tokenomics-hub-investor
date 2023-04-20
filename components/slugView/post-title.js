import Image from 'next/image'

export default function PostTitle({ title, imageUrl }) {
  return (
    <div className="flex justify-start">
      <div className="w-9 sm:w-16">
        <div className="relative m-auto h-44 rounded-lg">
          {imageUrl ? (
            <Image
              alt={`Cover Image for ${title}`}
              className="object-contain"
              fill={true}
              src={imageUrl}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <h1 className="mt-auto mb-auto ml-4 text-left text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {title}
      </h1>
    </div>
  )
}
