import React from 'react'
// import dynamic from 'next/dynamic'
// import { getJSXReady } from '../lib/helper';
import Tiptap from './TipTap';

export default function PostBody({ content }) {


  

// const getJSXReady = dynamic(() =>
//   import('../lib/helper').then((mod) => mod.getJSXReady)
// )
  return (
    <>
      <h1 className='section-head text-xl md:text-2xl lg:text-3xl font-bold mt-10 md:mt-20 mb-4 text-black'>Deep Dive.</h1>
      <div className='border-2 rounded-lg'>
        <div className='ml-2'>
          {/* <article className="prose prose-sm sm:prose lg:prose-md xl:prose-lg m-5 focus:outline-none">
            {getJSXReady(content)}            
          </article> */}
          <Tiptap content={content} editMode={false}/>
        </div>
      </div>
    </>
  )
}
