import Head from 'next/head'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import CookiesToast from '@/components/CookiesToast'
import { useEffect, useState } from 'react';

const mPLUSRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100' , '400' , '700'],
})
interface LocationCoord {
  latitude : number | null;
  longitude : number | null;
}

export default function Home() {

  const [location, setLocation] = useState<LocationCoord>()

  useEffect(() => {
    

    
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="BLOW - Retrouvez les prévisions météo de la France et du monde entier gratuitement" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blow.svg" />
        {/* <link rel="preload" as="image" href="/blow.svg"></link> */}
        <title>Blow - Prévisions météo</title>
      </Head>

      <main className={mPLUSRounded1c.className}>

        <p>Hello</p>

        <div></div>

        

        <CookiesToast />
      </main>
    </>
  )
}
