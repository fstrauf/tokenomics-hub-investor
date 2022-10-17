import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '../lib/sanity'

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value)
  return (
    // <img
    //   src={urlBuilder()
    //     .image(value)
    //     .width(isInline ? 100 : 800)
    //     .fit('max')
    //     .auto('format')
    //     .url()}
    //   alt={value.alt || ' '}
    //   loading="lazy"
    //   style={{
    //     // Display alongside text if image appears inside a block text span
    //     display: isInline ? 'inline-block' : 'block',

    //     // Avoid jumping around with aspect-ratio CSS property
    //     aspectRatio: width / height,
    //   }}
    // />
    <img
      width={1240}
      height={540}
      // alt={`Cover Image for ${title}`}
      // className={cn('shadow-small', {
      //   'transition-shadow duration-200 hover:shadow-medium': slug,
      // })}
      src={urlForImage(value).width(1240).height(540).url()}
    />
  )
}

const components = {
  types: {
    image: SampleImageComponent,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}


// const myPortableTextComponents = {
//   types: {
//     image: ({value}) => <img src={value.imageUrl} />,
//   },
// }

export default function PostBody({ content }) {
  return (
    <>
      <h1 className='section-head'>Deep Dive</h1>
      <div className='border-4 border-dashed'>
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
