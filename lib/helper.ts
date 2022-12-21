import { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import parse from 'html-react-parser';
import Image from '@tiptap/extension-image'

export const getJSXReady = (content) => {

  // console.log(content)

  const jsonContent = JSON.parse(content)
  // console.log(jsonContent)
  var jsxReady = ''
  try {
    if (typeof jsonContent !== null) {
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
  } catch (error) {

  }

  return jsxReady
};