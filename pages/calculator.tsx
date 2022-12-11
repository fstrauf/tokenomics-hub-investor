import Layout from '../components/layout'
import Intro from '../components/intro'
import React from 'react';
import Calculator from '../components/calculator';


export default function CalculationPage() {
  
  return (
    <>
      <Layout>
        <Intro />
        <Calculator/>
      </Layout>
    </>
  )
}