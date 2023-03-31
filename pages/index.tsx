import Head from 'next/head'
import { SetStateAction, useEffect, useState } from 'react';
import { CookieValueTypes, getCookie, getCookies, hasCookie } from 'cookies-next';
/* components */
import Navbar from '@/components/Navbar';
import CookiesToast from '@/components/CookiesToast';
import SearchInput from '@/components/SearchInput'
/* style */
import { M_PLUS_Rounded_1c } from 'next/font/google';
import { GetServerSidePropsContext } from 'next';


const mPLUSRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
})

interface HomeProps {
  savedTheme : CookieValueTypes;
  lat : CookieValueTypes;
  long : CookieValueTypes;
  cityName : CookieValueTypes;
}


export default function Home({savedTheme} : HomeProps) {

  const location = { lat: 48.866667, long: 2.333333 , cityName: "Paris" }

  const [theme, setTheme] = useState<CookieValueTypes>(savedTheme)

  const [search, setSearch] = useState<string>("");

  const [coco, setCoco] = useState<number>(0)

  
  console.log(theme)


  const handleThemeChange = (newTheme : CookieValueTypes) => {
    const themeSelected = newTheme ;
    setTheme(themeSelected)
  }

/*   fetchTodayWeatherAPI(location) */


/*   useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log(coords)
          setLocation({ ...location, lat: coords.latitude, long: coords.longitude });

        },
        (error) => {
          console.error(error);
          setLocation({...location, lat: 48.866667, long: 2.333333 }); // Paris
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setLocation({...location, lat: 48.866667, long: 2.333333 }); // Paris
    }
  }, []); */


  return (
    <>
      <Head>
        <meta name="description" content="BLOW - Retrouvez les prévisions météo de la France et du monde entier gratuitement" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blow.svg" />
        {/* <link rel="preload" as="image" href="/blow.svg"></link> */}
        <title>Blow - Prévisions météo</title>
      </Head>

      <main className={`${mPLUSRounded1c.className} min-h-screen`}  data-theme={theme}>



        <div className="flex flex-wrap flex-col sm:flex-row min-h-screen">

          <section className="flex-auto sm:min-w-52 sm:max-w-96 p-3">
          <Navbar visibility='block md:hidden' onChangeTheme={handleThemeChange} theme={theme}  />
            {/* search bar */}
            <SearchInput 
              onChange={(e) => setSearch(e.target.value)}
              value={search || ""}
            />
          

            {/* today's weather infos */}
          </section>

          <section className="flex-auto bg-primary w-full sm:w-96 p-3">
            {/* Nvabar */}
            <Navbar visibility='hidden md:block' onChangeTheme={handleThemeChange} theme={theme} />
            {/* week forecast */}
            <section className="flex"></section>

            {/* today's highmights */}
            <section className='flex flex-wrap'></section>
          </section>
        </div>

        <CookiesToast />
      </main>
    </>
  )
}

export const getServerSideProps = ({req , res} : GetServerSidePropsContext) => {

  const allSavedCookies = getCookies({req , res});
  const savedTheme = allSavedCookies.theme ?? 'cupcake';

  return {
    props: {
      savedTheme,
    },
  }
}


