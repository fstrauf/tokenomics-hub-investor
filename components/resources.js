import Link from 'next/link'

export default function Resources({ resources }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        Learn More
      </h2>
      <div className="md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32 grid grid-cols-1 md:grid-cols-2">
        {resources.map((resource) => (
          // <h1>{resource.title}</h1>
          <Link as={resource.url} href={resource.url}>
            <a label={resource.title}>{resource.title}</a>
          </Link>

        ))}
      </div>
    </section>
  )
}
