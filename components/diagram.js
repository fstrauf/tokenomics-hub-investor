

export default function Diagram({ diagram }) {
  return (
    <section>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Diagram.</h1>
      <div className='border-2 rounded-lg flex justify-center'>
        <iframe className="m-2 w-11/12 h-140" frameborder="0" src={diagram} />
      </div>
    </section>
  )
}
