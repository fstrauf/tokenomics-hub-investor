import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

export default function OurTake({ content }) {
  return (
    <>
    <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
      <PortableText value={content}/>
    </div>
    </>
  )
}
