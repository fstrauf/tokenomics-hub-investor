import Link from 'next/link'
import Search from "./search"

export default function Header() {
  return (
    <>
      <section className="mt-16 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
        <h2 className="text-2xl mb-5 font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/">
            <a className="hover:underline">Tokenomics Hub</a>
          </Link>
        </h2>
        <Search isPost={true} />
      </section>
    </>
  )
}
