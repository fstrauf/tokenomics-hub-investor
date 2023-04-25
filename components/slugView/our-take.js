import React from 'react'
// import { getJSXReady } from '../lib/helper'

export default function OurTake({ content }) {
  return (
    <>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Protocol Analysis.</h1>
      <div className='border-2 rounded-lg bg-white'>
        <div className='ml-2'>
          <table className="text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-50 mt-5 max-w-4xl m-auto">
            {/* <caption className='section-head'>Details</caption> */}
            <tbody>
              <tr>
                <th scope="row" className="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Problems & Solutions</th>
                <td className="py-4 px-6 bg-white border-l text-gray-900">
                  <pre id="message" className="whitespace-pre-line block p-2.5 w-full font-sans text-sm text-gray-900">
                    {content.problemSolution}
                  </pre>
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Predecessors</th>
                <td className="py-4 px-6 bg-white border-l text-gray-900">
                  <pre id="message" className="whitespace-pre-line block p-2.5 w-full font-sans text-sm text-gray-900">
                    {content.parent}
                  </pre>
                </td>
              </tr>
            </tbody>
          </table>
          <p className='section-head text-center'>Investment Take</p>
          <p className='text-center text-gray-400 mb-4'>... coming soon</p>          
        </div>
      </div>
    </>
  )
}