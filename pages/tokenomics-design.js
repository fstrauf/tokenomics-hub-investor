import Image from 'next/image'
import Link from 'next/link'
import Header2 from '../components/header2'
import ThubLogo from '../public/svg/thub-logo'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import FaqSection from '../components/static/TDSfaqSection'

export default function TokenomicsDesignSpace() {
  const designLink = (
    <Link href="/newDesign">
      <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Design a Token (it's free)
      </button>
    </Link>
  )

  return (
    <>
      <Header2 />

      <div className="m-auto">
        <div className="">
          <div className="flex w-full justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
            <div className="prose p-10">
              <h1 className="mb-5 text-5xl font-bold leading-10 text-white md:whitespace-nowrap">
                Design sustainable Tokenomics
              </h1>
              <div className="prose flex flex-col p-3 text-white">
                <p>
                  Designing tokenomics in a spreadsheet can be complicated and
                  frustrating. Simplify the process with Tokenomics Design Space
                </p>
                <ul className="prose text-white">
                  <li>
                    Easy to use interface with built in step by step process
                  </li>
                  <li>
                    Contextual insights on similar projects in the same niche
                  </li>
                  <li>Framework for estimating demand</li>
                  <li>Get your tokenomics audited by an expert</li>
                </ul>
              </div>
              <div className="flex gap-3">{designLink}</div>
            </div>
            <div className="m-10 w-[650px]">
              {' '}
              <LiteYouTubeEmbed
                id="dq_SowJgRvE"
                title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
              />
            </div>
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

        <div className="flex justify-evenly p-10">
          <div className="prose pl-20">
            <h1 className="prose mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
              Easy to use interface
            </h1>
            <div className="flex flex-col gap-4 text-xl">
              <p>
                Tokenomics Design Space offers an intuitive interface that
                simplifies the token design process.
              </p>
              <p>
                If you’ve ever felt like you’re leaving out an important step or
                simply don’t know what the next step in the design process is,
                we’ve got you covered.
              </p>
            </div>
          </div>
            <div className="relative">
              <Image
                width={1191}
                height={948}
                src="/demandCalcHalf.png"
                className="rounded-md shadow-xl"
                alt="Token Editor Flow"
              />
            </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex flex-col items-center bg-gray-50 p-3">
          <h1 className="prose mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            Put your design into perspective
          </h1>
          <p className="prose mt-5 p-10 text-center text-xl">
            We show you relevant data, examples and the industry standard of
            similar projects to help you make better design decisions through
            every step of the way
          </p>
          <div className="relative object-scale-down">
            <Image
              src="/Example.png"
              width={2550 / 2}
              height={606 / 2}
              className="rounded-md shadow-xl"
              alt="Examples help to break diwn the complexity of token design"
            />
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex justify-evenly p-3">
          <div className="flex">
            <div className="relative object-scale-down">
              <Image
                width={1000/1.2}
                height={292/1.2}
                src="/supply_vs_demand.png"
                className="rounded-md shadow-xl"
                alt="Compare supply and demand"
              />
            </div>
          </div>
          <div className="prose">
            <h1 className="mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
              Estimate your Token Demand
            </h1>
            <div className="prose flex flex-col p-3">
                <p>
                Tokenomics Design Space provides a framework for estimating token demand in 3 simple steps:
                </p>
                <ol className="prose">
                  <li>
                    Easy to use interface with built in step by step process
                  </li>
                  <li>
                    Contextual insights on similar projects in the same niche
                  </li>
                  <li>Framework for estimating demand</li>
                  <li>Get your tokenomics audited by an expert</li>
                </ol>
              </div>
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex flex-col items-center bg-gray-50 p-3">
          <h1 className="prose mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Tokenomics Audit
          </h1>
          <p className="prose mt-5 text-center text-xl">
          Get a Tokenomics DAO expert to audit your tokenomics and provide feedback, guidance and even design help
          </p>
          <div className="m-10 h-24 w-24">
            <ThubLogo />
          </div>
        </div>
        <FaqSection/>
        <div className="flex w-full flex-col justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
          <h1 className="prose text-center text-4xl font-bold leading-10 text-white md:whitespace-nowrap">
            Build better Tokenomics Easily
          </h1>
          <p className="mt-5 text-center text-xl text-white">
            Powerful and simple to use tokenomics design software to help you
            create a sustainable token economy
          </p>
          <div className="flex justify-center gap-3">{designLink}</div>
        </div>
      </div>
    </>
  )
}
