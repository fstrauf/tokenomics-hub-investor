import { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
// import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import Bulletlist from '@tiptap/extension-bullet-list'
import Codeblock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Listitem from '@tiptap/extension-list-item'
import Orderedlist from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';

export const getJSXReady = (content) => {

  // const generateHTML = dynamic(() => import('@tiptap/html').then((module) => module.generateHTML));
  // const generateHTML = dynamic(() => import('@tiptap/html').then(module => module.generateHTML))
  // const parse = dynamic(() => import('html-react-parser'), {ssr:false})

  var jsxReady = ''
  // console.log("content "+ typeof content)
  if(content === ''){
    return jsxReady
  }
  const jsonContent = JSON.parse(content)
  // console.log(jsonContent)
  
  try {
    if (typeof jsonContent !== null) {
      if (Object.keys(jsonContent)?.length > 0) {
        const output = useMemo(() => {
          return generateHTML(jsonContent, [
            Blockquote,
            Bulletlist,
            Codeblock,
            Document,
            Heading,
            Listitem,
            Orderedlist,
            Paragraph,
            Text,
            Bold,
            Code,
            Italic,
            Strike,
            Dropcursor,
            Gapcursor,
            // StarterKit,
            Image,
            // other extensions …
          ])
        }, [jsonContent])
        jsxReady = parse(output)
      }
    }
  } catch (error) {

  }

  return jsxReady
};