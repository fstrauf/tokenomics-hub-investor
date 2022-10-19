import Link from 'next/link'

export default function Resources({ resources, name }) {
  return (
    <section>
      <h1 className='section-head'>{name}</h1>
      <div className='border-4 border-dashed rounded-lg'>
        <div className='m-2 grid'>
        {resources && resources.map((resource) => (          
          <Link as={resource.url} href={resource.url}>
            <a label={resource.title}>{resource.title}</a>
          </Link>

        ))}
        </div>
      </div>
    </section>
  )
}
