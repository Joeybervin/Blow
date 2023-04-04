import { getCookie, setCookie } from "cookies-next";
import { Position } from '@/interfaces'

export const savePositionCookie = (coord : Position):void => {
    if (getCookie('SavedPosition') === true) {
        setCookie('lat', coord.lat, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('long', coord.long, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('city', coord.city, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    }
};

