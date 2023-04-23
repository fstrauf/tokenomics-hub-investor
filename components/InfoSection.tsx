export default function InfoSection({ text, title }) {
  return (
    <div className='flex items-center mt-10 justify-center'>
    <div className="flex max-w-5xl justify-center rounded-lg bg-gradient-to-r from-dao-green to-dao-red py-1">
      <div className="flex w-3/4 flex-col rounded-lg text-white">
        <h1 className="mb-5 text-center text-2xl font-bold">{title}</h1>
        <p className="mb-2 text-center">{text}</p>
      </div>
    </div>
    </div>
  )
}
