import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { Footer } from '@/components';


export default function Document() {


  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        < Footer />
        <NextScript />
        <Script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></Script>
      </body>
    </Html>
  )
}
