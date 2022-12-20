import Head from 'next/head'
import { HOME_OG_IMAGE_URL } from '../lib/constants'

export default function PostMeta({title, description}) {
  return (
    <Head>
    <title>{title}</title>

    <meta property='twitter:card' content='summary_large_image' />
    <meta name="twitter:site" content="@tokenomicsdao" />
    <meta name="twitter:creator" content="@tokenomicsdao" />
    <meta property='og:title' content={`Tokenomics Hub: ${title}`} />
    <meta property="og:url" content="https://www.tokenomicshub.xyz/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    <meta
      property="og:description"
      content={description}
    />
  </Head>
  )
}
