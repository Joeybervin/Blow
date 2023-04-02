import axios from "axios";

const getGpsPosition = async ()=> {
    if ('geolocation' in navigator) {
        try {
            const { coords } = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`);

            return { lat: response.data.latitude, long: response.data.longitude, city: response.data.city}
        }
            catch (error) {
            console.error(error);
        }
    } else {
        console.error('Geolocation is not supported');
    }

    return { lat: 0, long: 0, city: "" }
}

export default getGpsPosition ;