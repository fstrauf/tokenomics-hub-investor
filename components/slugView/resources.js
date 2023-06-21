import Link from 'next/link'

export default function Resources({ resources }) {
  if (resources.length === 0)
    return (
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Resources.
      </h1>
    )

  var internal = resources.filter((res) => res.internal)
  var external = resources.filter((res) => !res.internal)

  return (
    <section>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Resources.
      </h1>
      <div className="rounded-lg border-2">
        <h1 className="section-head m-2">Tokenomics DAO</h1>
        <div className="m-2 grid">
          {internal?.map((resource) => (
            <Link
              key={resource.id}
              as={resource.url}
              href={resource.url}
              label={resource.title}
            >
              {resource.title}
            </Link>
          ))}
        </div>
        <h1 className="section-head m-2">3rd Party</h1>
        <div className="m-2 grid">
          {external.map((resource) => (
            <Link
              key={resource.id}
              as={resource.url}
              href={resource.url}
              label={resource.title}
            >
              {resource.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
