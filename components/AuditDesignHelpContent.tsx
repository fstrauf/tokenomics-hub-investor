// import Layout from './layout'
import React from 'react'
// import { headerStatus } from '../lib/helper'
import ContactUs from './generic/contactUs'
import ScopeTermsConditions from './static/ScopeTermsConditions'
import ProductCard from './generic/ProductCard'
import Link from 'next/link'

export default function AuditDesignHelpContent() {
  return (
    <>
        <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="prose mb-10 mt-10 text-center text-3xl font-bold">
            Let an expert poke holes<br/> into your token design before you launch.
            <p className='m-4'></p>
            <br></br>Get a stamp of approval<br/> from one of the largest tokenomics focused communities.
          </h1>
          <p className="prose mb-3 text-center">
            Our team of experts is happy to help and audit your design!
          </p>
          <div className="my-10">
            <div className="flex items-center justify-center gap-8">
              <ProductCard
                title="Audit of Tokenomics Design Space"
                description="Get an expert to audit your design in the Tokenomics Design Space."
                // price="USD $2000"
                termsLink="/audit-design-help#review-of-tokenomics-design"
                purchaseLink={{
                  link: `/audit-design-help#contact-us`,
                  name: 'Contact Us',
                }}
                highlight={true}
              />
              <ProductCard
                title="Custom"
                description="Get an expert to help you with the full token design"
                price="get quote"
                termsLink="/audit-design-help#custom"
                purchaseLink={{
                  link: `/audit-design-help#contact-us`,
                  name: 'Contact Us',
                }}
              />
            </div>
            
          </div>
          <Link href='/book-an-expert' className='text-gray-600 underline'>Click here if you want a tokenomics audit based on your own material rather than based on your TDS design</Link>
          <section id="contact-us" className="w-full">
            <ContactUs />
          </section>
          <ScopeTermsConditions />
        </div>
    </>
  )
}
