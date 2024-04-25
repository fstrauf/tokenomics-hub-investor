import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet"></link>
        </Head>
        <body className='bg-white m-auto'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
