
import Date from '../components/date'

export default function TimeLine({ items }) {
  return (
    <>
      <h1 className='section-head'>Tokenomics Timeline</h1>

        <ol className="relative border-l border-gray-200">
          {items && items.map((item) => (
            <li className="mb-10 ml-6 list-inside">
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
              <Date class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" dateString={item.time} />
              <h3 class="text-lg font-semibold">{item.title}</h3>              
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
            </li>
          ))}
        </ol>
    </>
  )
}