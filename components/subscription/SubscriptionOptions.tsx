import ProductCard from '../generic/ProductCard'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function SubscriptionOptions() {
  const { user } = useUser()
  // console.log("🚀 ~ file: SubscriptionOptions.tsx:6 ~ SubscriptionOptions ~ user:", user)
  return (
    <div className="mt-10 flex items-center justify-center gap-8">
      <ProductCard
        title="Genesis"
        description="Ultimate DIY Tokenomics Design."
        price="USD $70/m"
        // price="USD $70/m or $250/y"
        termsLink="/manage-subscriptions#genesis"
        purchaseLink={{
          link: `https://buy.stripe.com/3cs6qBdfd9um4fK8wA?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          name: 'Monthly',
        }}
        included={["Unlimited use of Example Section",'Demand Side Tokenomics','Create/Work on unlimited token designs', 'Unlimited token designs']}
        // purchaseLink2={{
        //   link: `https://buy.stripe.com/5kAaGRa317me7rWaEJ?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
        //   name: 'Yearly',
        // }}
      />
      <ProductCard
        title="Navigator"
        description="Ultimate Tokenomics Design + Support."
        price="USD $160/m"
        // price="USD $160/m or $600/y"
        termsLink="/manage-subscriptions#genesis"
        included={["Genesis Tier",'Chat Support: ask questions, our experts answer']}
        purchaseLink={{
          link: `https://buy.stripe.com/cN202dejh7mefYs28g?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          name: 'Monthly',
        }}
        // purchaseLink2={{          
        //   link: `https://buy.stripe.com/14kcOZ6QPgWO9A414a?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
        //   name: 'Yearly',
        // }}
        highlight={true}
      />
      <ProductCard
        title="Frontier"
        description="Ultimate DIY Tokenomics Design + Support + Review."
        price="USD $2000/y"
        termsLink="/manage-subscriptions#genesis"
        included={["1 year Navigator subscription",'1x Tokenomics Audit by a Tokenomics DAO Expert (we ask questions)']}
        purchaseLink={{
          // link: `https://buy.stripe.com/test_5kA4k98YwaUzgrCaEE?prefilled_email=${user.primaryEmailAddress.emailAddress}&client_reference_id=${user.id}`,
          link: `https://buy.stripe.com/dR6bKV8YXfSK7rW7sz?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          // https://buy.stripe.com/dR6bKV8YXfSK7rW7sz
          name: 'Purchase',
        }}
      />
    </div>
  )
}
