function checkTime() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour >= 6 && hour < 20) {
      return '-d';
    } else {
      return '-n';
    }
  }

export const getWeatherIcon = (weatherCode : number) : string => {
    let iconOption: string = '';
    const weatherCodeExempt : number[] = [3, 45, 48, 53, 56, 57, 61, 63, 65, 66, 67, 73, 80, 81, 82, 85, 86]
    for (const code of weatherCodeExempt) {
        if (code === weatherCode) return  iconOption = "";
    }
    iconOption = checkTime()
    return iconOption;
}