

export default function Diagram({ diagram }) {
  return (
    <section>
      <h1 className='section-head'>Diagram</h1>
      <div className='border-4 border-dashed rounded-lg flex justify-center'>
        <iframe className="m-2 w-11/12 h-140" frameborder="0" src={diagram} />
      </div>
    </section>
  )
}
