/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CookieValueTypes, getCookie, getCookies, setCookie } from 'cookies-next';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
/* helpers */
import getGpsPosition from '@/helpers/getGpsPosition';
import fetchWeather from '@/helpers/fetchWeather';
import { getCookiePosition, Position } from '@/helpers/getCookiePosition';
import savePositionCookie from '@/helpers/savePositionCookie';
import { formatDate, formatTime } from '@/helpers/formatDate';
import { differenceCalculation, timeDifferenceCalculation } from '@/helpers/differenceCalculation';
import {uvIndicator, uvIndicatorColor as uvIndicatorString} from '@/helpers/uvIndicator';
/* components */
import Navbar from '@/components/Navbar';
import CookiesToast from '@/components/CookiesToast';
import SearchInput from '@/components/SearchInput'
import Alert from '@/components/Alert';
import LoadingCard from '@/components/LoadingCard';
import { CurentWeatherHighlight } from '@/components/HighlightCard';
/* style */
import { M_PLUS_Rounded_1c } from 'next/font/google';


const mPLUSRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
})

interface HomeProps {
  savedTheme: CookieValueTypes;
}



export default function Home({ savedTheme }: HomeProps) {

  const [weather, setWeather] = useState<any>(undefined);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState<number>()
  const [location, setLocation] = useState<Position>({ city: '', lat: 0, long: 0 });
  const [theme, setTheme] = useState<CookieValueTypes>(savedTheme);
  const [search, setSearch] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState({ message: "", visibility: "hidden" });

  // render eigther the saved coords in cookie or default coords
  useEffect(() => {
    async function getLocation() {

      // get : Cookie stored coord | default location coords (Paris)
      const newCoords = getCookiePosition()

      setLocation({ city: newCoords.city, lat: newCoords.lat, long: newCoords.long })

      // open-meteo API call
      let weatherInfos = await fetchWeather({ lat: newCoords.lat, long: newCoords.long })
      setWeather(weatherInfos)
    }
    getLocation();
  }, []);

  // Create a alert error message for 3 seconds
  const createAlertMessage = (message: string) => {
    setAlertMessage({ message: message, visibility: "block" })

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

      setLocation({ lat: result.data.results[0].latitude, long: result.data.results[0].longitude, city: result.data.results[0].name })
      // Get the new weather informations
      const weatherInfos = await fetchWeather({ lat: result.data.results[0].latitude, long: result.data.results[0].longitude })
      // Set the new weather informations
      setWeather(weatherInfos)

    } catch (error) {
      createAlertMessage("Désolé, nous n'arrivons pas à trouver cette ville.");
    }
  }
  // user accept to be geolocalised
  const handleCoordChange = async () => {
    const newCoord = await getGpsPosition()
    if (newCoord.city !== undefined || newCoord.city !== "") {
      setLocation(newCoord);
      // Save coord in cookies
      savePositionCookie(newCoord);
      // Get the new weather informations
      const weatherInfos = await fetchWeather({ lat: newCoord.lat, long: newCoord.long });
      // Set the new weather informations
      setWeather(weatherInfos);
    }
    else {
      createAlertMessage("Nous avons rencontré une erreur avec le système de géolocalisation")
    }
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

        <div className="flex flex-wrap flex-col sm:flex-row min-h-screen max-w-screen">

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
            {/* icon */}


            <div className='flex flex-col justify-items-center max-w-xl mx-auto	mt-10'>
              {
                weather === undefined ?

                  <LoadingCard />

                  :

                  <>
                    <p className='text-center mb-3'>
                      <span className="font-black text-4xl sm:text-5xl">{weather.current_weather.temperature} </span>
                      <span className="align-top text-xl sm:text-2xl">{weather.hourly_units.temperature_2m}</span>
                    </p>
                    <div className="flex flex-col space-y-3">
                      {/* WEATHER CODE => WEATHER DESCRIPTION */}
                      <div className="flex justify-between items-center flex-wrap gap-y-3 gap-x-5 border-2 rounded-lg w-full p-4">
                        <p className='font-black text-center'>{location.city}</p>
                        <p className='text-center' >{formatDate(weather.current_weather.time)}</p>
                      </div>
                      {/* LOCATION & DATE => dd/mm/yyyy */}
                      <div className="flex justify-between items-center flex-wrap gap-y-3 gap-x-5 border-2 rounded-lg w-full p-4">
                        <p className='font-black text-center'>{location.city}</p>
                        <p className='text-center' >{formatDate(weather.current_weather.time)}</p>
                      </div>
                      {/* TIME => hh:mm */}
                      <div className="flex justify-between items-center flex-wrap gap-y-3 gap-x-5 border-2 rounded-lg w-full p-4">
                        <p className='font-black text-center'>{location.city}</p>
                        <p className='text-center' >{formatDate(weather.current_weather.time)}</p>
                      </div>
                    </div>
                    <div className="divider"></div>

                    <div className="flex flex-wrap gap-3">

                      {/* MAX TEMP & MIN TEMP */}
                      <CurentWeatherHighlight title="Températures max / min">
                        <div className='flex justify-between gap-3 max-[300px]:flex-col sm:flex-col'>
                          <div className='flex justify-center gap-5 items-center m-2 mb-3'>
                            <Image src="/icons/weather/thermometer-warmer.svg" width={65} height={65} alt="levé du soleil" />
                            <div>
                              <p className="flex font-bold no-wrap text-xl">{weather.daily.temperature_2m_max[1]} <span className='align-top text-xs font-normal'>{weather.hourly_units.temperature_2m}</span></p>
                              <p className='text-xs text-gray-400	text-center'>{differenceCalculation(weather.daily.temperature_2m_max[0], weather.daily.temperature_2m_max[1])}</p>
                            </div>
                          </div>
                          <div className='flex justify-center gap-5 items-center m-2'>
                            <Image src="/icons/weather/thermometer-colder.svg" width={65} height={70} alt="couché du soleil" />
                            <div>
                              <p className="flex font-bold no-wrap text-xl">{weather.daily.temperature_2m_min[1]} <span className='align-top text-xs font-normal'>{weather.hourly_units.temperature_2m}</span></p>
                              <p className='text-xs text-gray-400	text-center'>{differenceCalculation(weather.daily.temperature_2m_min[0], weather.daily.temperature_2m_min[1])}</p>
                            </div>
                          </div>
                        </div>
                      </CurentWeatherHighlight>

                      {/* SUNRISE & SUNSET */}
                      <CurentWeatherHighlight title="Heures d'ensoleillement">
                        <div className='flex justify-between gap-3 max-[300px]:flex-col sm:flex-col'>
                          <div className='flex justify-center gap-5 items-center m-2 mb-3'>
                            <Image src="/icons/weather/sunrise.svg" width={65} height={70} alt="levé du soleil" />
                            <div>
                              <p className="font-bold">{formatTime(weather.daily.sunrise[1])}</p>
                              <p className='text-xs text-gray-400	'>{timeDifferenceCalculation(weather.daily.sunrise[1], weather.daily.sunrise[0])}</p>
                            </div>
                          </div>
                          <div className='flex justify-center gap-5 items-center m-2'>
                            <Image src="/icons/weather/sunset.svg" width={65} height={70} alt="couché du soleil" />
                            <div>
                              <p className="font-bold">{formatTime(weather.daily.sunset[1])}</p>
                              <p className='text-xs text-gray-400	'>{timeDifferenceCalculation(weather.daily.sunset[1], weather.daily.sunset[0])}</p>
                            </div>
                          </div>
                        </div>
                      </CurentWeatherHighlight>

                      {/* UV INDICE */}
                      <CurentWeatherHighlight title="Indice UV">
                        <div className='flex flex-col items-center'>
                          <Image src="/icons/weather/uv-index.svg" width={75} height={75} alt="indice UV" />
                          <div className='mt-2'>
                            <p className="flex flex-nowrap items-center gap-x-1">
                              {[...Array(12)].map((_, index) => {
                                return (
                                  <span className={`${uvIndicator(weather.daily.uv_index_max[1], index)}`} key={index}> {index} </span>
                                )
                              })}
                            </p>
                            <p className='text-center uppercase py-1'>{uvIndicatorString(weather.daily.uv_index_max[1]).indicator}</p>
                          </div>
                        </div>
                      </CurentWeatherHighlight>
                      {/* HUMIDITY */}
                      <CurentWeatherHighlight title="Taux d'humidité">
                        <div className='flex justify-center items-center h-5/6'>
                          <p className='mb-3'>
                            <span className='text-6xl'>16</span>
                            <span className='align-top'> %</span>
                          </p>
                        </div>
                      </CurentWeatherHighlight>
                      {/* WIND SPEED */}
                      <CurentWeatherHighlight title="Vent">
                        <div className='flex flex-col justify-center items-center h-5/6'>
                          <p className=''>
                            <span className='text-6xl'>{weather.current_weather.windspeed}</span>
                            <span className='align-bottom'> km/h</span>
                          </p>
                          <Image src="/icons/weather/wind.svg" height={30} width={30} alt="indice UV" />
                        </div>
                      </CurentWeatherHighlight>
                      {/* AIR QUALITY */}
                      <CurentWeatherHighlight title="Qualité de l'air">
                        <div className='flex flex-col items-center'>
                          <Image src="/icons/weather/smoke-particles.svg" width={75} height={75} alt="indice UV" />
                          <div className='mt-2'>1 2 3 5 6 7 8 9</div>
                        </div>
                      </CurentWeatherHighlight>
                      {/* POLLEN */}
                      <CurentWeatherHighlight title="Qualité de l'air">
                        <div className='flex flex-col items-center'>
                          <Image src="/icons/weather/smoke-particles.svg" width={75} height={75} alt="indice UV" />
                          <div className='mt-2'>1 2 3 5 6 7 8 9</div>
                        </div>
                      </CurentWeatherHighlight>
                      {/* VISIBILITY */}
                      <CurentWeatherHighlight title="Qualité de l'air">
                        <div className='flex flex-col items-center'>
                          <Image src="/icons/weather/smoke-particles.svg" width={75} height={75} alt="indice UV" />
                          <div className='mt-2'>1 2 3 5 6 7 8 9</div>
                        </div>
                      </CurentWeatherHighlight>
                    </div>

                  </>

              }


            </div>

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


