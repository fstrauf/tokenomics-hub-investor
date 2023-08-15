import ProductCard from '../generic/ProductCard'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export default function SubscriptionOptions() {
  const { user } = useUser()
  return (
    <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8">
      <ProductCard
        title="Genesis"
        description="Ultimate DIY Tokenomics Design."
        price="USD $70/m"
        termsLink="/tokenomics-design#genesis"
        purchaseLink={{
          link: `https://buy.stripe.com/3cs6qBdfd9um4fK8wA?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          name: 'Purchase',
        }}
        included={["Full access to the Tokenomics Design Space",'Demand Side Tokenomics','Create/Work on unlimited token designs', 'unlimted access to example section']}
      />
      <ProductCard
        title="Navigator"
        description="Ultimate Tokenomics Design + Support."
        price="USD $160/m"
        termsLink="/tokenomics-design#navigator"
        included={["Genesis Tier",'Chat Support: ask questions, our experts answer']}
        purchaseLink={{
          link: `https://buy.stripe.com/cN202dejh7mefYs28g?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          name: 'Purchase',
        }}
        highlight={true}
      />
      <ProductCard
        title="Frontier"
        description="Ultimate DIY Tokenomics Design + Support + Review."
        price="USD $2000/y"
        termsLink="/tokenomics-design#frontier"
        included={["1 year Navigator subscription",'1x Tokenomics Audit by a Tokenomics DAO Expert (we ask questions)']}
        purchaseLink={{
          link: `https://buy.stripe.com/5kAdT33EDfSKfYscMV?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`,
          name: 'Purchase',
        }}
      />
    </div>
  )
}
