// import { getAllPostsForHome } from '../lib/api'
// import Layout from '../components/layout'
// import Intro from '../components/intro'
import Image from 'next/image'
import Link from 'next/link'
import Header2 from '../components/header2'
import ThubLogo from '../public/svg/thub-logo'
// import Script from 'next/script'

export default function tdsLandingPage() {
  const videoLink = (
    <a href="https://youtu.be/SUoKhNti9pk" target="_blank">
      <button className="mt-5 rounded-md border-2 border-dao-red bg-white px-6 py-4 text-sm font-medium text-dao-red hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Watch Quick Demo
      </button>
    </a>
  )

  return (
    <>
      {/* <Layout> */}
      <Header2 />
      <div className="m-auto">
        <div className="">
          <div className="flex w-full justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
            <div className="p-10">
              <h1 className="mb-5 text-5xl font-bold leading-10 text-white md:whitespace-nowrap">
                Design sustainable Tokenomics
              </h1>
              <div className="flex p-3 text-xl text-white">
                <p className="">
                  <li>
                    User-friendly, step-by-step process for designing a token
                  </li>
                  <li>Non-jargon guidance and education</li>
                  <li>
                    Make the best design decisions with relevant data and
                    insights on similar projects
                  </li>
                  <li>
                    Receive a clear and concise, shareable report summarizing
                    your tokenomics
                  </li>
                  <li>
                    Get the opinion of an expert to point out potential flaws
                  </li>
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/myDesigns">
                  <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Design a Token
                  </button>
                </Link>
                {videoLink}
              </div>
            </div>
            <div className="">
              <div className="flex">
                <Image
                  src="/demandCalcHalf.png"
                  width={1191 / 2}
                  height={948 / 2}
                  className="rounded-md shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

        <div className="flex justify-evenly p-10">
          <div className="pl-20">
            <h1 className="mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
              Simple step by step design process
            </h1>
            <div className="flex flex-col gap-4 text-xl">
              <p>Industry leading design process</p>
              <p>Educational resources along the way</p>
              <p>Know your unknown unknowns. </p>
              <p>Tokenomics design made simple</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="relative">
              <Image
                width={502 / 2}
                height={802 / 2}
                src="/Greatnewtoken.png"
                className="rounded-md shadow-xl"
              />
            </div>
            <div className="relative object-scale-down">
              <Image
                width={1248 / 3}
                height={1266 / 3}
                src="/ValueCapture.png"
                className="rounded-md shadow-xl"
              />
            </div>
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex flex-col items-center bg-gray-50 p-3">
          <h1 className="mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            Put your design into perspective
          </h1>
          <p className="mt-5 p-10 text-center text-xl">
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
            />
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex justify-evenly p-3">
          <div className="flex">
            <div className="relative object-scale-down">
              <Image
                width={1218 / 2.5}
                height={1458 / 2.5}
                src="/Aave.png"
                className="rounded-md shadow-xl"
              />
            </div>
          </div>
          <div>
            <h1 className="mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
              Share your tokenomics easily
            </h1>
            <p className="mt-5 w-96 text-right text-xl">
              Share your design with team members, VCs, investors, advisors,
              users, anyone!<br></br>
              <br></br>The TDS is also built into the Tokenomics Hub platform,
              allow your community to easily understand your tokenomics by
              publishing your design as a report on the platform
            </p>
          </div>
        </div>
        <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex flex-col items-center bg-gray-50 p-3">
          <h1 className="mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            Get an expert to review your design
          </h1>
          <p className="mt-5 text-center text-xl">
            Get feedback, guidance and even design help on your tokenomics from
            experts in the Tokenomics DAO community
          </p>
          <div className="m-10 h-24 w-24">
            <ThubLogo />
          </div>
        </div>

        {/* <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr> */}

        <div className="flex w-full flex-col justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
          <h1 className="text-center text-4xl font-bold leading-10 text-white md:whitespace-nowrap">
            Build better Tokenomics
          </h1>
          <p className="mt-5 text-center text-xl text-white">
            Powerful and simple to use tokenomics design software to help you
            create a sustainable token economy
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/myDesigns">
              <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Design a Token
              </button>
            </Link>
            {videoLink}
          </div>
        </div>
      </div>
      {/* </Layout> */}
    </>
  )
}
