import { getCookie, hasCookie } from 'cookies-next';
import { Position } from '@/interfaces'

export function getCookiePosition(): Position  {

    if ( hasCookie("city")) {

            return {
                lat: Number(getCookie("lat")),
                long: Number(getCookie("long")),
                city: getCookie("city")!.toString(),
            };
            
        } 

    // Default to Paris if user does not grant location access or if an error occurs
    return { lat: 48.866667, long: 2.333333, city: 'Paris' };
}