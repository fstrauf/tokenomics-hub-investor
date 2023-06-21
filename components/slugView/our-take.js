import React from 'react'

export default function OurTake({ content }) {
  if (content?.problemSolution === '' && content?.parent === '')
    return (
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Protocol Analysis.
      </h1>
    )
  return (
    <>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Protocol Analysis.
      </h1>
      <div className="rounded-lg border-2 bg-white">
        <div className="ml-2">
          <table className="m-auto mt-5 max-w-4xl bg-gray-50 text-left text-sm text-gray-500 dark:text-gray-400">
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="whitespace-nowrap py-3 px-6 font-medium text-gray-900"
                >
                  Problems & Solutions
                </th>
                <td className="border-l bg-white py-4 px-6 text-gray-900">
                  <pre
                    id="message"
                    className="block w-full whitespace-pre-line p-2.5 font-sans text-sm text-gray-900"
                  >
                    {content.problemSolution}
                  </pre>
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="whitespace-nowrap py-3 px-6 font-medium text-gray-900"
                >
                  Predecessors
                </th>
                <td className="border-l bg-white py-4 px-6 text-gray-900">
                  <pre
                    id="message"
                    className="block w-full whitespace-pre-line p-2.5 font-sans text-sm text-gray-900"
                  >
                    {content.parent}
                  </pre>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="section-head text-center">Investment Take</p>
          <p className="mb-4 text-center text-gray-400">... coming soon</p>
        </div>
      </div>
    </>
  )
}
