import { CookieValueTypes } from 'cookies-next';
const axios = require('axios');

interface LocationCoord {
    lat: number | CookieValueTypes;
    long: number | CookieValueTypes;
};

const fetchWeather = async ({ lat, long }: LocationCoord): Promise<object> => {

    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
    
};

export default fetchWeather ;