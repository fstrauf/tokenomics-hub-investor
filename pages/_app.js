import '../styles/index.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import Head from 'next/head'
import { ClerkProvider } from '@clerk/nextjs'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nProgress.css'; 

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-3MWJJK74SD' })
  }, [])
  return (
    <>
      <Head>
        <title>Tokenomics Hub</title>
        <meta charSet="UTF-8" />
        <meta
          name="Explore, compare and evaluate tokenomics of crypto projects."
          content="Created by Tokenomics DAO"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <GoogleAnalytics strategy="lazyOnload" trackPageViews />
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}

export default MyApp
