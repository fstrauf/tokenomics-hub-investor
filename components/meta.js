import Head from 'next/head'
import { HOME_OG_IMAGE_URL, WEBSITE_URL_BASE } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <meta charSet="UTF-8"/>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
      // href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
      // href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
      // href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest"
      // href="/favicon/site.webmanifest" 
      />
      <link
        rel="mask-icon"
        // href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon"
      // href="/favicon/favicon.ico" 
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Explore, compare and evaluate tokenomics of crypto projects.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta name="twitter:site" content="@tokenomicsdao" />
      <meta name="twitter:creator" content="@tokenomicsdao" />
      <meta property='og:title' content='Tokenomics Hub'/>
      <meta property="og:url" content={WEBSITE_URL_BASE} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  )
}
