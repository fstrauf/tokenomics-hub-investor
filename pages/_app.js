import '../styles/index.css'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  // function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp


// import '../styles/globals.css'

// import { SessionProvider } from 'next-auth/react';
// import { AppProps } from 'next/app';

// const App = ({ Component, pageProps }: AppProps) => {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// };

// export default App;
