
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { CookieValueTypes, getCookies } from 'cookies-next';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import { GetServerSidePropsContext } from 'next';
/* helpers */
import { airQualityIndicator, differenceCalculation, fetchWeather, fetchAirQuality, formatDate, formatTime, getCookiePosition, getGpsPosition, getHourlyDataIndex, getWeatherIcon, savePositionCookie, timeDifferenceCalculation } from '@/helpers';
/* utils */
import roundValue from '@/utils/roundValue'
/* Interfaces */
import { AirQuality, Position, Weather } from '@/interfaces';
/* components */
import { Alert, CookiesToast, CurentWeatherHighlight, LoadingCard, Navbar, SearchInput } from '@/components';
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

  const [weather, setWeather] = useState<Weather>();
  const [airQuality, setAirQuality] = useState<AirQuality>();
  const [location, setLocation] = useState<Position>({ city: '', lat: 0, long: 0 });
  const [theme, setTheme] = useState<CookieValueTypes>(savedTheme);
  const [search, setSearch] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState({ message: "", visibility: "hidden" });

  // render eigther the saved coords in cookie or default coords
  useEffect(() => {
    async function getLocation() {

      const newCoords = getCookiePosition()
      setLocation({ city: newCoords.city, lat: newCoords.lat, long: newCoords.long })

      let weatherInfos = await fetchWeather({ lat: newCoords.lat, long: newCoords.long })
      setWeather(weatherInfos)
      let airQualityInfos = await fetchAirQuality({ lat: newCoords.lat, long: newCoords.long })
      setAirQuality(airQualityInfos)


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
      /* weather */
      const weatherInfos = await fetchWeather({ lat: result.data.results[0].latitude, long: result.data.results[0].longitude })
      setWeather(weatherInfos)
      /* air quality */
      const airQualityInformations = await fetchAirQuality({ lat: result.data.results[0].latitude, long: result.data.results[0].longitude });
      setAirQuality(airQualityInformations);

    } catch (error) {
      createAlertMessage("Désolé, nous n'arrivons pas à trouver cette ville.");
    }
  }
  // user accept to be geolocalised
  const handleCoordChange = async () => {
    const newCoord = await getGpsPosition()
    if (newCoord.city !== undefined || newCoord.city !== "") {
      setLocation(newCoord);
      savePositionCookie(newCoord);
      /* weather */
      const weatherInfos = await fetchWeather({ lat: newCoord.lat, long: newCoord.long });
      setWeather(weatherInfos);
      /* air quality */
      const airQualityInformations = await fetchAirQuality({ lat: newCoord.lat, long: newCoord.long });
      setAirQuality(airQualityInformations);
    }
    else {
      createAlertMessage("Nous avons rencontré une erreur avec le système de géolocalisation")
    }
  }


  console.log("WEATHER : ", weather)
  console.log("AIR QUALITY : ", airQuality)

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

          <section className="flex-auto w-full sm:w-56 sm:max-w-md p-4 mx-auto">
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


            <div className='flex flex-col justify-items-center max-w-xl mx-auto	mt-5'>
              {
                weather === undefined ?

                  <LoadingCard />

                  :

                  <>

                    <div className='flex flex-wrap gap-x-5 items-center justify-center p-5 pt-0'>
                      <CldImage format={"svg"} className="w-40	sm:w-44" width="200" height="200" src={`Blow/${weather.daily.weathercode[1]}${getWeatherIcon(weather.daily.weathercode[1])}`} alt="<Alt Text>" />
                      <p className='text-center'>
                        <span className="font-black text-3xl sm:text-4xl">{weather.current_weather.temperature} </span>
                        <span className="align-top text-lg">{weather.hourly_units.temperature_2m}</span>
                      </p>
                    </div>

                    {/* LOCATION & DATE => dd/mm/yyyy */}
                    <div className="flex justify-between items-center flex-wrap gap-y-3 gap-x-5 border-2 rounded-lg w-full p-4">
                      <p className='font-black text-center text-white text-xs sm:text-md'>{location.city}</p>
                      <p className='text-center text-xs sm:text-md' >{formatDate(weather.current_weather.time)}</p>
                    </div>

                    <div className="divider"></div>


                    <div className="flex flex-col gap-3">

                      <div className='flex flex-wrap gap-3 w-full'>
                        {/* MAX TEMP & MIN TEMP */}
                        <CurentWeatherHighlight
                          dataContainerCustomClassName="align-items-center px-3"
                          unit={`${weather.daily_units.temperature_2m_max}`}
                          data={[
                            {
                              imgSrc: "thermometer-warmer",
                              mainData: `${weather.daily.temperature_2m_max[1]}`,
                              data: `${differenceCalculation(weather.daily.temperature_2m_max[0], weather.daily.temperature_2m_max[1])}`
                            },
                            {
                              imgSrc: "thermometer-colder",
                              mainData: `${weather.daily.temperature_2m_min[1]}`,
                              data: `${differenceCalculation(weather.daily.temperature_2m_min[0], weather.daily.temperature_2m_min[1])}`
                            },
                          ]}
                        />

                        {/* SUNRISE & SUNSET */}
                        <CurentWeatherHighlight
                          dataContainerCustomClassName="align-items-center px-3"
                          data={[
                            {
                              imgSrc: "sunrise",
                              mainData: `${formatTime(weather.daily.sunrise[1])}`,
                              data: `${timeDifferenceCalculation(weather.daily.sunrise[1], weather.daily.sunrise[0])}`
                            },
                            {
                              imgSrc: "sunset",
                              mainData: `${formatTime(weather.daily.sunset[1])}`,
                              data: `${timeDifferenceCalculation(weather.daily.sunset[1], weather.daily.sunset[0])}`
                            },
                          ]}
                        />
                      </div>

                      {/* UV INDICE | PRECIPITATION PROBABILITY | WIND SPEED */}
                      <CurentWeatherHighlight
                        dataContainerCustomClassName="flex-col"
                        data={[
                          {
                            imgSrc: `uv-index-${roundValue(weather.daily.uv_index_max[1])}`,
                            mainData: "Indice UV",
                            data: `${weather.daily.uv_index_max[1]}`
                          },
                          {
                            imgSrc: "humidity",
                            mainData: "Probalilité de pluie",
                            data: `${weather.daily.precipitation_probability_max[1]} %`
                          },
                          {
                            imgSrc: "wind",
                            mainData: "Vent",
                            data: `${weather.current_weather.windspeed}${weather.daily_units.windspeed_10m_max}`
                          }
                        ]} />

                      {/* AIR QUALITY */}
                      <CurentWeatherHighlight
                        dataContainerCustomClassName="align-items-center px-3"
                        mainDataCustomClassName={`${airQualityIndicator(airQuality ? airQuality.hourly.european_aqi[getHourlyDataIndex(weather.current_weather.time, airQuality!.hourly.time)] : -1).color} text-white text-2xl rounded-lg`}
                        data={[
                          {
                            imgSrc: `smoke-particles`,
                            mainData: `${airQuality ? airQuality.hourly.european_aqi[getHourlyDataIndex(weather.current_weather.time, airQuality!.hourly.time)] : "N/A"} `,
                            data: `${airQualityIndicator(airQuality ? airQuality.hourly.european_aqi[getHourlyDataIndex(weather.current_weather.time, airQuality!.hourly.time)] : -1).indicator}`
                          }
                        ]} />
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


