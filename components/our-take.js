import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '../lib/sanity'

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value)
  return (
    <div className=''>
      <img
        className='m-auto'
        src={urlForImage(value).width(isInline ? 100 : 800).url()}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          display: isInline ? 'inline-block' : 'block',
          aspectRatio: width / height,
        }}
      />
    </div>
  )
}

const components = {
  types: {
    image: SampleImageComponent,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside -indent-6 ml-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

export default function OurTake({ content, investmentTake }) {
  return (
    <>
      <h1 className='section-head'>Our Take</h1>
      <div className='border-4 border-dashed rounded-lg bg-white'>
        <div className='ml-2'>
          <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
            <PortableText value={content}
              components={components}
            />
          </div>
          {investmentTake ? (
            <table class="text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-50 m-2">
              <caption className='section-head'>Investment Take</caption>
              <tbody>
                <tr class="">
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">3 month time horizon</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.threeMonthHorizon}</td>
                </tr>
                <tr>
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">1 year time horizon</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.oneYearHorizon}</td>
                </tr>
                <tr>
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Potential Upside</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.upside}</td>
                </tr>
                <tr>
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Downside / Risk</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.downside}</td>
                </tr>
                <tr>
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Investment decision horizon</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.horizon}</td>
                </tr>
                <tr>
                  <th scope="row" class="py-3 px-6 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Metrics</th>
                  <td class="py-4 px-6 bg-white border-l">{investmentTake?.metrics}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}
