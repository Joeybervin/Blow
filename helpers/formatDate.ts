export function getWeekDay(dateString : string):string {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const date = new Date(dateString);
    const day = daysOfWeek[date.getDay()];
    return day
}

export function getDayOfMonth(dateString: string):number {
    const date = new Date(dateString);
    const dayOfMonth = date.getDate();
    return dayOfMonth
}

export function formatDate(dateString : string ): string {
    const monthsOfYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(dateString);
    const dayOfWeek = getWeekDay(dateString)
    const dayOfMonth = getDayOfMonth(dateString);
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
};

export function formatTime(timeString: string, OnlyHours : boolean): string {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    if (OnlyHours) {
        return `${hours}h`
    }
    return`${hours}:${minutes}`;
};

