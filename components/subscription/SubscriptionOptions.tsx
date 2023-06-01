import ProductCard from '../generic/ProductCard'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function SubscriptionOptions() {
  const { user } = useUser()
  // console.log("🚀 ~ file: SubscriptionOptions.tsx:6 ~ SubscriptionOptions ~ user:", user)
  return (
    <div className="mt-10 flex items-center justify-center gap-8">
      <ProductCard
        title="Genesis"
        description="Ultimate DIY Tokenomics Design. Use examples and Demand Side Tokenomics to balance your supply."
        price="USD $70/month or $250/year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={{
          // link: `https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          link: `https://buy.stripe.com/3cs6qBdfd9um4fK8wA?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          name: 'Monthly',
        }}
        purchaseLink2={{
          // link: `https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          link: `https://buy.stripe.com/5kAaGRa317me7rWaEJ?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          name: 'Yearly',
        }}
      />
      <ProductCard
        title="Navigator"
        description="Ultimate Tokenomics Design + Support."
        price="USD $600 / year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={{
          // link: `https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          link: `https://buy.stripe.com/14kcOZ6QPgWO9A414a?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          name: 'Purchase',
        }}
        highlight={true}
      />
      <ProductCard
        title="Frontier"
        description="Ultimate DIY Tokenomics Design + Support + Review."
        price="USD $2000 / year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={{
          // link: `https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          link: `https://buy.stripe.com/dR6bKV8YXfSK7rW7sz?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          // https://buy.stripe.com/dR6bKV8YXfSK7rW7sz
          name: 'Purchase',
        }}
      />
    </div>
  )
}
