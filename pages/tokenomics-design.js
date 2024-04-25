import Header2 from '../components/header2'
import prisma from '../lib/prisma'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { headerStatus } from '../lib/helper'
import { useRouter } from 'next/router'
import { getAuth } from '@clerk/nextjs/server'
import React from 'react'
import { event } from 'nextjs-google-analytics'
import ThubLogo from '../public/svg/thub-logo'

export default function TokenomicsDesignSpace(props) {
  const router = useRouter()
  // const [isOpen, setIsOpen] = useState(false)

  const handleDesignClick = () => {
    event(`landingPageDesignClick`, {
      category: 'UserAction',
    })
    // if (validateTierAccess(props?.subscription)) {
    router.push('/myDesigns')
    // } else {
    //   setIsOpen(true)
    // }
  }

  const PlusSign = () => {
    return (
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.75 8C20.75 7.58579 20.4142 7.25 20 7.25C19.5858 7.25 19.25 7.58579 19.25 8H20.75ZM19.25 33C19.25 33.4142 19.5858 33.75 20 33.75C20.4142 33.75 20.75 33.4142 20.75 33H19.25ZM32.5 21.25C32.9142 21.25 33.25 20.9142 33.25 20.5C33.25 20.0858 32.9142 19.75 32.5 19.75V21.25ZM7.5 19.75C7.08579 19.75 6.75 20.0858 6.75 20.5C6.75 20.9142 7.08579 21.25 7.5 21.25L7.5 19.75ZM19.25 8V33H20.75V8H19.25ZM32.5 19.75L7.5 19.75L7.5 21.25L32.5 21.25V19.75Z"
          fill="#000F21"
        />
      </svg>
    )
  }

  const ForgdLogo = () => {
    return (
      <svg
        width="100"
        height="101"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="1"
          width="99"
          height="99"
          rx="23.5"
          fill="url(#paint0_linear_76_3632)"
        />
        <rect x="0.5" y="1" width="99" height="99" rx="23.5" stroke="#95958D" />
        <g filter="url(#filter0_i_76_3632)">
          <path
            d="M31.5272 67.3545L47.2244 30.7H87.4001L83.2269 40.348C82.6013 41.7943 81.4309 42.8917 79.9018 43.4657L55.7933 52.5152C53.4383 53.3992 54.1107 56.8841 56.8307 57.8916L59.2884 58.8019C60.5049 59.2525 61.234 60.5715 60.8232 61.5786L57.8275 68.9221C57.4784 69.778 56.6386 70.2999 55.6106 70.2999H33.8352C32.2856 70.2999 30.9796 68.6332 31.5272 67.3545Z"
            fill="#C7C7BE"
          />
        </g>
        <g filter="url(#filter1_i_76_3632)">
          <path
            d="M15.52 37.5C12.5322 44.2024 19.3017 53.1 27.3888 53.1H28.7491C29.1025 53.1 29.393 52.9213 29.5195 52.6261L36 37.5H15.52Z"
            fill="#C7C7BE"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_76_3632"
            x="31.4001"
            y="30.7"
            width="56.2"
            height="39.8"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="0.4" dy="0.8" />
            <feGaussianBlur stdDeviation="0.1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_76_3632"
            />
          </filter>
          <filter
            id="filter1_i_76_3632"
            x="14.8"
            y="37.5"
            width="21.4"
            height="15.8"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="0.4" dy="0.8" />
            <feGaussianBlur stdDeviation="0.1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_76_3632"
            />
          </filter>
          <linearGradient
            id="paint0_linear_76_3632"
            x1="50"
            y1="0.5"
            x2="50"
            y2="100.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#021842" />
            <stop offset="1" stop-color="#001221" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  const designLink = (
    <button onClick={handleDesignClick}>
      <div className="font-sora text-base font-semibold leading-6 text-white">
        Design Your Token Now
      </div>
    </button>
  )

  return (
    <>
      <Header2 mode={headerStatus.design} />
      <div className="flex items-center justify-center p-28">
        <div className="inline-flex h-[650px] w-[910px] flex-col items-center justify-center gap-6 rounded-lg bg-neutral-200 py-8">
          <div className="inline-flex items-center justify-start gap-6">
            <ForgdLogo />
            <div className="relative h-10 w-10">
              <PlusSign />
            </div>
            <div className="h-[100px] w-[100px]">
              <ThubLogo />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <div className="mx-auto flex max-w-[800px] flex-col items-center justify-start gap-2 self-stretch">
              <div className="text-slate-950 self-stretch text-center font-sora text-4xl font-semibold leading-[54px]">
                Tokenomics Hub is now part of Forgd
              </div>
              <div className="self-stretch text-center font-sora text-xl font-normal leading-7 text-[#000F21]">
                If you have previously used Tokenomics Design Space and want to
                continue using it, access it below.
              </div>
            </div>
          </div>
          <div className="border-radius: 8px border- inline-flex h-[60px] w-[280px] items-center justify-center gap-2 rounded-lg bg-[#000F21] px-[40px] py-2.5">
            <div className="flex items-center justify-center">{designLink}</div>
          </div>
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
