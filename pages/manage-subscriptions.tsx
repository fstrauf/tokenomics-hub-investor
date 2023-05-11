import Layout from '../components/layout'
import { headerStatus } from '../lib/helper'
// import SubscriptionTable from './SubscriptionTable'
import SubscriptionStatus from './SubscriptionStatus'
import { getAuth } from '@clerk/nextjs/dist/server/getAuth'
import { AuthData } from '@clerk/nextjs/dist/server/types'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import SubscriptionOptions from '../components/SubscriptionOptions'

export default function ManageSubscriptions(props) {
  return (
    <>
      <Layout mode={headerStatus.main}>
        <div className='flex flex-col justify-center items-center gap-10'>
          <h1 className='mt-20 text-3xl'>Upgrade your Token Design - use expert help and unlock the demand builder!</h1>
          {/* <SubscriptionTable /> */}
          <SubscriptionOptions ></SubscriptionOptions>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>

          
          <div className='my-10 flex gap-10'>
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
          <div className="m-auto mt-20 mb-20 flex max-w-xl flex-col gap-10">
            <h1 className="text-4xl font-bold">Scope, Terms & Conditions</h1>            

            <section id="genesis">
              <h2 className="text-2xl font-bold">Genesis</h2>
              <p>We will analyse, review and provide a report with written feedback <a className='underline' href='https://docs.google.com/document/d/1MYPr1nCKQQ8P9MS6F5Pjkp8xITUItKYI9Udwm6Syh9o'>(using this format)</a> and suggestions to improve your tokenomics design.</p>
              <br/>
              <p>The review will include 2 1 hour meetings. The specifics of what to review and provide feedback on can be discussed within the meeting.</p>
              <p>Prefer crypto payment? We accept DAI or USDC on Ethereum: eth:0x9bcF35BD44Cd5902bfa0738b7B2de12d09CC2DC9 send your tx-link to <a className='underline' href='mailto:contact@tokenomicsdao.com'>contact@tokenomicsdao.com</a></p>
            </section>

            <section id="navigator">
              <h2 className="text-2xl font-bold">
                Navigator
              </h2>
              <p>We will analyse, review and provide a report with written feedback <a className='underline' href='https://docs.google.com/document/d/1MYPr1nCKQQ8P9MS6F5Pjkp8xITUItKYI9Udwm6Syh9o'>(using this format)</a> and suggestions to improve your tokenomics design.</p>
              <br/>
              <p>To use this option, your full token design must be in the Tokenomics Design Space</p>
              <br/>
              <p>The review will include 2 1 hour meetings. The specifics of what to review and provide feedback on can be discussed within the meeting.</p>
              <p>Prefer crypto payment? We accept DAI or USDC on Ethereum: eth:0x9bcF35BD44Cd5902bfa0738b7B2de12d09CC2DC9 send your tx-link to <a className='underline' href='mailto:contact@tokenomicsdao.com'>contact@tokenomicsdao.com</a></p>
            </section>

            <section id="frontier">
              <h2 className="text-2xl font-bold">Frontier</h2>
              <p>
                Up to discussion. Scope will be documented and signed off in a
                separate scope document.
              </p>
            </section>
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
