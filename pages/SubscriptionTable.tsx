import Script from 'next/script'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function SubscriptionTable() {
  const { user } = useUser()
  return (
    <>
      <div className="mt-10">
        <Script src="https://js.stripe.com/v3/pricing-table.js" async />
        {/* <stripe-pricing-table
              pricing-table-id="prctbl_1N38wkKs0xSuCAmfu87BjsFs"
              publishable-key="pk_live_51LUqnsKs0xSuCAmfmBBT45ICtEtzj8EkcJK7e2SFncAnbVzjEO4WFY9X3C8Ih1OlevrEAXZmiu86jszeLfQDJ5Xv000IKYBg6T"
              client-reference-id={user?.id}
            ></stripe-pricing-table> */}

        <stripe-pricing-table
          pricing-table-id="prctbl_1N3Sl1Ks0xSuCAmfq6CtPwqZ"
          publishable-key="pk_test_51LUqnsKs0xSuCAmfS7S7Odvb5lo4zWMi1DdlFvX5VaEpgFCC32FkGITvJP0feAJkkqg7knRXxT1oLCdlkuhHJKYK00VgdtE2X5"
          client-reference-id={user?.id}
        ></stripe-pricing-table>
      </div>
    </>
  )
}
