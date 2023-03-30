import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';


export default function Document() {

  const [theme, setTheme] = useState<CookieValueTypes>(hasCookie("theme") ? getCookie('theme') : "cupcake");

  useEffect(() => {
    const themeSavedInCookie = hasCookie('theme')
    if (themeSavedInCookie) setTheme(getCookie("theme"))
    
}, []);

console.log(theme)

  return (
    <Html lang="fr" data-theme={theme}>
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
