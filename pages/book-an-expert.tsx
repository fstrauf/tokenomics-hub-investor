import Layout from '../components/layout'
import React from 'react'
import ProductOverview from '../components/subscription/ProductOverview'
import { headerStatus } from '../lib/helper'
import ContactUs from '../components/generic/contactUs'
import ScopeTermsConditions from '../components/static/ScopeTermsConditions'

export default function BookAnExpert() {

  return (
    <>
      <Layout mode={headerStatus.main}>        
        <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="prose mb-10 mt-10 text-center text-3xl font-bold">
            Let an expert poke holes<br/> into your token design before you launch.
            <p className='m-4'></p>
            <br></br>Get a stamp of approval<br/> from one of the largest tokenomics focused communities.
          </h1>
          <p className="prose mb-3 text-center">
            Our team of experts is happy to help and audit your design!
          </p>
          <div className="my-15">
            <ProductOverview />
          </div>
          <section id="contact-us" className='w-full'>
          <ContactUs/>
          </section>
          <ScopeTermsConditions/>
        </div>
      </Layout>
    </>
  )
}
