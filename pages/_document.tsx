import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {

  return (
    <Html lang="fr" className='scroll-smooth"'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></Script>
      </body>
    </Html>
  )
}
