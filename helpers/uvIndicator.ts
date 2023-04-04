import roundValue from '@/utils/roundValue'
import { UvInformations } from '@/interfaces';


const uvIndicatorColor = (uvLevel: number) : UvInformations => {

    const uvLvelRounded = roundValue(uvLevel)
    let color: UvInformations = {color: "", indicator: ""};

    if (uvLvelRounded === 1 || uvLvelRounded === 2) color = {color : "bg-emerald-400", indicator: "Faible"}
    else if (uvLvelRounded === 3 || uvLvelRounded === 4 || uvLvelRounded === 5 ) color = {color : "bg-yellow-300", indicator: "Modéré"}
    else if (uvLvelRounded === 6 || uvLvelRounded === 7 ) return color = {color : "bg-orange-500", indicator: "Élevée"}
    else if (uvLvelRounded === 8 || uvLvelRounded === 9 || uvLvelRounded === 10 ) color = {color : "bg-red-600", indicator: "Très élevée"}
    else if (uvLvelRounded >= 11) color = {color : "bg-fuchsia-500", indicator: "Extrême"}

    return color
}


const uvIndicator = (uvLevel : number, levelRange : number):string => {

    const uvLvelRounded = roundValue(uvLevel)
    let classProps = "text-xs ";
    
    if (uvLvelRounded === levelRange) {
        classProps = `text-white align-center ${uvIndicatorColor(uvLevel).color} font-black text-xl rounded-lg px-2  `
    }
    if (uvLvelRounded - 1 === levelRange || uvLvelRounded + 1 === levelRange) {
        classProps += "opacity-60"
    }
    if (uvLvelRounded - 2 === levelRange || uvLvelRounded + 2 === levelRange) {
        classProps += "opacity-50"
    }
    if (uvLvelRounded - 3 === levelRange || uvLvelRounded + 3 === levelRange) {
        classProps += "opacity-40"
    }
    if (uvLvelRounded - 4 === levelRange || uvLvelRounded + 4 === levelRange) {
        classProps += "opacity-30"
    }
    if (uvLvelRounded - 4 > levelRange || uvLvelRounded + 4 < levelRange) {
        classProps += "opacity-25"
    }

    return classProps
}

export {uvIndicator, uvIndicatorColor};