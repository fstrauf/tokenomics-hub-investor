import React from 'react'
// import { generateHTML } from '@tiptap/html'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import parse from 'html-react-parser';
import { getJSXReady } from '../lib/helper';

export default function PostBody({ content }) {

  // console.log(getJSXReady(content))

  // const jsonContent = JSON.parse(content)

  // var jsxReady = ''

  // if (!typeof jsonContent === null) {
  //   if (Object.keys(jsonContent).length > 0) {
  //     const output = useMemo(() => {
  //       return generateHTML(jsonContent, [
  //         StarterKit,
  //         Image,
  //         // other extensions …
  //       ])
  //     }, [jsonContent])

  //     jsxReady = parse(output)
  //   }
  // }

  // console.log("postbody" + getJSXReady(content))

  return (
    <>
      <h1 className='section-head text-xl md:text-2xl lg:text-3xl font-bold mt-10 md:mt-20 mb-4 text-black'>Deep Dive.</h1>
      <div className='border-2 rounded-lg'>
        <div className='ml-2'>
          {/* <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
            <PortableText value={content}
              components={components}
            />
          </div> */}
          <article className="prose md:prose-lg lg:prose-xl">
            {getJSXReady(content)}
            {/* {jsxReady} */}
          </article>
        </div>
      </div>
    </>
  )
}
