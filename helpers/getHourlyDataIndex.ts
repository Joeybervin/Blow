export const getHourlyDataIndex = (time : string, arr : string[]) : number => {

    

    const index = arr.findIndex((el) => time === el)

    return index
}