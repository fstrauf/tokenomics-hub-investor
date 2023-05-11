export default function InfoSection({ text, title, children = null }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full">
      <div className="flex max-w-5xl justify-center rounded-lg bg-gradient-to-r from-dao-green to-dao-red py-2">
        <div className="flex flex-col rounded-lg text-white">
          <h1 className="mb-5 text-center text-2xl font-bold">{title}</h1>
          <p className="mb-2 text-center">{text}</p>
          {children}
        </div>        
      </div>
    </div>
  )
}
