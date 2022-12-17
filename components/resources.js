import Link from 'next/link'

export default function Resources({ resources }) {

  var internal = resources.filter(res => res.internal)
  var external = resources.filter(res => !res.internal)

  return (
    <section>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Resources.</h1>
      <div className='border-2 rounded-lg'>
      <h1 className='section-head m-2'>Tokenomics DAO</h1>
        <div className='m-2 grid'>
        {internal?.map((resource) => (     
          <Link key={resource.id} as={resource.url} href={resource.url} label={resource.title}>
            {resource.title}
          </Link>

        ))}
        </div>
        <h1 className='section-head m-2'>3rd Party</h1>
        <div className='m-2 grid'>
        {external.map((resource) => (          
          <Link key={resource.id} as={resource.url} href={resource.url} label={resource.title}>
            {resource.title}
          </Link>

        ))}
        </div>
      </div>
    </section>
  )
}
