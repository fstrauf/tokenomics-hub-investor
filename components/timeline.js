export default function TimeLine({ items }) {

  return (
    <>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Tokenomics Timeline.</h1>

        <ol className="relative border-l border-gray-200">
          {items?.map((item) => (
            <li className="mb-10 ml-6 list-inside">
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
              <p>{new Date(item.date).toISOString().slice(0, 10)}</p>
              <h3 class="text-lg font-semibold">{item.title}</h3>              
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
            </li>
          ))}
        </ol>
    </>
  )
}