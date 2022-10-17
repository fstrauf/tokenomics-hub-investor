import Link from 'next/link'

export default function Resources({ resources }) {
  return (
    <section>
      <h1 className='section-head'>Resources</h1>
      <div className='border-4 border-dashed'>
        <div className='m-2 grid'>
        {resources.map((resource) => (          
          <Link as={resource.url} href={resource.url}>
            <a label={resource.title}>{resource.title}</a>
          </Link>

        ))}
        </div>
      </div>
    </section>
  )
}
