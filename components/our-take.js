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
