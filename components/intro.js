// import { CMS_NAME, CMS_URL } from '../lib/constants'
import Search from "./search"

export default function Intro() {
  return (
    <section className="mt-16 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <h1 className="text-white text-4xl font-bold leading-tight tracking-tighter md:pr-8 md:text-7xl">
        Tokenomics Hub
      </h1>
      <Search isPost={false} />    
    </section>
  )
}
