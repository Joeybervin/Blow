import { Component } from "react";

export interface WeekDayWeatherCardProps  {
    weekday: string;
    weekDayIconSrc: string;
    weekDayMaxTemp: number;
    weekDayMinTemp: number;
}