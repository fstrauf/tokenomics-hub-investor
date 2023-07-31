import Layout from '../components/layout'
import { headerStatus } from '../lib/helper'
// import SubscriptionStatus from '../components/SubscriptionStatus'
import SubscriptionStatus from '../components/subscription/SubscriptionStatus'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import SubscriptionOptions from '../components/subscription/SubscriptionOptions'
import { getAuth } from "@clerk/nextjs/server"
import { useAuth } from '@clerk/nextjs'
import UnAuthenticated from '../components/unauthenticated'

export default function ManageSubscriptions(props) {
  console.log("🚀 ~ file: manage-subscriptions.tsx:13 ~ ManageSubscriptions ~ props:", props)
  const { isSignedIn } = useAuth()
  if (!isSignedIn) return(<UnAuthenticated/>)
  return (
    <>
      <Layout mode={headerStatus.main}>
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="mt-20 text-3xl">
            Upgrade your Token Design - use expert help and unlock the demand
            builder!
          </h1>
          <SubscriptionOptions />
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"/>
          <div className="my-10 flex gap-10">
            <SubscriptionStatus
              customerId={props?.Subscription?.stripeCustomerId}
            />
            <a
              href="https://billing.stripe.com/p/login/8wMcQ7b9w9Yx95S000"
              target="_blank"
            >
              <button className="rounded-md border-2 border-dao-red bg-white px-6 py-4 text-sm font-medium text-dao-red hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Manage Subscription
              </button>
            </a>
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div className="prose m-auto mt-20 mb-20 flex max-w-xl flex-col gap-10">
            <h1 className="text-4xl font-bold">Scope, Terms & Conditions</h1>

            <section id="genesis">
              <h2 className="text-2xl font-bold">Genesis</h2>
              <ul>
                <li>
                  Get unlimited access to the example section, giving you direct
                  insights into how other projects have designed their token.
                </li>
                <li>
                  Balance your Supply with Demand by accessing the demand
                  builder with templates and sample calculations.
                </li>
              </ul>
            </section>

            <section id="navigator">
              <h2 className="text-2xl font-bold">Navigator</h2>
              <ul>
                <li>All the benefits of the Genesis Tier.</li>
                <li>
                  Chat with our experts to discuss issues, questions and ideate
                  on your design for up to two hours a month.
                </li>
              </ul>
            </section>

            <section id="frontier">
              <h2 className="text-2xl font-bold">Frontier</h2>
              <ul>
                <li>All the benefits of the Navigator Tier.</li>
                <li>Get a full review of your design once completed.</li>
              </ul>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = getAuth(context.req)
  const userIdUndefined = userId === null ? '' : userId
  const subscription = await prisma.subscriptions.findUnique({
    where: { authorClerkId: userIdUndefined },
  })

  return {
    props: {
      Subscription: subscription || null,
    },
  }
}
