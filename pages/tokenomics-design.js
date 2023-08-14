import Image from 'next/image'
import Header2 from '../components/header2'
import ThubLogo from '../public/svg/thub-logo'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import FaqSection from '../components/static/TDSfaqSection'
import { headerStatus } from '../lib/helper'
import { useRouter } from 'next/router'
import GenericPopover from '../components/generic/GenericPopover'
import SubscriptionOptions from '../components/subscription/SubscriptionOptions'
import SubscriptionTC from '../components/subscription/SubscriptionTC'
import UnAuthenticated from '../components/unauthenticated'
import { getAuth } from '@clerk/nextjs/server'
import React, { useState } from 'react'
import { validateTierAccess } from '../lib/helper'
import { useAuth } from '@clerk/nextjs'
// import Link from 'next/link'

export default function TokenomicsDesignSpace(props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useAuth()

  const handleDesignClick = () => {
    if (validateTierAccess(props?.subscription)) {
      // nav go page
      router.push('/myDesigns')
    } else {
      setIsOpen(true)
    }
  }

  const designLink = (
    <button
      onClick={handleDesignClick}
      className="mt-5 rounded-md bg-dao-red px-6 py-4 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Design a Token
    </button>
  )

  return (
    <>
      <Header2 mode={headerStatus.design} />
      <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          {isSignedIn ? (
            <>
              <h1 className="my-40 text-center text-2xl font-bold">
                Subscribe to get full access to the Tokenomics Design Space
              </h1>
              <SubscriptionOptions />
              <div className="mb-40"></div>
              <SubscriptionTC />
            </>
          ) : (
            <>
              <UnAuthenticated />
            </>
          )}
        </div>
      </GenericPopover>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col justify-center space-y-8 py-10">
          <div className="mb-3 text-center">
            <h1 className="mb-10 flex items-center justify-center text-[60px] leading-10 text-gray-600 md:whitespace-nowrap">
              Save up to{' '}
              <span className="ml-2 mr-4 inline-block font-oswald text-[60px] font-bold text-dao-green">
                12,000 USD
              </span>
              on your token design.
            </h1>
          </div>

          <div className="flex items-center justify-evenly space-x-8">
            {/* Classic Consulting Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-center text-5xl font-medium text-gray-600">
                Hire a Consultant?
              </h2>
              <div className="w-96 rounded-md border border-dao-red bg-dao-red bg-opacity-25 p-3 text-center shadow-inner">
                <p className="text-center text-2xl font-bold text-gray-600">
                  ... and pay min{' '}
                </p>
                <div className="relative flex items-center justify-center">
                  <span className="mr-4 text-4xl">👎</span>
                  <span className="inline-block w-72 font-oswald text-[50px] text-dao-red">
                    15,000 USD
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="px-4 text-[70px]">🤷‍♀️</p>
            </div>

            {/* Tokenomics Design Space Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl text-5xl font-medium text-gray-600">
                Or DIY?
              </h2>
              <p className="text-center">
                using our step by step guide, education & expert support...
              </p>
              <div className="w-96 rounded-md border border-dao-green bg-dao-green bg-opacity-25 p-3 text-center shadow-inner">
                <p className="text-center text-2xl font-bold text-gray-600">
                  ... and pay max{' '}
                </p>
                <div className="relative flex items-center justify-center">
                  <span className="mr-4 text-4xl">👍</span>
                  <span className="inline-block w-72 font-oswald text-[50px] text-dao-green">
                    2,500 USD
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Image
              src="/tds_saving_barchart.png"
              width={670 / 1.5}
              height={482 / 1.5}
              className="rounded-md shadow-xl"
              alt="Savings when comparing consulting to TDS"
            />
          </div>
          <div className="flex justify-center gap-3">{designLink}</div>
        </div>

        <div className="flex w-full justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
          <div className="prose p-10">
            <h1 className="text-5xl font-bold leading-10 text-white md:whitespace-nowrap">
              Improved Tokenomics Calculator
            </h1>
            <h2 className="mt-0 font-normal text-white">
              Design Sustainable Tokenomics
            </h2>
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
          </div>
          <div className="m-10 w-[650px]">
            {' '}
            <LiteYouTubeEmbed
              id="icWDmXFe7Bo"
              title="Tokenomics Design Space Walkthrough Video"
            />
          </div>
        </div>
        <div className="flex justify-center gap-3">{designLink}</div>

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
        <div className="flex justify-center gap-3 py-10">{designLink}</div>
        
        <div className="flex flex-col items-center bg-gray-100 p-5">
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
        <div className="flex justify-evenly p-10">
          <div className="flex">
            <div className="relative object-scale-down">
              <Image
                width={1000 / 1.5}
                height={292 / 1.5}
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
                Tokenomics Design Space provides a framework for estimating
                token demand in 3 simple steps:
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
        <div className="flex flex-col items-center bg-gray-100 p-10">
          <h1 className="prose mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            Tokenomics Audit
          </h1>
          <p className="prose mt-5 text-center text-xl">
            Get a Tokenomics DAO expert to audit your tokenomics and provide
            feedback, guidance and even design help
          </p>
          <div className="m-10 h-24 w-24">
            <ThubLogo />
          </div>
        </div>
        <FaqSection />
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

export const getServerSideProps = async ({ req, res }) => {
  const { userId = null } = getAuth(req)
  const userIdUndefined = userId === null ? '' : userId

  const subscription = await prisma.subscriptions.findUnique({
    where: { authorClerkId: userIdUndefined },
  })
  return {
    props: {
      subscription: subscription || null,
    },
  }
}
