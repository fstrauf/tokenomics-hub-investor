import Layout from '../components/layout'
import { headerStatus } from '../lib/helper'
import SubscriptionTable from './SubscriptionTable'
import SubscriptionStatus from './SubscriptionStatus'
import { getAuth } from '@clerk/nextjs/dist/server/getAuth'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'

export default function ManageSubscriptions(props) {
  return (
    <>
      <Layout mode={headerStatus.main}>
        <div className='flex flex-col justify-center items-center gap-10'>
          <SubscriptionTable />
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <SubscriptionStatus
            customerId={props?.Subscription?.stripeCustomerId}
          />
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div>
            <a
              href="https://billing.stripe.com/p/login/8wMcQ7b9w9Yx95S000"
              target="_blank"
            >
              <button className="mt-5 rounded-md border-2 border-dao-red bg-white px-6 py-4 text-sm font-medium text-dao-red hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Manage Subscription
              </button>
            </a>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId }: AuthData = getAuth(context.req)
  const subscription = await prisma.subscriptions.findUnique({
    where: { authorClerkId: userId },
  })

  return {
    props: {
      Subscription: subscription || null,
    },
  }
}
