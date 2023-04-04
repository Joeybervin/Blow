import { getCookie, setCookie } from "cookies-next";

export interface Position {
    lat: number ;
    long: number;
    city: string;
}

const savePositionCookie = (coord : Position) => {
    if (getCookie('SavedPosition') === true) {
        setCookie('lat', coord.lat, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('long', coord.long, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('city', coord.city, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    }
};

export default savePositionCookie;
