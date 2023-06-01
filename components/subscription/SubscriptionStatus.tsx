import { useState, useEffect } from 'react'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  apiVersion: '2022-11-15',
})

function SubscriptionStatus({ customerId }) {
  const [subscription, setSubscription] = useState(null)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetchSubscription() {
      // const stripe = await stripePromise;
      // const customerId = 'cus_NpqkFvgxXprQTY'; // replace with the customer ID
      if (customerId) {
        try {
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
          })
          const activeSubscription = subscriptions.data.find(
            (sub) => sub.status === 'active'
          )
          setSubscription(activeSubscription)

          const productId = activeSubscription.items.data[0].price.product
          const product = await stripe.products.retrieve(productId)
          setProduct(product)
        } catch (error) {
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
