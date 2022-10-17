import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

const components = {
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
  },
}

export default function OurTake({ content }) {
  return (
    <>
      <h1 className='section-head'>Our Take</h1>
      <div className='border-4 border-dashed rounded-lg'>
        <div className='ml-2'>
          <div className="mx-auto max-w-2xl" className={markdownStyles.markdown}>
            <PortableText value={content} 
            components={components}
            />
          </div>
        </div>
      </div>
    </>
  )
}
