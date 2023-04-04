

export const differenceCalculation = (pastNumber: number, currentNumber: number): string => {

    let difference;

    if (pastNumber === currentNumber) {
        difference = "="
    }
    else if (currentNumber > pastNumber) {

        difference = "+" + (currentNumber - pastNumber).toFixed(1) + "°"
    }
    else {
        difference = (currentNumber - pastNumber).toFixed(1) + "°"
    }

    return difference
}

export const timeDifferenceCalculation = (currentDayTime: string, pastDayTime: string): string => {
    
    
    const yesterdayHours = new Date(pastDayTime).getHours();
    const todayHours = new Date(currentDayTime).getHours();

    const yesterdayMinutes = new Date(pastDayTime).getMinutes();
    const todayMinutes = new Date(currentDayTime).getMinutes();

    let diffString = "";

    const hoursDiff = todayHours - yesterdayHours;
    const minutesDiff = todayMinutes - yesterdayMinutes;

    if (hoursDiff === 0 && minutesDiff === 0) {
        diffString = "0 min";
    }

    if (hoursDiff === 0 && minutesDiff > 0) {
        diffString = `+${minutesDiff} min`;
    }
    else if (hoursDiff === 0 && minutesDiff < 0) {
        diffString = `-${Math.abs(minutesDiff)} min`;
    }
    if (hoursDiff > 0) {
        diffString = `+${hoursDiff} h${minutesDiff > 0 ? + " " + minutesDiff + " min" : ""}`;
    }
    else if (hoursDiff < 0) {
        diffString = `-${Math.abs(hoursDiff)} h${Math.abs(minutesDiff) > 0 ? + " " + Math.abs(minutesDiff) + " min" : ""}`;
    }


    return diffString
}


