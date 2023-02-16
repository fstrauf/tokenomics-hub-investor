// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
// import Intro from '../components/intro'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function tokenomicshub() {
  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <div className="m-auto mt-10 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <h1 className="text-xl">
            Design your own tokenomics using our tools and help from our
            community.
          </h1>
          <div className="mt-5 flex">
            <div className="relative h-[276px] w-[384px] object-scale-down">
              <Image
                layout="fill"
                src="/tdf.jpg"
                className="rounded-md"
                objectFit="contain"
              />
            </div>
            <div className="ml-10">
              <h1 className="text-2xl md:whitespace-nowrap">
                Tokenomics Design Framework
              </h1>
              <p className="mt-5">
                Get your copy here and get started designing your own token.
              </p>
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Click Here
                </button>
              </Link>
            </div>
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div>
            <p className="mt-5 font-semibold">
              Get the basic calculation template for free here.
            </p>
            <Link href="https://docs.google.com/spreadsheets/d/1jzhIrZRCnYY22B8jR65r90dw5N52nXLxIlCZI3JP1pg/edit?usp=sharing">
              <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Click Here
              </button>
            </Link>
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div className="mb-5">
            <div className="mt-5 mb-5 font-semibold">
              Access the full calculation template here.{' '}
              <a href="https://youtu.be/JyaJ0lGk2z4">
                <p>(see what's included)</p>
              </a>
            </div>
            <Script src="https://js.stripe.com/v3/pricing-table.js" async />
            {/* <script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
            ></script> */}
            <stripe-pricing-table
              pricing-table-id="prctbl_1LmR42Ks0xSuCAmfiO54IWu1"
              publishable-key="pk_live_51LUqnsKs0xSuCAmfmBBT45ICtEtzj8EkcJK7e2SFncAnbVzjEO4WFY9X3C8Ih1OlevrEAXZmiu86jszeLfQDJ5Xv000IKYBg6T"
            ></stripe-pricing-table>
          </div>
        </div>
      </Layout>
    </>
  )
}
