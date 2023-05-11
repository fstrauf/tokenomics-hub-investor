import ProductCard from "./generic/ProductCard"
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function SubscriptionOptions() {
  const { user } = useUser()
  // console.log("🚀 ~ file: SubscriptionOptions.tsx:6 ~ SubscriptionOptions ~ user:", user)
  return (
    <div className="flex items-center justify-center gap-8 mt-10">
      <ProductCard
        title="Genesis"
        description="Ultimate DIY Tokenomics Design. Use examples and Demand Side Tokenomics to balance your supply."
        price="USD $50/month or $180/year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={`https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`}
      />
      <ProductCard
        title="Navigator"
        description="Ultimate Tokenomics Design + Support."
        price="USD $600 / year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={`https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`}
      />
      <ProductCard
        title="Frontier"
        description="Ultimate DIY Tokenomics Design + Support + Review."
        price="USD $2000 / year"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={`https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`}
      />
    </div>
  )
}
