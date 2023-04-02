import Head from 'next/head'
import { useEffect, useState } from 'react';
import { CookieValueTypes, getCookie, getCookies, setCookie } from 'cookies-next';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
/* helpers */
import getGpsPosition from '@/helpers/getGpsPosition';
import fetchWeather from '@/helpers/fetchWeather';
import { getCookiePosition, Position } from '@/helpers/getCookiePosition';
/* components */
import Navbar from '@/components/Navbar';
import CookiesToast from '@/components/CookiesToast';
import SearchInput from '@/components/SearchInput'
import Alert from '@/components/Alert';
/* style */
import { M_PLUS_Rounded_1c } from 'next/font/google';

const mPLUSRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
})

interface HomeProps {
  savedTheme: CookieValueTypes;
  lat: CookieValueTypes;
  long: CookieValueTypes;
  city: CookieValueTypes;
}

export default function Home({ savedTheme }: HomeProps) {

  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState<Position>({ city: '', lat: 0, long: 0 });
  const [theme, setTheme] = useState<CookieValueTypes>(savedTheme);
  const [search, setSearch] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState({message : "", visibility : "hidden"});

  // Ask user if we can use geolocation and send data to API to get forecast if no default data (Paris) will be send
  useEffect(() => {
    async function getLocation() {

      const locationInfos = getCookiePosition();
      if (location.city === '') setLocation(locationInfos);

      if (locationInfos) {
        let weatherInfos = await fetchWeather({ lat: location.lat, long: location.long })
        setWeather(weatherInfos)
      }

    }
    getLocation();
  }, [location.city, location.lat, location.long]);

  // Create a alert error message for 3 seconds
  const createAlertMessage = (message: string) => {
    setAlertMessage({message: message, visibility : "block"})

    setTimeout(() => {
      setAlertMessage({ message: "", visibility: "hidden" });
    }, 3000);

  }
  // Will handle the theme changement in the all page => 
  const handleThemeChange = (newTheme: CookieValueTypes) => {
    const themeSelected = newTheme;
    setTheme(themeSelected)
  }
  // If the user want to change the weather by giving a cityname
  const handleCityNameChange = async () => {
    try {
      const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&language=fr&count=1&format=json`)
      const newLocationLat = result.data.results[0].latitude
      const newLocationLong = result.data.results[0].longitude
      const newLocationCity = result.data.results[0].name

      setLocation({ lat: newLocationLat, long: newLocationLong, city: newLocationCity })

    } catch (error) {
      createAlertMessage('Désolé, nous ne trouvons pas la ville.')
      console.group("error : ", error)
    }
  }
  // user accept to be geolocalised
  const handleCoordChange = async () => {
    const newCoord = await getGpsPosition()
    setLocation(newCoord);

    if (getCookie('SavedPosition') === true) {
      setCookie('lat', newCoord.lat, { maxAge: 30 * 24 * 60 * 60 * 1000 })
      setCookie('long', newCoord.long, { maxAge: 30 * 24 * 60 * 60 * 1000 })
      setCookie('city', newCoord.city, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    }

    /*  if (newCoord) {
        let weatherInfos = await fetchWeather({ lat: newCoord.lat, long: newCoord.long })
        setWeather(weatherInfos)
     } */
  }

  console.log(weather)


  return (
    <>
      <Head>
        <meta name="description" content="BLOW - Retrouvez les prévisions météo de la France et du monde entier gratuitement" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blow.svg" />
        {/* <link rel="preload" as="image" href="/blow.svg"></link> */}
        <title>Blow - Prévisions météo</title>
      </Head>

      <main className={`${mPLUSRounded1c.className} min-h-screen`} data-theme={theme}>

        <div className="flex flex-wrap flex-col sm:flex-row min-h-screen">

          <Alert visibility={`${alertMessage.visibility}`} message={alertMessage.message} />

          <section className="flex-auto sm:min-w-52 sm:max-w-96 p-3">
            {/* NAVBAR */}
            <Navbar visibility='block md:hidden' onChangeTheme={handleThemeChange} theme={theme} />
            {/* SEARCH INPUT */}
            <SearchInput
              onChange={(e) => setSearch(e.target.value)}
              value={search || ""}
              onGpsData={handleCoordChange}
              onEnterPressed={handleCityNameChange}
            />

            {/* TODAY'S FORECAST */}

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

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {

  const allSavedCookies = getCookies({ req, res });
  const savedTheme = allSavedCookies.theme ?? 'cupcake';

  return {
    props: {
      savedTheme,
    },
  }
}


