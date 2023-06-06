// import Layout from '../components/layout'
import React, { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import { getMergedInitialCalcValues, postStatus, postType, upDateFirstTimeVisit } from '../lib/helper'
import TDFMain from '../components/tdf/TDFMain'
import GenericPopover from '../components/generic/GenericPopover'
// import ReportIntro from '../components/tdf/ReportIntro'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import DesignIntro from '../components/tdf/DesignIntro'
import { getAuth } from "@clerk/nextjs/server"

export default function NewDesign(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const introComplete = user?.publicMetadata.designIntroDone || false

  useEffect(() => {
    if (!introComplete) {
      setIsOpen(true)
      upDateFirstTimeVisit(user?.id, 'designIntroDone', true)
    }
  }, [introComplete])
  return (
    <>
      <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
        {/* <ReportIntro />
         */}
         <DesignIntro />
      </GenericPopover>
      <TDFMain props={props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = getAuth(context.req)

  const txCalls = []

  txCalls.push(prisma.designPhases.findMany({ orderBy: { phaseOrder: 'asc' } }))

  txCalls.push(
    prisma.calculation.findMany({
      where: {
        authorClerkId: userId,
      },
    })
  )

  txCalls.push(
    prisma.mechanism.findMany({
      where: {
        isTemplate: true,
      },
    })
  )

  txCalls.push(
    prisma.postUser.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.category.findMany({
      where: {},
    })
  )

  txCalls.push(
    prisma.tag.findMany({
      where: {},
    })
  )
  txCalls.push(prisma.subscriptions.findUnique({where:{authorClerkId: userId}}))

  const [designPhases, userCalcs, mechanismTemplates, PostUser, Category, Tag, Subscription] =
    await prisma.$transaction(txCalls)

  const defaultContent = {
    id: '',
    title: '',
    authorClerkId: userId,
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
    Mechanism: [{
      id: '',
      name: `Supply 1`,
      summary:
        'Adjust this to whoever you are giving tokens to',
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
    },{
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
    }],
    mechanismTemplates: mechanismTemplates || [],
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

  return {
    props: {
      post: defaultContent,
      designPhases: designPhases || null,
      preloadInitialCalcValues:
        getMergedInitialCalcValues(userCalcs, userId, null) || null,
      mechanismTemplates: mechanismTemplates || null,
      PostUser: PostUser || null,
      Category: Category || null,
      Tag: Tag || null,
      Subscription: Subscription || null,
    },
  }
}
