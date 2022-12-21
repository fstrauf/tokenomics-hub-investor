import '../styles/index.css'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tokenomics Hub</title>
        <meta name="Explore, compare and evaluate tokenomics of crypto projects." content="Created by Tokenomics DAO" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <GoogleAnalytics trackPageViews />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp