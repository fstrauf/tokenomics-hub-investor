import Link from 'next/link'

export default function Resources({ resources, tpresources }) {
  return (
    <section>
      <h1 className='section-head'>Resources</h1>
      <div className='border-2 border-dashed rounded-lg'>
      <h1 className='section-head m-2'>Tokenomics DAO</h1>
        <div className='m-2 grid'>
        {resources && resources.map((resource) => (          
          <Link as={resource.url} href={resource.url}>
            <a label={resource.title}>{resource.title}</a>
          </Link>

        ))}
        </div>
        <h1 className='section-head m-2'>3rd Party</h1>
        <div className='m-2 grid'>
        {tpresources && tpresources.map((resource) => (          
          <Link as={resource.url} href={resource.url}>
            <a label={resource.title}>{resource.title}</a>
          </Link>

        ))}
        </div>
      </div>
    </section>
  )
}
