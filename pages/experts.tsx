import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react';


export default function ExpertsPage() {
  
  return (
    <>
      <Layout>
        <Intro />
        <p>hi</p>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}