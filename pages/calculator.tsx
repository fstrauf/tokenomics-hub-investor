import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react';
// import Calculator from '../components/calculator';
import dynamic from 'next/dynamic'

export default function CalculationPage() {

  const Calculator = dynamic(() => import('../components/calculator'), { loading: () => <p>Loading</p> })
  
  return (
    <>
      <Layout>
        <Intro />
        <Calculator/>
      </Layout>
    </>
  )
}