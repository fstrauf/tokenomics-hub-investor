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
          <h1 className="mb-10 mt-10 text-center text-3xl font-bold prose">
            Need help designing your token?
            <br></br>Want an audit of your token design?
          </h1>
          <p className="mb-5 text-center prose">
            our team of experts is happy to help
          </p>
          <div className="my-20">
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
