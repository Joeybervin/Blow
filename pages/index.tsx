import Head from 'next/head'
import { useEffect, useState } from 'react';
/* components */
import Navbar from '@/components/Navbar';
import CookiesToast from '@/components/CookiesToast';
import SearchInput from '@/components/SearchInput'
/* style */
import { M_PLUS_Rounded_1c } from 'next/font/google';
import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next';
const mPLUSRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
})



interface LocationCoord {
  latitude: number;
  longitude: number;
}



export default function Home() {

  const [location, setLocation] = useState<LocationCoord>({ latitude: 48.866667, longitude: 2.333333 });
  const axios = require('axios');
  const [search, setSearch] = useState<string>("")

  const fetchTodayWeatherAPI = async ({ latitude, longitude }: LocationCoord): Promise<object> => {
    let todayForecast;
    try {
      todayForecast = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto`);
      console.log(todayForecast.data)
      return todayForecast.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
/*   fetchTodayWeatherAPI(location) */

  const getCityNameFromLatAndLong = async ({ latitude, longitude }: LocationCoord): Promise<object> => {
    let cityName;
    try {
      cityName = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
      return cityName.data
    } catch (error) {
      console.log(error);
      throw error;

    }

  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log(coords)
          setLocation({ latitude: coords.latitude, longitude: coords.longitude });

        },
        (error) => {
          console.error(error);
          setLocation({ latitude: 48.866667, longitude: 2.333333 }); // Paris
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setLocation({ latitude: 48.866667, longitude: 2.333333 }); // Paris
    }
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

      <main className={`${mPLUSRounded1c.className} min-h-screen`}>


        <div className="flex flex-wrap flex-col sm:flex-row min-h-screen">

          <section className="flex-auto sm:min-w-52 sm:max-w-96 p-3">
          <Navbar navbarProps='block md:hidden' />
            {/* search bar */}
            <SearchInput 
              onChange={(e) => setSearch(e.target.value)}
              value={search || ""}
            />
          

            {/* today's weather infos */}
          </section>

          <section className="flex-auto bg-primary w-full sm:w-96 p-3">
            {/* Nvabar */}
            <Navbar navbarProps='hidden md:block' />
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
