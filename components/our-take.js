// import markdownStyles from './markdown-styles.module.css'
// import { PortableText } from '@portabletext/react'
// import { getImageDimensions } from '@sanity/asset-utils'
// import { urlForImage } from '../lib/sanity'
import React, { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import parse from 'html-react-parser';

// Barebones lazy-loaded image component
// const SampleImageComponent = ({ value, isInline }) => {
//   const { width, height } = getImageDimensions(value)
//   return (
//     <div className=''>
//       <img
//         className='m-auto'
//         src={urlForImage(value).width(isInline ? 100 : 800).url()}
//         alt={value.alt || ' '}
//         loading="lazy"
//         style={{
//           display: isInline ? 'inline-block' : 'block',
//           aspectRatio: width / height,
//         }}
//       />
//     </div>
//   )
// }

// const components = {
//   types: {
//     image: SampleImageComponent,
//   },
//   list: {
//     bullet: ({ children }) => <ul className="list-disc list-inside -indent-6 ml-6">{children}</ul>,
//     number: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
//   },
//   listItem: {
//     bullet: ({ children }) => <li>{children}</li>,
//   },
// }


export default function OurTake({ content }) {

  const jsonContent = JSON.parse(content?.ourTake)

  console.log(jsonContent)
  var jsxReady = ''
  if (!typeof jsonContent === null) {
    if (Object.keys(jsonContent)?.length > 0) {
      const output = useMemo(() => {
        return generateHTML(jsonContent, [
          StarterKit,
          Image,
          // other extensions …
        ])
      }, [jsonContent])

      jsxReady = parse(output)
    }
  }


  return (
    <>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Our Take.</h1>
      <div className='border-2 rounded-lg bg-white'>
        <div className='ml-2'>
          <article class="prose md:prose-lg lg:prose-xl">
            {jsxReady}
          </article>
          {/* <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
            <PortableText value={content}
              components={components}
            />
          </div> */}
          {/* {investmentTake ? ( */}
          <table class="text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-50 m-2">
            <caption className='section-head'>Investment Take</caption>
            <tbody>
              <tr class="">
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">3 month time horizon</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.threeMonthHorizon}</td>
              </tr>
              <tr>
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">1 year time horizon</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.oneYearHorizon}</td>
              </tr>
              <tr>
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Potential Upside</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.upside}</td>
              </tr>
              <tr>
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Downside / Risk</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.downside}</td>
              </tr>
              <tr>
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Investment decision horizon</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.horizon}</td>
              </tr>
              <tr>
                <th scope="row" class="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">Metrics</th>
                <td class="py-4 px-6 bg-white border-l text-gray-900">{content?.metrics}</td>
              </tr>
            </tbody>
          </table>
          {/* ) : (
            <></>
          )} */}
        </div>
      </div>
    </>
  )
}