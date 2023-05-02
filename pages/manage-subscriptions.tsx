import Layout from '../components/layout'
import { headerStatus } from '../lib/helper'
import Script from 'next/script'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function ManageSubscriptions() {

  const { user } = useUser()
  return (
    <>
      <Layout mode={headerStatus.main}>
        <>
          <div className="mt-10">
            <Script src="https://js.stripe.com/v3/pricing-table.js" async />
            <stripe-pricing-table
              pricing-table-id="prctbl_1N2jx5Ks0xSuCAmfbSPvhMPY"
              publishable-key="pk_live_51LUqnsKs0xSuCAmfmBBT45ICtEtzj8EkcJK7e2SFncAnbVzjEO4WFY9X3C8Ih1OlevrEAXZmiu86jszeLfQDJ5Xv000IKYBg6T"
              client-reference-id={user?.id}
            ></stripe-pricing-table>
          </div>

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
        </>
      </Layout>
    </>
  )
}
