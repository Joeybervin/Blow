import Layouts from '@/components/Layouts'
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Layouts>
          <Main />
        </Layouts>
        <NextScript />
      </body>
    </Html>
  )
}
