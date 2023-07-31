import { useState, useEffect } from 'react'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  apiVersion: '2022-11-15',
})

function SubscriptionStatus({ customerId }) {
  console.log("🚀 ~ file: SubscriptionStatus.tsx:9 ~ SubscriptionStatus ~ customerId:", customerId)
  const [subscription, setSubscription] = useState(null)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetchSubscription() {
      // const stripe = await stripePromise;
      // const customerId = 'cus_NpqkFvgxXprQTY'; // replace with the customer ID
      if (customerId) {
        console.log("🚀 ~ file: SubscriptionStatus.tsx:17 ~ fetchSubscription ~ customerId:", customerId)
        try {
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
          })
          console.log("🚀 ~ file: SubscriptionStatus.tsx:22 ~ fetchSubscription ~ subscriptions:", subscriptions)
          const activeSubscription = subscriptions.data.find(
            (sub) => sub.status === 'active'
          )
          console.log("🚀 ~ file: SubscriptionStatus.tsx:26 ~ fetchSubscription ~ activeSubscription:", activeSubscription)
          setSubscription(activeSubscription)

          const productId = activeSubscription.items.data[0].price.product
          const product = await stripe.products.retrieve(productId)
          console.log("🚀 ~ file: SubscriptionStatus.tsx:31 ~ fetchSubscription ~ product:", product)
          setProduct(product)
        } catch (error) {
          console.log("🚀 ~ file: SubscriptionStatus.tsx:34 ~ fetchSubscription ~ error:", error)
          //do nothing
        }
      }
    }
    fetchSubscription()
  }, [])

  return (
    <div>
      {subscription ? (
        <>
          <p>Subscription status: {subscription.status}</p>
          <p>
            Next renewal date:{' '}
            {new Date(
              subscription.current_period_end * 1000
            ).toLocaleDateString()}
          </p>
          <p>Tier: {product?.name}</p>
          {/* display any other relevant subscription details */}
        </>
      ) : (
        <p>No active subscription found.</p>
      )}
    </div>
  )
}

export default SubscriptionStatus
