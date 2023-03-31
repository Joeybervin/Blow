
import { CookieValueTypes } from 'cookies-next';
const axios = require('axios');

interface LocationCoord {
    lat: number | CookieValueTypes;
    long: number | CookieValueTypes;
};


const getCityNameFromLatAndLong = async ({ lat, long }: LocationCoord): Promise<object> => {
    let cityName;
    try {
        cityName = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        return cityName.data
    } catch (error) {
        console.log(error);
        throw error;

    }

}
