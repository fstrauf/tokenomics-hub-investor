import Layout from '../components/layout'
import React from 'react'
import { headerStatus } from '../lib/helper'
import ContactUs from '../components/generic/contactUs'

export default function Support() {
  return (
    <>
      <Layout mode={headerStatus.design}>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="prose mb-10 mt-10 text-center text-3xl font-bold">
          Is there a feature that you wish you had?
            <br></br>Have you come across an annoying bug?
          </h1>        
          <ContactUs />
        </div>
      </Layout>
    </>
  )
}
