import Image from 'next/image'
import Header2 from '../components/header2'
import prisma from '../lib/prisma'
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
import { event } from 'nextjs-google-analytics'
// import Link from 'next/link'

export default function TokenomicsDesignSpace(props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useAuth()

  const handleDesignClick = () => {
    //record GA event
    event(`landingPageDesignClick`, {
      category: 'UserAction',
      // label: phase,
    })
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
      Design Your Token Now
    </button>
  )

  return (
    <>
      <Header2 mode={headerStatus.design} />
      <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          {isSignedIn ? (
            <>
              <h1 className="mb-8 mt-6 flex items-center justify-center break-words text-xl leading-tight text-gray-600 md:mb-16 md:mt-10">
                Subscribe to save up to{' '}
                <span className="ml-1 mr-1 inline-block font-oswald text-xl font-bold text-dao-green md:ml-2 md:mr-2 md:text-[35px]">
                  12,000 USD
                </span>
                on your token design.
              </h1>

              <SubscriptionOptions />
              <div className="mt-14 flex justify-center">
                <Image
                  src="/tds_saving_barchart.png"
                  width={670 / 1.5}
                  height={482 / 1.5}
                  className="rounded-md shadow-xl"
                  priority={true}
                  alt="Savings when comparing consulting to TDS"
                />
              </div>
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

      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="flex flex-col justify-center space-y-6 py-6 md:space-y-8 md:py-10 lg:space-y-8 lg:py-10">
          <div className="mb-3 text-center">
            <h1 className="mb-6 text-[25px] leading-7 text-gray-600 md:mb-10 md:text-[30px] md:leading-10 lg:mb-10 lg:text-[60px] lg:leading-10">
              Save up to{' '}
              <span className="mr-2 font-oswald text-xl text-[25px] font-bold text-dao-green md:text-[30px] lg:mr-4 lg:text-[60px]">
                12,000 USD
              </span>
              on your token design.
            </h1>
          </div>

          <div className="flex flex-col items-center justify-evenly space-y-4 md:space-y-0 md:space-x-8 lg:flex-row lg:space-y-0 lg:space-x-8">
            {/* Classic Consulting Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-medium text-gray-600 md:text-5xl lg:text-5xl">
                Hire a Consultant?
              </h2>
              <div className="w-64 rounded-md border border-dao-red bg-dao-red bg-opacity-25 p-3 text-center shadow-inner md:w-96 lg:w-96 lg:p-6">
                <p className="text-lg font-bold text-gray-600 md:text-2xl lg:mb-6 lg:text-2xl">
                  ... and pay min{' '}
                </p>
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-3xl md:mr-4 lg:mr-4">👎</span>
                  <span className="font-oswald text-3xl text-dao-red md:text-[50px] lg:text-[50px]">
                    15,000 USD
                  </span>
                </div>
              </div>
            </div>

            <div className="my-4 text-center md:my-0 md:p-10 lg:my-0">
              <p className="text-4xl md:text-[70px] lg:text-[70px]">🤷‍♀️</p>
            </div>

            {/* Tokenomics Design Space Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-medium text-gray-600 md:text-5xl lg:text-5xl">
                Or DIY?
              </h2>
              <p className="text-center text-base md:text-lg lg:text-lg">
                using our step by step guide, education & expert support...
              </p>
              <div className="w-64 rounded-md border border-dao-green bg-dao-green bg-opacity-25 p-3 text-center shadow-inner md:w-96 lg:w-96 lg:p-6">
                <p className="text-lg font-bold text-gray-600 md:text-2xl lg:mb-6 lg:text-2xl">
                  ... and pay max{' '}
                </p>
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-3xl md:mr-4 lg:mr-4">👍</span>
                  <span className="font-oswald text-3xl text-dao-green md:text-[50px] lg:text-[50px]">
                    2,500 USD
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6 md:pt-8">
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

        <div className="flex w-full flex-col lg:flex-row justify-between gap-5 bg-gradient-to-r from-dao-green to-dao-red py-5 pt-10">
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
          <div className="m-10 lg:w-[650px]">
            {' '}
            <LiteYouTubeEmbed
              id="icWDmXFe7Bo"
              title="Tokenomics Design Space Walkthrough Video"
            />
          </div>
        </div>
        <div className="flex justify-center gap-3">{designLink}</div>

        <div className="flex flex-col lg:flex-row justify-evenly p-10">
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
          <div className="flex justify-center gap-3 py-10">{designLink}</div>
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly p-10">
          <div className="flex mb-10">
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
        <div className="flex justify-center gap-3 py-10">{designLink}</div>
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
