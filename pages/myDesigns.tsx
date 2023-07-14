import React, { useState } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { AuthData } from '@clerk/nextjs/dist/server/types'
import {
  clerkConvertJSON,
  headerStatus,
  postStatus,
  postType,
} from '../lib/helper'
import DesignCard from '../components/tdf/designCard'
import Link from 'next/link'
import InfoSection from '../components/generic/InfoSection'
import Layout from '../components/layout'
import GenericPopover from '../components/generic/GenericPopover'
import NewDesignMinimal from '../components/tdf/newDesignMinimal'
import { useAuth } from '@clerk/nextjs'
import UnAuthenticated from '../components/unauthenticated'

export default function MyDesigns(props) {
  console.log("🚀 ~ file: myDesigns.tsx:22 ~ MyDesigns ~ props:", props)
  const { isSignedIn } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  function handleNewDesign(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setIsOpen(true)
  }

  return (
    <Layout mode={headerStatus.design}>
      <>
        {isSignedIn ? (
          <>
            <div className="my-10 w-full">
              <div className="flex items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-dao-red to-dao-green p-2">
                <p className="text-center text-white">
                  Upgrade your Token Design - use expert help and unlock the
                  demand builder!
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/manage-subscriptions"
                    className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  >
                    Upgrade to Premium
                  </Link>
                  <Link
                    href="/manage-subscriptions"
                    className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4 rounded-lg bg-gray-100 p-1">
              <div className="flex items-center justify-between rounded-lg p-2 py-2">
                <p className="text-xl font-bold">My Designs</p>
                <div className="flex gap-1">
                  <button
                    onClick={handleNewDesign}
                    className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                  >
                    New Design
                  </button>
                </div>
              </div>
              <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
                <NewDesignMinimal
                  newPost={props?.newPost}
                  postCount={props?.postCount}
                  subscription={props?.subscription}
                />
              </GenericPopover>
              <div className="overflow-x-auto rounded-lg bg-white">
                <div className="flex flex-wrap items-center justify-center">
                  {props?.posts?.length === 0 ? (
                    <div className="pb-5">
                      <InfoSection
                        text="Tokenomics Hub offers entrepreneurs an industry leading framework with a built in suite of tools to help you create sustainable tokenomics (in beta)"
                        title="Want to design a token?"
                      >
                        <div className="flex justify-center">
                          <Link
                            href="/tokenomics-design"
                            className="w-36 self-center rounded-md border-2 border-dark-tdao bg-white px-4 py-2 text-center text-sm font-medium text-dark-tdao hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Design a Token
                          </Link>
                        </div>
                      </InfoSection>
                    </div>
                  ) : (
                    <></>
                  )}
                  {props?.posts.map((post, index) => {
                    return (
                      <div key={index}>
                        <DesignCard post={post} context="myDrafts" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <UnAuthenticated />
        )}
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { userId = null }: AuthData = getAuth(req)
  const userIdUndefined = userId === null ? '' : userId

  const txCalls = []

  txCalls.push(
    prisma.post.findMany({
      where: {
        // status: {
        //   not: postStatus.published,
        // },
        postType: postType.design,
        authorClerkId: userIdUndefined,
      },
      include: {
        categories: {
          select: {
            label: true,
          },
        },
        tags: {
          select: {
            label: true,
          },
        },
        author: {},
      },
      take: 20,
    })
  )

  txCalls.push(
    prisma.post.count({
      where: {
        postType: postType.design,
        authorClerkId: userIdUndefined,
      },
    })
  )

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(
    prisma.subscriptions.findUnique({
      where: { authorClerkId: userIdUndefined },
    })
  )

  const [posts, postCount, designPhases, subscription] =
    await prisma.$transaction(txCalls)

  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: userIdUndefined,
    status: postStatus.draft,
    ticker: '',
    DesignElement: designPhases
      .filter((dp) => dp.parentPhaseId)
      .map((dp) => {
        return {
          id: '',
          content: '',
          designPhasesId: String(dp.phaseId),
          designElementStatus: '',
        }
      }),
    Calculation: {
      id: '',
      title: '',
      authorClerkId: '',
      months: 60,
      totalSupply: 10000,
      startDate: new Date().toLocaleDateString('en-CA'),
      areaData: [],
      calculationRows: [],
    },
    Mechanism: [
      {
        id: '',
        name: `Supply 1`,
        summary: 'Adjust this to whoever you are giving tokens to',
        details: '',
        isSink: false,
        token: '',
        category: `supply1`,
        lockupPeriod: 5,
        unlockPeriod: 12,
        percentageUnlockTGE: 0,
        percentageAllocation: 35,
        color: `#FF6666`,
        isEpochDistro: false,
        supplyDemandType: 'supplyExternal',
        epochDurationInSeconds: 0,
        initialEmissionPerSecond: 0,
        emissionReductionPerEpoch: 0,
        CalculationTimeSeries: [],
        isTemplate: false,
        PostUser: [],
      },
      {
        id: '',
        name: `Supply 2`,
        summary:
          'Briefly explain what this mechanism incentivises users to do and why they want to do it. (e.g., users are incentivised to buy and stake a token in order to receive token emissions)',
        details: '',
        isSink: false,
        token: '',
        category: `supply2`,
        lockupPeriod: 5,
        unlockPeriod: 12,
        percentageUnlockTGE: 0,
        percentageAllocation: 65,
        color: `#008090`,
        isEpochDistro: false,
        supplyDemandType: 'supplyInternal',
        epochDurationInSeconds: 0,
        initialEmissionPerSecond: 0,
        emissionReductionPerEpoch: 0,
        CalculationTimeSeries: [],
        isTemplate: false,
        PostUser: [],
      },
    ],
    mechanismTemplates: [],
    PostUser: [],
    slug: '',
    shortDescription: '',
    categories: [],
    tags: [],
    protocolTimeLine: [],
    publishedAt: new Date().toLocaleDateString('en-CA'),
    breakdown: '',
    mainImageUrl: '',
    tokenUtility: '',
    tokenUtilityStrength: 0,
    businessModel: '',
    businessModelStrength: 0,
    valueCreation: '',
    valueCreationStrength: 0,
    valueCapture: '',
    valueCaptureStrength: 0,
    demandDrivers: '',
    demandDriversStrength: 0,
    totalTokenStrength: 0,
    threeMonthHorizon: '',
    oneYearHorizon: '',
    upside: '',
    postType: postType.design,
    downside: '',
    horizon: '',
    metrics: '',
    diagramUrl: '',
    ProtocolResources: [],
    strongPoints: '',
    weakPoints: '',
    problemSolution: '',
    parent: '',
  }

  let user = userId ? await clerkClient.users.getUser(userId) : {}

  user = clerkConvertJSON(user)

  const postsWithUserNames = posts.map((post) => {
    const eA = user?.emailAddresses || []
    const authorEmail =
      eA.find((email) => email.id === user?.primaryEmailAddressId)
        ?.emailAddress || ''

    return {
      ...post,
      author: user?.username,
      authorEmail: authorEmail,
    }
  })

  return {
    props: {
      newPost: defaultContent || {},
      posts: postsWithUserNames || null,
      postCount: postCount || 0,
      subscription: subscription || {},
      // userId: userId || null,
    },
    // revalidate: 1,
  }
}
