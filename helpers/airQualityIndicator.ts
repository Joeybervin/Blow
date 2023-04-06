
import { AirQualityInformations } from '@/interfaces';


export const airQualityIndicator = (aqui: number) : AirQualityInformations => {


    let informations: AirQualityInformations = {color: "", indicator: ""};

    if (aqui >= 0 && aqui <= 24) informations = {color : "bg-emerald-400", indicator: "Très bonne"}
    else if (aqui >= 25 && aqui <= 49) informations = {color : "bg-emerald-600", indicator: "Bonne"}
    else if (aqui >= 50 && aqui <= 74) return informations = {color : "bg-yellow-500", indicator: "Moyenne"}
    else if (aqui >= 75 && aqui <= 99 ) informations = {color : "bg-orange-600", indicator: "Mauvaise"}
    else if ( aqui >= 100 ) informations = {color : "bg-red-600", indicator: "Très mauvaise"}
    else  informations = {color : "", indicator: "--"}

    return informations;
}
