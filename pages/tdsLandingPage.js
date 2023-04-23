// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
// import Intro from '../components/intro'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function tdsLandingPage() {
  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <div className="m-auto mt-10 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
            <div className="ml-10">
              <h1 className="text-4xl font-bold leading-10 md:whitespace-nowrap">
              Design sustainable Tokenomics
              </h1>
              <div className="mt-5 flex">
              <p className="mt-5">
                <li>User-friendly, step-by-step process for designing a token</li>
                <li>Non-jargon guidance and education</li>
                <li>Make the best design decisions with relevant data and insights on similar projects</li>
                <li>Receive a clear and concise, shareable report summarizing your tokenomics</li>
                <li>Get the opinion of an expert to point out potential flaws</li>
              </p>
              <div className="relative h-[276px] w-[384px] object-scale-down">
              <Image
                layout="fill"
                src="/Supply&DemandOverview.png"
                className="rounded-md"
                objectFit="contain"/>
              </div>
            </div>
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                 Design a Token
                </button>
              </Link>
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-white border-2 border-dao-red px-6 py-4 text-sm font-medium text-dao-red hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                 Watch Quick Demo
                </button>
              </Link> 
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div>

          <h1 className="text-2xl font-bold md:whitespace-nowrap">
            Simple step by step design process
            </h1>
          <div className="mt-5 flex">
            <p className="mt-5">
            <li>Industry leading design process</li>
            <li>Educational resources along the way</li>
            <li>Know your unknown unknowns. </li>
            <li>Tokenomics design made simple</li>
            </p>
            <div className="relative h-[484px] w-[313px] object-scale-down">
              <Image
                layout="fill"
                src="/Greatnewtoken.png"
                className="rounded-md"
                objectFit="contain"/>
              </div>
              <div className="relative h-[423px] w-[434px] object-scale-down">
              <Image
                layout="fill"
                src="/ValueCapture.png"
                className="rounded-md"
                objectFit="contain"/>
              </div>
              </div>
            <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

            <h1 className="text-2xl font-bold text-center md:whitespace-nowrap">
            Put your design into perspective
            </h1>
            <p className="mt-5 text-center">
            We show you relevant data, examples and the industry standard of similar projects to help you make better design decisions through every step of the way
            </p>
            <div className="relative h-[274px] w-[1004px] object-scale-down">
              <Image
                layout="fill"
                src="/Example.png"
                className="rounded-md"
                objectFit="contain"/>
              </div>
            <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

            <h1 className="text-2xl font-bold text-center md:whitespace-nowrap">
            Share your tokenomics easily
            </h1>
            <div className="mt-5 flex">
            <div className="relative h-[378px] w-[625px] object-scale-down">
              <Image
                layout="fill"
                src="/Aave.png"
                className="rounded-md"
                objectFit="contain"/>
              </div>
            <p className="mt-5">
            Share your design with team members, VCs, investors, advisors, users, anyone!The TDS is also built into the Tokenomics Hub platform, allow your community to easily understand your tokenomics by publishing your design as a report on the platform
          </p>
          </div>
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

          <h1 className="text-2xl font-bold text-center md:whitespace-nowrap">Get an expert to review your design</h1> 
          <p className="mt-5 text-center">
            Get feedback, guidance and even design help on your tokenomics from experts in the Tokenomics DAO community
            </p>
          <div className="mb-5">
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <h1 className="text-4xl font-bold text-center leading-10 md:whitespace-nowrap">
          Build better Tokenomics
              </h1>
              <p className="mt-5 text-center">
              Powerful and simple to use tokenomics design software to help you create a sustainable token economy
         
          </p>
          <div className="flex justify-center">
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                 Design a Token
                </button>
              </Link>
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-white border-2 border-dao-red px-6 py-4 text-sm font-medium text-dao-red hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                 Watch Quick Demo
                </button>
              </Link>
              </div>
          
           
          </div>
        </div>
      </Layout>
    </>
  )
}
