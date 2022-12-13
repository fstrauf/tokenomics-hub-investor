import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '../lib/sanity'
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
//     bullet: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
//     number: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
//   },
//   listItem: {
//     bullet: ({ children }) => <li>{children}</li>,
//   },
// }

export default function PostBody({ content }) {

  // const jsonContent = JSON.parse(content)

  // const output = useMemo(() => {
  //   return generateHTML(jsonContent, [
  //     StarterKit,
  //     Image,
  //     // other extensions …
  //   ])
  // }, [jsonContent])

  // const jsxReady = parse(output)

  const jsonContent = JSON.parse(content)

  var jsxReady = ''

  if(Object.keys(jsonContent).length >0)
  {
    const output = useMemo(() => {
      return generateHTML(jsonContent, [
        StarterKit,
        Image,
        // other extensions …
      ])
    }, [jsonContent])

    jsxReady = parse(output)
  }

  return (
    <>
      <h1 className='section-head text-xl md:text-2xl lg:text-3xl font-bold mt-10 md:mt-20 mb-4 text-black font-bold'>Deep Dive.</h1>
      <div className='border-2 rounded-lg'>
        <div className='ml-2'>
          {/* <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
            <PortableText value={content}
              components={components}
            />
          </div> */}
          <article class="prose md:prose-lg lg:prose-xl">
            {jsxReady}
          </article>
        </div>
      </div>
    </>
  )
}
