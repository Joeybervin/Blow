import { setCookie } from 'cookies-next';

interface CookieValues {
    theme: boolean;
    location: boolean;
}

const createUserCookiesPreferences = (cookiesPreferences: string , cookieValue?: CookieValues) => {

    if (cookiesPreferences === "allAccepted") {
        setCookie('savedTheme', true, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('savedLocation', true, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    }
    else if (cookiesPreferences === "allRejected") {
        setCookie('savedTheme', false, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        setCookie('savedLocation', false, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    }
    else {
        if (cookieValue?.theme !== undefined && cookieValue?.location !== undefined) {
            setCookie('savedTheme', cookieValue.theme, { maxAge: 30 * 24 * 60 * 60 * 1000 });
            setCookie('savedLocation', cookieValue.location, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        }
    }

}

export default createUserCookiesPreferences