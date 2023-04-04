import roundValue from '@/utils/roundValue'

interface uvInformations {
    color : string;
    indicator : string;
}

const uvIndicatorColor = (uvLevel: number) : uvInformations => {

    const uvLvelRounded = roundValue(uvLevel)
    let color: uvInformations = {color: "", indicator: ""};

    if (uvLvelRounded === 1 || uvLvelRounded === 2) color = {color : "bg-emerald-400", indicator: "Faible"}
    else if (uvLvelRounded === 3 || uvLvelRounded === 4 || uvLvelRounded === 5 ) color = {color : "bg-[#7c6498]", indicator: "Modéré"}
    else if (uvLvelRounded === 6 || uvLvelRounded === 7 ) return color = {color : "bg-orange-500", indicator: "Élevée"}
    else if (uvLvelRounded === 8 || uvLvelRounded === 9 || uvLvelRounded === 10 ) color = {color : "bg-red-600", indicator: "Très élevée"}
    else if (uvLvelRounded >= 11) color = {color : "bg-fuchsia-500", indicator: "Extrême"}

    return color
}


const uvIndicator = (uvLevel : number, levelRange : number):string => {

    const uvLvelRounded = roundValue(uvLevel)
    let classProps = "text-sm ";
    
    if (uvLvelRounded === levelRange) {
        classProps = `${uvIndicatorColor(uvLevel).color} text-white font-black p-3 font-xl `
    }
    if (uvLvelRounded - 1 === levelRange || uvLvelRounded + 1 === levelRange) {
        classProps += "text-gray-600"
    }
    if (uvLvelRounded - 2 === levelRange || uvLvelRounded + 2 === levelRange) {
        classProps += "text-gray-700	"
    }
    if (uvLvelRounded - 3 === levelRange || uvLvelRounded + 3 === levelRange) {
        classProps += "text-gray-800"
    }
    if (uvLvelRounded - 4 === levelRange || uvLvelRounded + 4 === levelRange) {
        classProps += "text-gray-800"
    }
    if (uvLvelRounded - 4 > levelRange || uvLvelRounded + 4 < levelRange) {
        classProps += "text-gray-900"
    }

    return classProps
}

export {uvIndicator, uvIndicatorColor};