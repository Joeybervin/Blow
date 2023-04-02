import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next';

export interface Position {
    lat: number  | CookieValueTypes;
    long: number  | CookieValueTypes;
    city: GeolocationPosition | CookieValueTypes;
}

export function getCookiePosition()  {

    if (getCookie("savedLocation") === true && hasCookie("city")) {

            return {
                lat: Number(getCookie("lat")),
                long: Number(getCookie("long")),
                city: getCookie("city"),
            };
            
        } 

    // Default to Paris if user does not grant location access or if an error occurs
    return { lat: 48.866667, long: 2.333333, city: 'Paris' };
}