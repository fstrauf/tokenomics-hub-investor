import ProductCard from "../generic/ProductCard"

export default function ProductOverview() {
  return (
    <div className="flex items-center justify-center gap-8">
      <ProductCard
        title="Audit of your Material"
        description="Get an expert to audit your litepaper/tokenomics design."
        // price="USD $3000"
        termsLink="/book-an-expert#review-of-your-material"
        purchaseLink={{
          link: `/book-an-expert#contact-us`,
          name: 'Contact Us',
        }}
      />
      <ProductCard
        title="Audit of Tokenomics Design Space"
        description="Get an expert to audit your design in the Tokenomics Design Space."
        // price="USD $2000"
        termsLink="/book-an-expert#review-of-tokenomics-design"
        purchaseLink={{
          link: `/book-an-expert#contact-us`,
          name: 'Contact Us',
        }}
        highlight={true}
      />
      <ProductCard
        title="Custom"
        description="Get an expert to help you with the full token design"
        price="get quote"
        termsLink="/book-an-expert#custom"
        purchaseLink={{
          link: `/book-an-expert#contact-us`,
          name: 'Contact Us',
        }}
      />
    </div>
  )
}
