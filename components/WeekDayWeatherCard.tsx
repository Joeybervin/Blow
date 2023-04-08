import { getWeekDay, getDayOfMonth } from "@/helpers";
import { WeekDayWeatherCardProps } from "@/interfaces";
import roundValue from "@/utils/roundValue";
import { CldImage } from "next-cloudinary";


export const WeekDayWeatherCard = ({weekday,weekDayIconSrc, weekDayMaxTemp, weekDayMinTemp}: WeekDayWeatherCardProps) => {

    return (
            <div className="flex-auto flex flex-col justify-center items-center rounded-lg bg-base-200 min-w-[125px]  hover:scale-125 hover:border-2 p-3.5 hover:drop-shadow-xl ">
                <p className="text-sm">{getWeekDay(weekday)} {Number(getDayOfMonth(weekday)) <= 9 ? "0" + getDayOfMonth(weekday) : getDayOfMonth(weekday) }</p>
                <CldImage format={"svg"} width="40" height="40"  src={`Blow/${weekDayIconSrc}`}  alt={weekDayIconSrc} />
                <p className="flex flex-nowrap text-sm">
                    <span className="text-primary-content font-black ">{roundValue(weekDayMaxTemp)}°</span> / 
                    <span >{roundValue(weekDayMinTemp)}°</span>
                </p>
            </div>
    );
};
