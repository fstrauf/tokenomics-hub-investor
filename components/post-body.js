import React, { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import parse from 'html-react-parser';

export default function PostBody({ content }) {

  const jsonContent = JSON.parse(content)

  var jsxReady = ''

  if (!typeof jsonContent === null) {
    if (Object.keys(jsonContent).length > 0) {
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
