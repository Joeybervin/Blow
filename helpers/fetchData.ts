import { Weather, AirQuality, LocationCoords } from '@/interfaces/index'; 
const axios = require('axios');

export const fetchWeather = async ({ lat, long }: LocationCoords): Promise<Weather> => {
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,visibility,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&past_days=1&timezone=auto`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
    
};

export const fetchAirQuality = async ({ lat, long }: LocationCoords): Promise<AirQuality> => {
    try {
        const response = await axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&hourly=european_aqi&timezone=auto`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
    
};
